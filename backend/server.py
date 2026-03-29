from fastapi import FastAPI, HTTPException, Depends, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv
import uuid

load_dotenv()

# Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")

# Initialize FastAPI
app = FastAPI(title="ChemBioSystems Lab API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
client = MongoClient(MONGO_URL)
db = client["chembio_lab"]

# Collections
profiles_collection = db["profiles"]
projects_collection = db["projects"]
publications_collection = db["publications"]
resources_collection = db["resources"]
announcements_collection = db["announcements"]

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Pydantic Models
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class ProfileBase(BaseModel):
    name: str
    email: EmailStr
    photo_url: Optional[str] = None
    designation: Optional[str] = None
    research_focus: Optional[str] = None
    bio: Optional[str] = None
    linkedin_url: Optional[str] = None
    researchgate_url: Optional[str] = None
    google_scholar_url: Optional[str] = None
    orcid_url: Optional[str] = None
    phone: Optional[str] = None
    joined_date: Optional[str] = None
    is_active: bool = True
    is_admin: bool = False

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    photo_url: Optional[str] = None
    designation: Optional[str] = None
    research_focus: Optional[str] = None
    bio: Optional[str] = None
    linkedin_url: Optional[str] = None
    researchgate_url: Optional[str] = None
    google_scholar_url: Optional[str] = None
    orcid_url: Optional[str] = None
    phone: Optional[str] = None
    joined_date: Optional[str] = None
    is_active: Optional[bool] = None

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "Planning"
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    funding_source: Optional[str] = None
    funding_amount: Optional[float] = None
    collaborators: Optional[List[str]] = []
    keywords: Optional[List[str]] = []
    team_members: Optional[List[str]] = []

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    funding_source: Optional[str] = None
    funding_amount: Optional[float] = None
    collaborators: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
    team_members: Optional[List[str]] = None

class PublicationBase(BaseModel):
    title: str
    authors: List[str]
    journal: str
    year: int
    volume: Optional[str] = None
    issue: Optional[str] = None
    pages: Optional[str] = None
    doi: Optional[str] = None
    abstract: Optional[str] = None
    keywords: Optional[List[str]] = []
    publication_type: str = "Journal Article"
    pdf_url: Optional[str] = None

class PublicationUpdate(BaseModel):
    title: Optional[str] = None
    authors: Optional[List[str]] = None
    journal: Optional[str] = None
    year: Optional[int] = None
    volume: Optional[str] = None
    issue: Optional[str] = None
    pages: Optional[str] = None
    doi: Optional[str] = None
    abstract: Optional[str] = None
    keywords: Optional[List[str]] = None
    publication_type: Optional[str] = None
    pdf_url: Optional[str] = None

class ResourceBase(BaseModel):
    name: str
    description: Optional[str] = None
    file_url: str
    file_type: Optional[str] = None
    file_size: Optional[int] = None
    category: str = "Other"
    is_public: bool = False

class ResourceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    file_url: Optional[str] = None
    file_type: Optional[str] = None
    file_size: Optional[int] = None
    category: Optional[str] = None
    is_public: Optional[bool] = None

class AnnouncementBase(BaseModel):
    title: str
    content: str
    category: str = "General"
    is_featured: bool = False
    is_published: bool = False
    published_at: Optional[str] = None

class AnnouncementUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    is_featured: Optional[bool] = None
    is_published: Optional[bool] = None
    published_at: Optional[str] = None

# Helper functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        user = profiles_collection.find_one({"id": user_id})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        user["_id"] = str(user["_id"])
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Convert MongoDB ObjectId to string
def serialize_doc(doc):
    if doc:
        doc["_id"] = str(doc["_id"])
    return doc

# Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "ChemBioSystems Lab API"}

# Authentication Routes
@app.post("/api/auth/register", response_model=Token)
async def register(user: UserRegister):
    # Check if user exists
    existing_user = profiles_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_id = str(uuid.uuid4())
    hashed_password = hash_password(user.password)
    
    user_doc = {
        "id": user_id,
        "email": user.email,
        "password": hashed_password,
        "name": user.name,
        "photo_url": None,
        "designation": None,
        "research_focus": None,
        "bio": None,
        "linkedin_url": None,
        "researchgate_url": None,
        "google_scholar_url": None,
        "orcid_url": None,
        "phone": None,
        "joined_date": datetime.utcnow().isoformat(),
        "is_active": True,
        "is_admin": False,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
    
    profiles_collection.insert_one(user_doc)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_id})
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/auth/login", response_model=Token)
async def login(user: UserLogin):
    # Find user
    db_user = profiles_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Verify password
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Create access token
    access_token = create_access_token(data={"sub": db_user["id"]})
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    # Remove password from response
    current_user.pop("password", None)
    return current_user

@app.post("/api/auth/logout")
async def logout():
    return {"message": "Logged out successfully"}

