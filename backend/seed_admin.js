import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'chembio_lab';

async function createAdmin() {
  let client;
  
  try {
    client = await MongoClient.connect(MONGO_URL);
    const db = client.db(DB_NAME);
    const profilesCollection = db.collection('profiles');

    // Check if admin already exists
    const existingAdmin = await profilesCollection.findOne({ email: 'admin@chembiolab.com' });

    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Email: admin@chembiolab.com');
      console.log('Password: admin123');
      return;
    }

    // Create admin user
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminDoc = {
      id: userId,
      email: 'admin@chembiolab.com',
      password: hashedPassword,
      name: 'Admin User',
      photo_url: null,
      designation: 'PI',
      research_focus: 'Laboratory Administration',
      bio: 'Administrator of ChemBioSystems Laboratory',
      linkedin_url: null,
      researchgate_url: null,
      google_scholar_url: null,
      orcid_url: null,
      phone: null,
      joined_date: new Date().toISOString(),
      is_active: true,
      is_admin: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await profilesCollection.insertOne(adminDoc);

    console.log('✅ Admin user created successfully!');
    console.log('\n📧 Email: admin@chembiolab.com');
    console.log('🔑 Password: admin123');
    console.log('\n⚠️  Please change the password after first login');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

createAdmin();
