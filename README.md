# ChemBioSystems Laboratory Website

A full-stack web application for managing laboratory research activities, team profiles, publications, and resources.

## 🚀 Features

- **User Authentication**: JWT-based authentication with email/password
- **Team Management**: Manage research team profiles with designations and research focus
- **Project Management**: Create and track research projects with funding details
- **Publications**: Maintain publication records with DOI, authors, and PDFs
- **Resources**: Upload and share lab resources (protocols, datasets, software)
- **News & Announcements**: Share lab news and achievements
- **Dashboard**: Admin dashboard for managing all content
- **Responsive Design**: Clean, minimalist UI with Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.115.0
- **Database**: MongoDB
- **Authentication**: JWT with python-jose
- **Password Hashing**: bcrypt via passlib

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router DOM 6.20.1
- **State Management**: Zustand 4.4.7
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Python 3.11+
- Node.js 16+
- MongoDB (running on localhost:27017)

### Backend Setup

```bash
cd /app/backend

# Install dependencies
pip install -r requirements.txt

# Create admin user
python seed_admin.py

# Run server
python server.py
```

Backend will run on `http://localhost:8001`

### Frontend Setup

```bash
cd /app/frontend

# Install dependencies
yarn install

# Start development server
yarn dev
```

Frontend will run on `http://localhost:3000`

## 🔑 Default Credentials

**Admin Account**:
- Email: `admin@chembiolab.com`
- Password: `admin123`

⚠️ **Important**: Change the password after first login!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Profiles
- `GET /api/profiles` - Get all profiles
- `GET /api/profiles/{id}` - Get profile by ID
- `PUT /api/profiles/{id}` - Update profile

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Publications
- `GET /api/publications` - Get all publications
- `POST /api/publications` - Create publication
- `PUT /api/publications/{id}` - Update publication
- `DELETE /api/publications/{id}` - Delete publication

### Resources
- `GET /api/resources` - Get resources
- `POST /api/resources` - Upload resource
- `PUT /api/resources/{id}` - Update resource
- `DELETE /api/resources/{id}` - Delete resource

### Announcements
- `GET /api/announcements` - Get announcements
- `POST /api/announcements` - Create announcement (Admin only)
- `PUT /api/announcements/{id}` - Update announcement
- `DELETE /api/announcements/{id}` - Delete announcement

## 🔐 Authentication Flow

1. User registers or logs in via `/login`
2. Backend returns JWT access token
3. Frontend stores token in localStorage
4. Token is included in all authenticated requests via Authorization header
5. Protected routes check for valid token

## 📂 Project Structure

```
/app/
├── backend/
│   ├── server.py              # Main FastAPI application
│   ├── seed_admin.py          # Admin user seeder
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── store/            # Zustand stores
│   │   ├── lib/              # API utilities
│   │   ├── App.tsx           # Main App component
│   │   └── main.tsx          # Entry point
│   ├── package.json          # Node dependencies
│   ├── vite.config.ts        # Vite configuration
│   ├── tailwind.config.js    # Tailwind configuration
│   └── .env                  # Frontend environment variables
└── memory/
    └── test_credentials.md   # Test credentials
```

## 🚢 Deployment

The application is configured to run with supervisor:

```bash
# Restart all services
sudo supervisorctl restart all

# Check status
sudo supervisorctl status

# View logs
tail -f /var/log/supervisor/backend.err.log
tail -f /var/log/supervisor/frontend.err.log
```

## 🎨 Features in Detail

### User Roles
- **Admin**: Full access to all features, can create announcements
- **Regular User**: Can manage own profile, view public content

### Team Profiles
- Name, email, photo
- Designation (PI, PhD, M.Tech, B.Tech, Staff, Intern)
- Research focus and bio
- Social links (LinkedIn, ResearchGate, Google Scholar, ORCID)
- Contact information

### Research Projects
- Title, description, status
- Start and end dates
- Funding source and amount
- Collaborators and keywords
- Team members assignment

### Publications
- Full citation details
- Authors, journal, year
- DOI and abstract
- Publication type (Journal Article, Conference Paper, etc.)
- PDF attachment support

### Resources
- File uploads with metadata
- Categories (Protocol, Dataset, Software, etc.)
- Public/private visibility
- File size and type tracking

### Announcements
- News and updates
- Categories (News, Achievement, Event, etc.)
- Featured posts
- Publish/draft status

## 🔧 Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
SECRET_KEY=your-secret-key-change-in-production
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## 🐛 Troubleshooting

### Backend not starting
- Check MongoDB is running: `sudo supervisorctl status mongodb`
- View error logs: `tail -f /var/log/supervisor/backend.err.log`

### Frontend not building
- Clear node_modules: `rm -rf node_modules && yarn install`
- Check Vite logs: `tail -f /var/log/supervisor/frontend.err.log`

### Authentication issues
- Verify JWT secret key is set in backend .env
- Check browser console for errors
- Verify token is being stored in localStorage

## 📝 Development

### Adding New Features

1. **Backend**: Add routes in `server.py`
2. **Frontend**: Add API calls in `src/lib/api.ts`
3. **Components**: Create new components in `src/components/` or `src/pages/`
4. **State**: Update Zustand store in `src/store/`

### Database Schema

Collections:
- `profiles`: User profiles
- `projects`: Research projects
- `publications`: Scientific publications
- `resources`: Lab resources
- `announcements`: News and updates

All documents use UUID for `id` field (not MongoDB ObjectId).

## 🎯 Minimalist Design Principles

- Clean, simple interface
- Focus on content
- Intuitive navigation
- Responsive layouts
- Consistent color scheme (Blue palette)
- Clear typography
- Minimal distractions

## 📄 License

This project is for the ChemBioSystems Laboratory at IIT (BHU) Varanasi.

## 👥 Support

For issues or questions, contact the laboratory administration.