# Profile Routes
@app.get("/api/profiles")
async def get_profiles(active_only: bool = True):
    query = {"is_active": True} if active_only else {}
    profiles = list(profiles_collection.find(query))
    for profile in profiles:
        profile["_id"] = str(profile["_id"])
        profile.pop("password", None)
    return profiles

@app.get("/api/profiles/{profile_id}")
async def get_profile(profile_id: str):
    profile = profiles_collection.find_one({"id": profile_id})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    profile["_id"] = str(profile["_id"])
    profile.pop("password", None)
    return profile

@app.put("/api/profiles/{profile_id}")
async def update_profile(
    profile_id: str,
    profile_update: ProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    # Check if user is updating their own profile or is admin
    if current_user["id"] != profile_id and not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Not authorized to update this profile")
    
    update_data = profile_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    result = profiles_collection.update_one(
        {"id": profile_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    updated_profile = profiles_collection.find_one({"id": profile_id})
    updated_profile["_id"] = str(updated_profile["_id"])
    updated_profile.pop("password", None)
    return updated_profile

# Project Routes
@app.get("/api/projects")
async def get_projects():
    projects = list(projects_collection.find({}))
    for project in projects:
        project["_id"] = str(project["_id"])
    return projects

@app.get("/api/projects/{project_id}")
async def get_project(project_id: str):
    project = projects_collection.find_one({"id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    project["_id"] = str(project["_id"])
    return project

@app.post("/api/projects")
async def create_project(
    project: ProjectBase,
    current_user: dict = Depends(get_current_user)
):
    project_id = str(uuid.uuid4())
    project_doc = project.model_dump()
    project_doc.update({
        "id": project_id,
        "created_by": current_user["id"],
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    })
    
    projects_collection.insert_one(project_doc)
    project_doc["_id"] = str(project_doc["_id"])
    return project_doc

@app.put("/api/projects/{project_id}")
async def update_project(
    project_id: str,
    project_update: ProjectUpdate,
    current_user: dict = Depends(get_current_user)
):
    project = projects_collection.find_one({"id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check permissions
    if (current_user["id"] != project["created_by"] and 
        current_user["id"] not in project.get("team_members", []) and 
        not current_user.get("is_admin")):
        raise HTTPException(status_code=403, detail="Not authorized to update this project")
    
    update_data = project_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    projects_collection.update_one({"id": project_id}, {"$set": update_data})
    
    updated_project = projects_collection.find_one({"id": project_id})
    updated_project["_id"] = str(updated_project["_id"])
    return updated_project

@app.delete("/api/projects/{project_id}")
async def delete_project(
    project_id: str,
    current_user: dict = Depends(get_current_user)
):
    project = projects_collection.find_one({"id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check permissions
    if current_user["id"] != project["created_by"] and not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Not authorized to delete this project")
    
    projects_collection.delete_one({"id": project_id})
    return {"message": "Project deleted successfully"}

# Publication Routes
@app.get("/api/publications")
async def get_publications():
    publications = list(publications_collection.find({}))
    for pub in publications:
        pub["_id"] = str(pub["_id"])
    return publications

@app.get("/api/publications/{publication_id}")
async def get_publication(publication_id: str):
    publication = publications_collection.find_one({"id": publication_id})
    if not publication:
        raise HTTPException(status_code=404, detail="Publication not found")
    publication["_id"] = str(publication["_id"])
    return publication

@app.post("/api/publications")
async def create_publication(
    publication: PublicationBase,
    current_user: dict = Depends(get_current_user)
):
    publication_id = str(uuid.uuid4())
    publication_doc = publication.model_dump()
    publication_doc.update({
        "id": publication_id,
        "created_by": current_user["id"],
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    })
    
    publications_collection.insert_one(publication_doc)
    publication_doc["_id"] = str(publication_doc["_id"])
    return publication_doc

@app.put("/api/publications/{publication_id}")
async def update_publication(
    publication_id: str,
    publication_update: PublicationUpdate,
    current_user: dict = Depends(get_current_user)
):
    publication = publications_collection.find_one({"id": publication_id})
    if not publication:
        raise HTTPException(status_code=404, detail="Publication not found")
    
    # Check permissions
    if current_user["id"] != publication["created_by"] and not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Not authorized to update this publication")
    
    update_data = publication_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    publications_collection.update_one({"id": publication_id}, {"$set": update_data})
    
    updated_publication = publications_collection.find_one({"id": publication_id})
    updated_publication["_id"] = str(updated_publication["_id"])
    return updated_publication

@app.delete("/api/publications/{publication_id}")
async def delete_publication(
    publication_id: str,
    current_user: dict = Depends(get_current_user)
):
    publication = publications_collection.find_one({"id": publication_id})
    if not publication:
        raise HTTPException(status_code=404, detail="Publication not found")
    
    # Check permissions
    if current_user["id"] != publication["created_by"] and not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Not authorized to delete this publication")
    
    publications_collection.delete_one({"id": publication_id})
    return {"message": "Publication deleted successfully"}

# Resource Routes
@app.get("/api/resources")
async def get_resources(public_only: bool = True, current_user: dict = Depends(get_current_user)):
    if public_only and not current_user.get("is_admin"):
        query = {"is_public": True}
    else:
        query = {}
    
    resources = list(resources_collection.find(query))
    for resource in resources:
        resource["_id"] = str(resource["_id"])
    return resources

@app.get("/api/resources/{resource_id}")
async def get_resource(resource_id: str, current_user: dict = Depends(get_current_user)):
    resource = resources_collection.find_one({"id": resource_id})
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    
    # Check if user can access this resource
    if not resource.get("is_public") and resource["uploaded_by"] != current_user["id"] and not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Not authorized to access this resource")
    
    resource["_id"] = str(resource["_id"])
    return resource

@app.post("/api/resources")
async def create_resource(
    resource: ResourceBase,
    current_user: dict = Depends(get_current_user)
):
    resource_id = str(uuid.uuid4())
    resource_doc = resource.model_dump()
    resource_doc.update({
        "id": resource_id,
        "uploaded_by": current_user["id"],
        "created_at": datetime.utcnow().isoformat()
    })
    
    resources_collection.insert_one(resource_doc)
    resource_doc["_id"] = str(resource_doc["_id"])
    return resource_doc

@app.put("/api/resources/{resource_id}")
async def update_resource(
    resource_id: str,
    resource_update: ResourceUpdate,
    current_user: dict = Depends(get_current_user)
):
    resource = resources_collection.find_one({"id": resource_id})
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    
    # Check permissions
    if current_user["id"] != resource["uploaded_by"] and not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Not authorized to update this resource")
    
    update_data = resource_update.model_dump(exclude_unset=True)
    
    resources_collection.update_one({"id": resource_id}, {"$set": update_data})
    
    updated_resource = resources_collection.find_one({"id": resource_id})
    updated_resource["_id"] = str(updated_resource["_id"])
    return updated_resource

@app.delete("/api/resources/{resource_id}")
async def delete_resource(
    resource_id: str,
    current_user: dict = Depends(get_current_user)
):
    resource = resources_collection.find_one({"id": resource_id})
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    
    # Check permissions
    if current_user["id"] != resource["uploaded_by"] and not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Not authorized to delete this resource")
    
    resources_collection.delete_one({"id": resource_id})
    return {"message": "Resource deleted successfully"}

# Announcement Routes
@app.get("/api/announcements")
async def get_announcements(published_only: bool = True):
    query = {"is_published": True} if published_only else {}
    announcements = list(announcements_collection.find(query))
    for announcement in announcements:
        announcement["_id"] = str(announcement["_id"])
    return announcements

@app.get("/api/announcements/{announcement_id}")
async def get_announcement(announcement_id: str):
    announcement = announcements_collection.find_one({"id": announcement_id})
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")
    announcement["_id"] = str(announcement["_id"])
    return announcement

@app.post("/api/announcements")
async def create_announcement(
    announcement: AnnouncementBase,
    current_user: dict = Depends(get_current_user)
):
    # Only admins can create announcements
    if not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Only admins can create announcements")
    
    announcement_id = str(uuid.uuid4())
    announcement_doc = announcement.model_dump()
    announcement_doc.update({
        "id": announcement_id,
        "created_by": current_user["id"],
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    })
    
    announcements_collection.insert_one(announcement_doc)
    announcement_doc["_id"] = str(announcement_doc["_id"])
    return announcement_doc

@app.put("/api/announcements/{announcement_id}")
async def update_announcement(
    announcement_id: str,
    announcement_update: AnnouncementUpdate,
    current_user: dict = Depends(get_current_user)
):
    announcement = announcements_collection.find_one({"id": announcement_id})
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")
    
    # Check permissions
    if current_user["id"] != announcement["created_by"] and not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Not authorized to update this announcement")
    
    update_data = announcement_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    announcements_collection.update_one({"id": announcement_id}, {"$set": update_data})
    
    updated_announcement = announcements_collection.find_one({"id": announcement_id})
    updated_announcement["_id"] = str(updated_announcement["_id"])
    return updated_announcement

@app.delete("/api/announcements/{announcement_id}")
async def delete_announcement(
    announcement_id: str,
    current_user: dict = Depends(get_current_user)
):
    announcement = announcements_collection.find_one({"id": announcement_id})
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")
    
    # Check permissions
    if current_user["id"] != announcement["created_by"] and not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Not authorized to delete this announcement")
    
    announcements_collection.delete_one({"id": announcement_id})
    return {"message": "Announcement deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
