/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { LegalModal } from './components/LegalModals';
import { ViewerFeedbackModal } from './components/ViewerFeedbackModal';
import { HomePage } from './pages/HomePage';
import { BranchesPage } from './pages/BranchesPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { VisionMissionPage } from './pages/VisionMissionPage';
import { AboutPage } from './pages/AboutPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { useZiprooStore } from './data/ziprooStore';

// Scroll to top helper when navigating between separate pages
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

export default function App() {
  const store = useZiprooStore();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAdminAuthTrigger, setIsAdminAuthTrigger] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleOpenViewerAuth = () => {
    setIsAdminAuthTrigger(false);
    setAuthModalOpen(true);
  };

  const handleOpenAdminAuth = () => {
    setIsAdminAuthTrigger(true);
    setAuthModalOpen(true);
  };

  const handleOpenFeedback = () => {
    setIsFeedbackModalOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-emerald-600 selection:text-white">
        {/* White and Green Top Sticky Navigation Bar */}
        <Navbar
          onOpenAuth={handleOpenViewerAuth}
          isAdmin={store.isAdmin}
          user={store.user}
          onLogoutUser={store.logoutUser}
          onLogoutAdmin={store.logoutAdmin}
          customLogoUrl={store.settings.logoUrl}
          onOpenFeedback={handleOpenFeedback}
        />

        {/* Five Separate Page Routes */}
        <main className="flex-1">
          <Routes>
            {/* Page 1: Homepage */}
            <Route
              path="/"
              element={
                <HomePage
                  onOpenAuth={handleOpenViewerAuth}
                  user={store.user}
                  branches={store.branches}
                  settings={store.settings}
                  onOpenFeedback={handleOpenFeedback}
                />
              }
            />

            {/* Page 2: Our Branches (Added by admin only) */}
            <Route
              path="/branches"
              element={
                <BranchesPage
                  branches={store.branches}
                  onAddBranch={store.addBranch}
                  onUpdateBranch={store.updateBranch}
                  onDeleteBranch={store.deleteBranch}
                  projects={store.projects}
                  onAddProject={store.addProject}
                  onDeleteProject={store.deleteProject}
                  onAddUpdate={store.addUpdate}
                  isAdmin={store.isAdmin}
                  onOpenAdminAuth={handleOpenAdminAuth}
                  onCreateNewAdmin={store.createNewAdmin}
                />
              }
            />

            {/* Page 3: Leadership Page (Founder, Co-Founder, Co-Founder) */}
            <Route
              path="/leadership"
              element={
                <LeadershipPage
                  team={store.team}
                  onUpdateTeamMember={store.updateTeamMember}
                  isAdmin={store.isAdmin}
                  onOpenAdminAuth={handleOpenAdminAuth}
                />
              }
            />
            {/* Alias for /team */}
            <Route
              path="/team"
              element={
                <LeadershipPage
                  team={store.team}
                  onUpdateTeamMember={store.updateTeamMember}
                  isAdmin={store.isAdmin}
                  onOpenAdminAuth={handleOpenAdminAuth}
                />
              }
            />

            {/* Page 4: Vision & Mission Page */}
            <Route
              path="/vision-mission"
              element={
                <VisionMissionPage
                  updates={store.updates}
                  onAddUpdate={store.addUpdate}
                  onDeleteUpdate={store.deleteUpdate}
                  isAdmin={store.isAdmin}
                  onOpenAdminAuth={handleOpenAdminAuth}
                />
              }
            />

            {/* Page 5: About & Media Links */}
            <Route
              path="/about"
              element={
                <AboutPage
                  socialLinks={store.socialLinksObject}
                  onUpdateSocialLinks={store.updateSocialLinks}
                  isAdmin={store.isAdmin}
                  onOpenAdminAuth={handleOpenAdminAuth}
                />
              }
            />

            {/* Admin Dashboard & Management Console */}
            <Route
              path="/admin"
              element={<AdminDashboardPage />}
            />

            {/* Catch-all */}
            <Route
              path="*"
              element={
                <HomePage
                  onOpenAuth={handleOpenViewerAuth}
                  user={store.user}
                  branches={store.branches}
                  settings={store.settings}
                  onOpenFeedback={handleOpenFeedback}
                />
              }
            />
          </Routes>
        </main>

        {/* Universal White & Green Footer */}
        <Footer
          onOpenPrivacy={() => setLegalModalType('privacy')}
          onOpenTerms={() => setLegalModalType('terms')}
          onOpenAdminAuth={handleOpenAdminAuth}
          customLogoUrl={store.settings.logoUrl}
          onOpenFeedback={handleOpenFeedback}
        />

        {/* Authentication Modal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onGoogleLogin={store.loginWithGoogle}
          onEmailLogin={store.loginWithEmail}
          onAdminLogin={store.verifyAdminLogin}
          isAdmin={store.isAdmin}
          onCreateAdmin={store.createNewAdmin}
          defaultAdminTab={isAdminAuthTrigger}
        />

        {/* Viewer Feedback Box Modal */}
        <ViewerFeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
          user={store.user}
          onSubmitFeedback={store.submitFeedback}
          onOpenAuth={handleOpenViewerAuth}
        />

        {/* Legal Modals */}
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </div>
    </Router>
  );
}
