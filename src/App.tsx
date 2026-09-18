import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AwardsHonours from './pages/AwardsHonours';
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
import CMSLayout from './components/cms/CMSLayout';
import CMSDashboard from './pages/admin/CMSDashboard';
import PublicationsAdmin from './pages/admin/PublicationsAdmin';
import PatentsAdmin from './pages/admin/PatentsAdmin';
import TeamAdmin from './pages/admin/TeamAdmin';
import ResearchAdmin from './pages/admin/ResearchAdmin';
import AwardsAdmin from './pages/admin/AwardsAdmin';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import OpportunitiesAdmin from './pages/admin/OpportunitiesAdmin';
import NewsAdmin from './pages/admin/NewsAdmin';
import PIInfoAdmin from './pages/admin/PIInfoAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

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

          {/* CMS Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <CMSLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CMSDashboard />} />
            <Route path="publications" element={<PublicationsAdmin />} />
            <Route path="patents" element={<PatentsAdmin />} />
            <Route path="team" element={<TeamAdmin />} />
            <Route path="research" element={<ResearchAdmin />} />
            <Route path="awards" element={<AwardsAdmin />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="opportunities" element={<OpportunitiesAdmin />} />
            <Route path="news" element={<NewsAdmin />} />
            <Route path="pi-info" element={<PIInfoAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>

          {/* Public routes with header and footer */}
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/about/awards-honours" element={<AwardsHonours />} />
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
