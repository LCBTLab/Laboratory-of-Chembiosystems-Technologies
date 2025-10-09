import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PIPage from './pages/PIPage';
import TeamPage from './pages/TeamPage';
import ResearchPage from './pages/ResearchPage';
import PublicationsPage from './pages/PublicationsPage';               
import PatentsPage from './pages/PatentsPage';
import GalleryPage from './pages/GalleryPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DashboardListPage from './pages/DashboardListPage';
import DashboardViewPage from './pages/DashboardViewPage';
import DashboardEditPage from './pages/DashboardEditPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected dashboard route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Dashboard System Routes */}
          <Route 
            path="/dashboards" 
            element={
              <ProtectedRoute>
                <DashboardListPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/:id" 
            element={
              <ProtectedRoute>
                <DashboardViewPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/:id/edit" 
            element={
              <ProtectedRoute>
                <DashboardEditPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Public routes with header and footer */}
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/pi" element={<PIPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/research" element={<ResearchPage />} />
                  <Route path="/publications" element={<PublicationsPage />} />
                  <Route path="/patents" element={<PatentsPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/opportunities" element={<OpportunitiesPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
