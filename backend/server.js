import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

// Configuration
const PORT = process.env.PORT || 8001;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'chembio_lab';
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-in-production';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || '*';

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: ALLOWED_ORIGINS === '*' ? '*' : ALLOWED_ORIGINS.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// MongoDB Connection
let db;
const connectDB = async () => {
  try {
    const client = await MongoClient.connect(MONGO_URL);
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Collections
const getCollection = (name) => db.collection(name);

// Auth Middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ detail: 'No token provided' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await getCollection('profiles').findOne({ id: decoded.sub });

    if (!user) {
      return res.status(401).json({ detail: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ detail: 'Invalid token' });
  }
};

// Helper Functions
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const createToken = (userId) => {
  return jwt.sign({ sub: userId }, SECRET_KEY, { expiresIn: '7d' });
};

// ==================== ROUTES ====================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'ChemBioSystems Lab API' });
});

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ detail: 'Email, password, and name are required' });
    }

    // Check if user exists
    const existingUser = await getCollection('profiles').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ detail: 'Email already registered' });
    }

    // Create user
    const userId = uuidv4();
    const hashedPassword = await hashPassword(password);

    const userDoc = {
      id: userId,
      email,
      password: hashedPassword,
      name,
      photo_url: null,
      designation: null,
      research_focus: null,
      bio: null,
      linkedin_url: null,
      researchgate_url: null,
      google_scholar_url: null,
      orcid_url: null,
      phone: null,
      joined_date: new Date().toISOString(),
      is_active: true,
      is_admin: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await getCollection('profiles').insertOne(userDoc);

    const token = createToken(userId);
    res.json({ access_token: token, token_type: 'bearer' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ detail: 'Email and password are required' });
    }

    // Find user
    const user = await getCollection('profiles').findOne({ email });
    if (!user) {
      return res.status(401).json({ detail: 'Invalid email or password' });
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ detail: 'Invalid email or password' });
    }

    const token = createToken(user.id);
    res.json({ access_token: token, token_type: 'bearer' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Get Current User
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = { ...req.user };
  delete user.password;
  delete user._id;
  res.json(user);
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// ==================== PROFILE ROUTES ====================

// Get all profiles
app.get('/api/profiles', async (req, res) => {
  try {
    const activeOnly = req.query.active_only !== 'false';
    const limit = parseInt(req.query.limit) || 100;
    
    const query = activeOnly ? { is_active: true } : {};
    const profiles = await getCollection('profiles')
      .find(query, { projection: { password: 0, _id: 0 } })
      .limit(limit)
      .toArray();
    
    res.json(profiles);
  } catch (error) {
    console.error('Get profiles error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Get profile by ID
app.get('/api/profiles/:id', async (req, res) => {
  try {
    const profile = await getCollection('profiles').findOne(
      { id: req.params.id },
      { projection: { password: 0, _id: 0 } }
    );
    
    if (!profile) {
      return res.status(404).json({ detail: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Update profile
app.put('/api/profiles/:id', authenticateToken, async (req, res) => {
  try {
    const profileId = req.params.id;
    
    // Check permissions
    if (req.user.id !== profileId && !req.user.is_admin) {
      return res.status(403).json({ detail: 'Not authorized to update this profile' });
    }

    const updateData = { ...req.body };
    delete updateData.id;
    delete updateData.email;
    delete updateData.password;
    delete updateData.is_admin;
    updateData.updated_at = new Date().toISOString();

    const result = await getCollection('profiles').updateOne(
      { id: profileId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ detail: 'Profile not found' });
    }

    const updatedProfile = await getCollection('profiles').findOne(
      { id: profileId },
      { projection: { password: 0, _id: 0 } }
    );

    res.json(updatedProfile);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// ==================== PROJECT ROUTES ====================

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const projects = await getCollection('projects')
      .find({}, { projection: { _id: 0 } })
      .limit(limit)
      .toArray();
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Get project by ID
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await getCollection('projects').findOne(
      { id: req.params.id },
      { projection: { _id: 0 } }
    );
    
    if (!project) {
      return res.status(404).json({ detail: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Create project
app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const projectId = uuidv4();
    const projectDoc = {
      ...req.body,
      id: projectId,
      created_by: req.user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await getCollection('projects').insertOne(projectDoc);
    delete projectDoc._id;
    res.json(projectDoc);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Update project
app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await getCollection('projects').findOne({ id: projectId });

    if (!project) {
      return res.status(404).json({ detail: 'Project not found' });
    }

    // Check permissions
    const teamMembers = project.team_members || [];
    if (req.user.id !== project.created_by && 
        !teamMembers.includes(req.user.id) && 
        !req.user.is_admin) {
      return res.status(403).json({ detail: 'Not authorized to update this project' });
    }

    const updateData = { ...req.body };
    delete updateData.id;
    delete updateData.created_by;
    updateData.updated_at = new Date().toISOString();

    await getCollection('projects').updateOne(
      { id: projectId },
      { $set: updateData }
    );

    const updatedProject = await getCollection('projects').findOne(
      { id: projectId },
      { projection: { _id: 0 } }
    );

    res.json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Delete project
app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await getCollection('projects').findOne({ id: projectId });

    if (!project) {
      return res.status(404).json({ detail: 'Project not found' });
    }

    if (req.user.id !== project.created_by && !req.user.is_admin) {
      return res.status(403).json({ detail: 'Not authorized to delete this project' });
    }

    await getCollection('projects').deleteOne({ id: projectId });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// ==================== PUBLICATION ROUTES ====================

// Get all publications
app.get('/api/publications', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const publications = await getCollection('publications')
      .find({}, { projection: { _id: 0 } })
      .limit(limit)
      .toArray();
    res.json(publications);
  } catch (error) {
    console.error('Get publications error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Create publication
app.post('/api/publications', authenticateToken, async (req, res) => {
  try {
    const publicationId = uuidv4();
    const publicationDoc = {
      ...req.body,
      id: publicationId,
      created_by: req.user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await getCollection('publications').insertOne(publicationDoc);
    delete publicationDoc._id;
    res.json(publicationDoc);
  } catch (error) {
    console.error('Create publication error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Update publication
app.put('/api/publications/:id', authenticateToken, async (req, res) => {
  try {
    const publicationId = req.params.id;
    const publication = await getCollection('publications').findOne({ id: publicationId });

    if (!publication) {
      return res.status(404).json({ detail: 'Publication not found' });
    }

    if (req.user.id !== publication.created_by && !req.user.is_admin) {
      return res.status(403).json({ detail: 'Not authorized to update this publication' });
    }

    const updateData = { ...req.body };
    delete updateData.id;
    delete updateData.created_by;
    updateData.updated_at = new Date().toISOString();

    await getCollection('publications').updateOne(
      { id: publicationId },
      { $set: updateData }
    );

    const updatedPublication = await getCollection('publications').findOne(
      { id: publicationId },
      { projection: { _id: 0 } }
    );

    res.json(updatedPublication);
  } catch (error) {
    console.error('Update publication error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Delete publication
app.delete('/api/publications/:id', authenticateToken, async (req, res) => {
  try {
    const publicationId = req.params.id;
    const publication = await getCollection('publications').findOne({ id: publicationId });

    if (!publication) {
      return res.status(404).json({ detail: 'Publication not found' });
    }

    if (req.user.id !== publication.created_by && !req.user.is_admin) {
      return res.status(403).json({ detail: 'Not authorized to delete this publication' });
    }

    await getCollection('publications').deleteOne({ id: publicationId });
    res.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    console.error('Delete publication error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// ==================== RESOURCE ROUTES ====================

// Get all resources
app.get('/api/resources', authenticateToken, async (req, res) => {
  try {
    const publicOnly = req.query.public_only !== 'false';
    const limit = parseInt(req.query.limit) || 100;
    
    let query = {};
    if (publicOnly && !req.user.is_admin) {
      query = { is_public: true };
    }

    const resources = await getCollection('resources')
      .find(query, { projection: { _id: 0 } })
      .limit(limit)
      .toArray();
    
    res.json(resources);
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Create resource
app.post('/api/resources', authenticateToken, async (req, res) => {
  try {
    const resourceId = uuidv4();
    const resourceDoc = {
      ...req.body,
      id: resourceId,
      uploaded_by: req.user.id,
      created_at: new Date().toISOString()
    };

    await getCollection('resources').insertOne(resourceDoc);
    delete resourceDoc._id;
    res.json(resourceDoc);
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Update resource
app.put('/api/resources/:id', authenticateToken, async (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = await getCollection('resources').findOne({ id: resourceId });

    if (!resource) {
      return res.status(404).json({ detail: 'Resource not found' });
    }

    if (req.user.id !== resource.uploaded_by && !req.user.is_admin) {
      return res.status(403).json({ detail: 'Not authorized to update this resource' });
    }

    const updateData = { ...req.body };
    delete updateData.id;
    delete updateData.uploaded_by;

    await getCollection('resources').updateOne(
      { id: resourceId },
      { $set: updateData }
    );

    const updatedResource = await getCollection('resources').findOne(
      { id: resourceId },
      { projection: { _id: 0 } }
    );

    res.json(updatedResource);
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Delete resource
app.delete('/api/resources/:id', authenticateToken, async (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = await getCollection('resources').findOne({ id: resourceId });

    if (!resource) {
      return res.status(404).json({ detail: 'Resource not found' });
    }

    if (req.user.id !== resource.uploaded_by && !req.user.is_admin) {
      return res.status(403).json({ detail: 'Not authorized to delete this resource' });
    }

    await getCollection('resources').deleteOne({ id: resourceId });
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// ==================== ANNOUNCEMENT ROUTES ====================

// Get all announcements
app.get('/api/announcements', async (req, res) => {
  try {
    const publishedOnly = req.query.published_only !== 'false';
    const limit = parseInt(req.query.limit) || 100;
    
    const query = publishedOnly ? { is_published: true } : {};
    const announcements = await getCollection('announcements')
      .find(query, { projection: { _id: 0 } })
      .limit(limit)
      .toArray();
    
    res.json(announcements);
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Create announcement
app.post('/api/announcements', authenticateToken, async (req, res) => {
  try {
    if (!req.user.is_admin) {
      return res.status(403).json({ detail: 'Only admins can create announcements' });
    }

    const announcementId = uuidv4();
    const announcementDoc = {
      ...req.body,
      id: announcementId,
      created_by: req.user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await getCollection('announcements').insertOne(announcementDoc);
    delete announcementDoc._id;
    res.json(announcementDoc);
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Update announcement
app.put('/api/announcements/:id', authenticateToken, async (req, res) => {
  try {
    const announcementId = req.params.id;
    const announcement = await getCollection('announcements').findOne({ id: announcementId });

    if (!announcement) {
      return res.status(404).json({ detail: 'Announcement not found' });
    }

    if (req.user.id !== announcement.created_by && !req.user.is_admin) {
      return res.status(403).json({ detail: 'Not authorized to update this announcement' });
    }

    const updateData = { ...req.body };
    delete updateData.id;
    delete updateData.created_by;
    updateData.updated_at = new Date().toISOString();

    await getCollection('announcements').updateOne(
      { id: announcementId },
      { $set: updateData }
    );

    const updatedAnnouncement = await getCollection('announcements').findOne(
      { id: announcementId },
      { projection: { _id: 0 } }
    );

    res.json(updatedAnnouncement);
  } catch (error) {
    console.error('Update announcement error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// Delete announcement
app.delete('/api/announcements/:id', authenticateToken, async (req, res) => {
  try {
    const announcementId = req.params.id;
    const announcement = await getCollection('announcements').findOne({ id: announcementId });

    if (!announcement) {
      return res.status(404).json({ detail: 'Announcement not found' });
    }

    if (req.user.id !== announcement.created_by && !req.user.is_admin) {
      return res.status(403).json({ detail: 'Not authorized to delete this announcement' });
    }

    await getCollection('announcements').deleteOne({ id: announcementId });
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// ==================== START SERVER ====================

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    console.log(`📊 Database: ${DB_NAME}`);
    console.log(`🔐 CORS: ${ALLOWED_ORIGINS}`);
  });
};

startServer().catch(console.error);
