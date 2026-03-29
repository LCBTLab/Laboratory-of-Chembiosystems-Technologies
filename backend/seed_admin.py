import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from server import profiles_collection, hash_password
import uuid
from datetime import datetime

def create_admin():
    # Check if admin already exists
    admin = profiles_collection.find_one({"email": "admin@chembiolab.com"})
    
    if admin:
        print("Admin user already exists")
        print("Email: admin@chembiolab.com")
        print("Password: admin123")
        return
    
    # Create admin user
    user_id = str(uuid.uuid4())
    hashed_password = hash_password("admin123")
    
    admin_doc = {
        "id": user_id,
        "email": "admin@chembiolab.com",
        "password": hashed_password,
        "name": "Admin User",
        "photo_url": None,
        "designation": "PI",
        "research_focus": "Laboratory Administration",
        "bio": "Administrator of ChemBioSystems Laboratory",
        "linkedin_url": None,
        "researchgate_url": None,
        "google_scholar_url": None,
        "orcid_url": None,
        "phone": None,
        "joined_date": datetime.utcnow().isoformat(),
        "is_active": True,
        "is_admin": True,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
    
    profiles_collection.insert_one(admin_doc)
    
    print("✅ Admin user created successfully!")
    print("\n📧 Email: admin@chembiolab.com")
    print("🔑 Password: admin123")
    print("\n⚠️  Please change the password after first login")

if __name__ == "__main__":
    create_admin()
