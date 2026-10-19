import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Settings, 
  Image as ImageIcon, 
  Layers, 
  FolderPlus, 
  Calendar, 
  Users, 
  Eye, 
  Building2, 
  Share2, 
  MessageSquare, 
  UserCheck, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Globe, 
  Lock, 
  KeyRound, 
  Check, 
  X, 
  Upload, 
  RefreshCw,
  Search,
  ChevronRight,
  Star,
  FileText
} from 'lucide-react';
import { 
  useZiprooStore, 
  BranchData, 
  ProjectData, 
  TeamMember, 
  CompanyUpdate, 
  SocialMediaItem, 
  ViewerFeedback, 
  AdminAccount 
} from '../data/ziprooStore';
import { ZiprooLogo } from '../components/ZiprooLogo';

export const AdminDashboardPage: React.FC = () => {
  const store = useZiprooStore();
  const navigate = useNavigate();

  // Active Menu Section (1 to 11)
  const [activeTab, setActiveTab] = useState<
    | 'branding'
    | 'hero'
    | 'branches'
    | 'projects'
    | 'updates'
    | 'leadership'
    | 'vision'
    | 'company'
    | 'social'
    | 'feedback'
    | 'admins'
  >('branding');

  // Login form state (if not authenticated)
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Success / Action notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Confirmation modal state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    action: () => {},
  });

  const requestConfirm = (title: string, message: string, action: () => void) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      action: () => {
        action();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Handle Admin Sign In
  const handleAdminSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginUser.trim() || !loginPass.trim()) {
      setLoginError('Please enter administrator username or email and password.');
      return;
    }

    const ok = store.verifyAdminLogin(loginUser.trim(), loginPass.trim());
    if (ok) {
      showToast('Welcome back, Administrator.');
    } else {
      setLoginError('Invalid administrative credentials. Access restricted to authorized personnel.');
    }
  };

  // ==========================================
  // UNATHENTICATED STATE: ADMIN LOGIN SCREEN
  // ==========================================
  if (!store.isAdmin) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <ZiprooLogo variant="original" size="md" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Restricted Management Portal</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
              Administrator Login
            </h1>
            <p className="text-xs text-slate-500">
              Enter your authorized administrative credentials to manage corporate operations, branches, and dispatches.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminSignIn} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Admin Username or Email
              </label>
              <input
                type="text"
                required
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="admin or ziproo2026@gmail.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Access Admin Console</span>
            </button>

            <div className="pt-2 text-center">
              <Link to="/" className="text-xs text-slate-400 hover:text-emerald-700">
                ← Return to Public Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED STATE: COMPLETE ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl flex items-center gap-3 animate-fade-in border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display">{confirmDialog.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{confirmDialog.message}</p>
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={confirmDialog.action}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Admin Bar */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <ZiprooLogo variant="original" size="sm" />
          </Link>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>EXECUTIVE ADMIN CONSOLE</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            target="_blank"
            className="text-xs text-slate-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>View Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <span className="text-xs text-slate-700 font-mono font-semibold">
              {store.currentAdmin?.name || 'Administrator'}
            </span>
            <button
              onClick={() => {
                store.logoutAdmin();
                navigate('/');
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
              title="Logout from Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout (Sidebar Menus 1-11 + Main Content Area) */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 gap-8">
        {/* SIDEBAR NAVIGATION (11 Dashboard Menus) */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="p-3 mb-2 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs text-emerald-900 font-semibold">
            Management Sections
          </div>

          <nav className="space-y-1 text-xs">
            {[
              { id: 'branding', label: '1. Website Branding', icon: Settings },
              { id: 'hero', label: '2. Homepage Wallpaper & Logo', icon: ImageIcon },
              { id: 'branches', label: '3. Branch Management', icon: Layers },
              { id: 'projects', label: '4. Project Management', icon: FolderPlus },
              { id: 'updates', label: '5. Company Updates', icon: Calendar },
              { id: 'leadership', label: '6. Leadership Management', icon: Users },
              { id: 'vision', label: '7. Vision & Mission', icon: Eye },
              { id: 'company', label: '8. Contact & Description', icon: Building2 },
              { id: 'social', label: '9. Social Media Links', icon: Share2 },
              { id: 'feedback', label: '10. Viewer Feedback', icon: MessageSquare, badge: store.feedbackList.filter(f => f.status === 'new').length },
              { id: 'admins', label: '11. Admin Accounts', icon: UserCheck },
            ].map((menu) => {
              const Icon = menu.icon;
              const isActive = activeTab === menu.id;
              return (
                <button
                  key={menu.id}
                  onClick={() => setActiveTab(menu.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{menu.label}</span>
                  </div>
                  {menu.badge ? (
                    <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      {menu.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* MAIN SETTINGS PANEL */}
        <main className="flex-1 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* SECTION 1: WEBSITE BRANDING */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">1. Website Branding</h2>
                <p className="text-xs text-slate-500">Configure global company name, slogan, and core branding texts.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company Name</label>
                  <input
                    type="text"
                    value={store.settings.companyName}
                    onChange={(e) => store.updateSettings({ companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Exact Slogan</label>
                  <input
                    type="text"
                    value={store.settings.slogan}
                    onChange={(e) => store.updateSettings({ slogan: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                  <p className="text-[11px] text-slate-400 mt-0.5">Displayed prominently beneath the logo on homepage: "CREATE YOUR IDENTITY"</p>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tagline</label>
                  <input
                    type="text"
                    value={store.settings.tagline}
                    onChange={(e) => store.updateSettings({ tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Intro Quote</label>
                  <textarea
                    rows={2}
                    value={store.settings.introQuote}
                    onChange={(e) => store.updateSettings({ introQuote: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Intro Detailed Description</label>
                  <textarea
                    rows={3}
                    value={store.settings.introDescription}
                    onChange={(e) => store.updateSettings({ introDescription: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => showToast('Branding settings saved and published successfully.')}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Publish Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: HOMEPAGE BACKGROUND AND LOGO */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">2. Homepage Background and Logo</h2>
                <p className="text-xs text-slate-500">
                  Update the abstract corporate wallpaper (MUST BE WITHOUT PEOPLE) and customize the logo mark.
                </p>
              </div>

              <div className="space-y-6 text-xs">
                {/* Logo Preview & Configuration */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">ZIPROO Logo Asset</h3>
                  <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                    {store.settings.logoUrl ? (
                      <img src={store.settings.logoUrl} alt="Custom Logo" className="h-14 object-contain" />
                    ) : (
                      <ZiprooLogo variant="original" size="lg" />
                    )}
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Custom Logo Image URL (leave empty to use original vector ZIPROO mark)"
                      value={store.settings.logoUrl}
                      onChange={(e) => store.updateSettings({ logoUrl: e.target.value })}
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs"
                    />
                    <button
                      onClick={() => {
                        store.updateSettings({ logoUrl: '' });
                        showToast('Restored original ZIPROO vector logo.');
                      }}
                      className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl text-slate-700 font-semibold"
                    >
                      Use Original Logo
                    </button>
                  </div>
                </div>

                {/* Wallpaper Configuration */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Homepage Abstract Wallpaper (No People / No Silhouettes)
                  </h3>
                  <div className="relative h-48 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-200">
                    <img
                      src={store.settings.heroBackgroundUrl}
                      alt="Wallpaper preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Wallpaper URL / Path</label>
                    <input
                      type="text"
                      value={store.settings.heroBackgroundUrl}
                      onChange={(e) => store.updateSettings({ heroBackgroundUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs"
                    />
                  </div>
                </div>

                <button
                  onClick={() => showToast('Homepage visual assets updated and published.')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Visual Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION 3: BRANCH MANAGEMENT */}
          {activeTab === 'branches' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-display">3. Branch Management</h2>
                  <p className="text-xs text-slate-500">
                    Manage published corporate branches. Card clicks and "Visit Website" open verified branch URLs.
                  </p>
                </div>
                <button
                  onClick={() => {
                    store.addBranch({
                      name: 'ZIPROO NEW DIVISION',
                      tagline: 'Future Frontier',
                      category: 'Enterprise Innovation',
                      description: 'Expanding strategic operations.',
                      fullDescription: 'Comprehensive mandate and multi-sector initiatives.',
                      offerings: ['Consulting', 'System Architecture'],
                      image: '/src/assets/images/futuristic_it_technology_1792336067869.jpg',
                      badge: 'New Division',
                      websiteUrl: 'https://ziproo.com/division',
                      published: true,
                    });
                    showToast('New draft branch added.');
                  }}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Create Branch</span>
                </button>
              </div>

              <div className="space-y-4">
                {store.branches.map((branch) => (
                  <div
                    key={branch.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <img
                          src={branch.image}
                          alt={branch.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <input
                            type="text"
                            value={branch.name}
                            onChange={(e) => store.updateBranch(branch.id, { name: e.target.value })}
                            className="font-bold text-sm text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-300"
                          />
                          <p className="text-[11px] text-slate-400 mt-0.5">ID: {branch.id}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            store.toggleBranchPublish(branch.id);
                            showToast(`Branch ${branch.published ? 'unpublished' : 'published'}.`);
                          }}
                          className={`px-3 py-1 rounded-lg font-semibold text-[11px] ${
                            branch.published
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {branch.published ? 'Published' : 'Draft / Unpublished'}
                        </button>
                        <button
                          onClick={() =>
                            requestConfirm(
                              'Delete Branch',
                              `Are you sure you want to delete ${branch.name}? Related data in other sections will not be affected.`,
                              () => {
                                store.deleteBranch(branch.id);
                                showToast('Branch deleted.');
                              }
                            )
                          }
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                          title="Delete branch"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Tagline</label>
                        <input
                          type="text"
                          value={branch.tagline}
                          onChange={(e) => store.updateBranch(branch.id, { tagline: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Official Website URL (HTTPS)</label>
                        <input
                          type="url"
                          value={branch.websiteUrl}
                          onChange={(e) => store.updateBranch(branch.id, { websiteUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-emerald-800 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Short Description</label>
                      <textarea
                        rows={2}
                        value={branch.description}
                        onChange={(e) => store.updateBranch(branch.id, { description: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: PROJECT MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-display">4. Project Management</h2>
                  <p className="text-xs text-slate-500">Publish and manage portfolio projects, sector ties, and demo URLs.</p>
                </div>
                <button
                  onClick={() => {
                    store.addProject({
                      title: 'New Enterprise Initiative',
                      sector: 'ZIPROO IT Solutions',
                      description: 'Breakthrough multi-sector system.',
                      metrics: 'Production Grade',
                      year: '2026',
                      image: '/src/assets/images/ziproo_tech_innovation_1792336085977.jpg',
                      status: 'Live & Operational',
                      launchDate: 'October 2026',
                      demoUrl: 'https://ziproo.com/projects',
                      published: true,
                    });
                    showToast('New project created.');
                  }}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Create Project</span>
                </button>
              </div>

              <div className="space-y-4">
                {store.projects.map((proj) => (
                  <div key={proj.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => store.updateProject(proj.id, { title: e.target.value })}
                        className="font-bold text-sm text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-300 w-2/3"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => store.toggleProjectPublish(proj.id)}
                          className={`px-3 py-1 rounded-lg font-semibold text-[11px] ${
                            proj.published
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {proj.published ? 'Published' : 'Draft'}
                        </button>
                        <button
                          onClick={() =>
                            requestConfirm('Delete Project', `Delete project ${proj.title}?`, () => {
                              store.deleteProject(proj.id);
                              showToast('Project deleted.');
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Sector</label>
                        <input
                          type="text"
                          value={proj.sector}
                          onChange={(e) => store.updateProject(proj.id, { sector: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Website / Demo URL</label>
                        <input
                          type="url"
                          value={proj.demoUrl || ''}
                          onChange={(e) => store.updateProject(proj.id, { demoUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-emerald-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => store.updateProject(proj.id, { description: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: COMPANY UPDATES */}
          {activeTab === 'updates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-display">5. Company Updates</h2>
                  <p className="text-xs text-slate-500">Chronological feed of branch launches, projects, and dispatches.</p>
                </div>
                <button
                  onClick={() => {
                    store.addUpdate({
                      title: 'New Official Company Milestone',
                      date: 'October 18, 2026',
                      category: 'Company Announcement',
                      description: 'Strategic roadmap and execution details.',
                      content: 'Detailed press release published to public visitors.',
                      image: '/src/assets/images/modern_corporate_headquarters_1792336069158.jpg',
                      readTime: '3 min read',
                      published: true,
                    });
                    showToast('New announcement created.');
                  }}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Create Update</span>
                </button>
              </div>

              <div className="space-y-4">
                {store.updates.map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => store.updateCompanyUpdate(item.id, { title: e.target.value })}
                        className="font-bold text-sm text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-300 w-2/3"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => store.toggleUpdatePublish(item.id)}
                          className={`px-3 py-1 rounded-lg font-semibold text-[11px] ${
                            item.published
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {item.published ? 'Published' : 'Draft'}
                        </button>
                        <button
                          onClick={() =>
                            requestConfirm('Delete Announcement', `Delete announcement "${item.title}"?`, () => {
                              store.deleteUpdate(item.id);
                              showToast('Update removed.');
                            })
                          }
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Category</label>
                        <select
                          value={item.category}
                          onChange={(e) => store.updateCompanyUpdate(item.id, { category: e.target.value as any })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        >
                          <option value="Branch Launch">Branch Launch</option>
                          <option value="New Project">New Project</option>
                          <option value="Company Announcement">Company Announcement</option>
                          <option value="Business Update">Business Update</option>
                          <option value="Future Milestone">Future Milestone</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Date</label>
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) => store.updateCompanyUpdate(item.id, { date: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Short Description</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => store.updateCompanyUpdate(item.id, { description: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: LEADERSHIP MANAGEMENT */}
          {activeTab === 'leadership' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-display">6. Leadership Management</h2>
                  <p className="text-xs text-slate-500">Manage Founder and Co-Founders, positions, roles, and portraits.</p>
                </div>
              </div>

              <div className="space-y-4">
                {store.team.map((member) => (
                  <div key={member.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-14 h-14 rounded-2xl object-cover object-top border border-slate-300"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => store.updateTeamMember(member.id, { name: e.target.value })}
                          className="font-bold text-sm text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-300 w-full max-w-xs"
                        />
                        <p className="text-[11px] text-slate-500 mt-0.5">Profile Key: {member.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Position</label>
                        <input
                          type="text"
                          value={member.position}
                          onChange={(e) => store.updateTeamMember(member.id, { position: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Role & Responsibilities</label>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => store.updateTeamMember(member.id, { role: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Profile Photo URL or Path</label>
                      <input
                        type="text"
                        value={member.image}
                        onChange={(e) => store.updateTeamMember(member.id, { image: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Biography</label>
                      <textarea
                        rows={2}
                        value={member.bio}
                        onChange={(e) => store.updateTeamMember(member.id, { bio: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => showToast('Leadership profiles updated and published live.')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 text-xs shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Publish Leadership Changes</span>
              </button>
            </div>
          )}

          {/* SECTION 7: VISION AND MISSION */}
          {activeTab === 'vision' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">7. Vision and Mission</h2>
                <p className="text-xs text-slate-500">Edit the official corporate vision and mission manifestos.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Our Vision</label>
                  <textarea
                    rows={4}
                    value={store.settings.visionText}
                    onChange={(e) => store.updateSettings({ visionText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Our Mission</label>
                  <textarea
                    rows={4}
                    value={store.settings.missionText}
                    onChange={(e) => store.updateSettings({ missionText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm leading-relaxed"
                  />
                </div>

                <button
                  onClick={() => showToast('Vision and Mission manifestos published.')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 text-xs shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Vision & Mission</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION 8: CONTACT AND COMPANY DESCRIPTION */}
          {activeTab === 'company' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">8. Contact and Company Description</h2>
                <p className="text-xs text-slate-500">Configure public contact details, official email, and corporate description.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Company Description</label>
                  <textarea
                    rows={5}
                    value={store.settings.companyDescription}
                    onChange={(e) => store.updateSettings({ companyDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Official Company Email</label>
                    <input
                      type="email"
                      value={store.settings.companyEmail}
                      onChange={(e) => store.updateSettings({ companyEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Direct Phone</label>
                    <input
                      type="text"
                      value={store.settings.companyPhone}
                      onChange={(e) => store.updateSettings({ companyPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Global Headquarters Address</label>
                  <input
                    type="text"
                    value={store.settings.companyAddress}
                    onChange={(e) => store.updateSettings({ companyAddress: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <button
                  onClick={() => showToast('Company details and description updated.')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 text-xs shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Details</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION 9: SOCIAL MEDIA LINKS */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-display">9. Social Media Links</h2>
                  <p className="text-xs text-slate-500">Manage official broadcast handles and external verified URLs.</p>
                </div>
              </div>

              <div className="space-y-3">
                {store.socialLinks.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4 text-xs">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                      <span className="font-bold text-slate-900">{item.platform}</span>
                      <input
                        type="text"
                        value={item.handle}
                        onChange={(e) => store.updateSocialLink(item.id, { handle: e.target.value })}
                        className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-mono"
                      />
                      <input
                        type="url"
                        value={item.url}
                        onChange={(e) => store.updateSocialLink(item.id, { url: e.target.value })}
                        className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-emerald-800 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => showToast('Social media links updated.')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 text-xs shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Save Social Links</span>
              </button>
            </div>
          )}

          {/* SECTION 10: VIEWER FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">10. Viewer Feedback Submissions</h2>
                <p className="text-xs text-slate-500">
                  Private feedback submitted by registered viewers. Only administrators can review or manage these records.
                </p>
              </div>

              {store.feedbackList.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
                  No feedback submissions recorded yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {store.feedbackList.map((fb) => (
                    <div
                      key={fb.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{fb.userName}</span>
                            <span className="text-slate-400 font-mono">({fb.userEmail})</span>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono mt-0.5">
                            <span>Category: {fb.category}</span>
                            <span>·</span>
                            <span>{fb.createdAt}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={fb.status}
                            onChange={(e) => store.updateFeedbackStatus(fb.id, e.target.value as any)}
                            className="px-2 py-1 bg-white border border-slate-300 rounded-lg text-[11px] font-semibold text-slate-800"
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="resolved">Resolved</option>
                          </select>
                          <button
                            onClick={() =>
                              requestConfirm('Delete Feedback', 'Are you sure you want to delete this viewer feedback?', () => {
                                store.deleteFeedback(fb.id);
                                showToast('Feedback deleted.');
                              })
                            }
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < fb.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`}
                          />
                        ))}
                        <span className="text-[11px] font-mono font-bold text-slate-700 ml-1">
                          {fb.rating} / 5
                        </span>
                      </div>

                      <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                        "{fb.message}"
                      </p>

                      <div>
                        <label className="block text-slate-600 font-semibold mb-1 text-[11px]">
                          Internal Admin Notes (Private)
                        </label>
                        <input
                          type="text"
                          value={fb.adminNotes || ''}
                          onChange={(e) => store.updateFeedbackStatus(fb.id, fb.status, e.target.value)}
                          placeholder="Add internal action notes..."
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 11: ADMIN ACCOUNT MANAGEMENT */}
          {activeTab === 'admins' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">11. Admin Account Management</h2>
                <p className="text-xs text-slate-500">
                  Provision new administrators, review active administrative clearance, and revoke privileges securely.
                </p>
              </div>

              {/* Active Admins List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase text-slate-700 font-mono tracking-wider">
                  Active Authorized Administrators
                </h3>
                {store.admins.map((adm) => (
                  <div
                    key={adm.username}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{adm.name}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-semibold">
                          {adm.role}
                        </span>
                      </div>
                      <p className="text-slate-500 font-mono text-[11px] mt-0.5">
                        Username: {adm.username} · Email: {adm.email} · Created: {adm.createdAt}
                      </p>
                    </div>

                    {!adm.isPrimary ? (
                      <button
                        onClick={() =>
                          requestConfirm(
                            'Revoke Admin Access',
                            `Are you sure you want to revoke administrative clearance for ${adm.name} (@${adm.username})?`,
                            () => {
                              store.revokeAdmin(adm.username);
                              showToast(`Administrator @${adm.username} revoked.`);
                            }
                          )
                        }
                        className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 font-semibold"
                      >
                        Revoke Clearance
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">Master SuperAdmin</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Enroll New Admin Form */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/90 space-y-3 text-xs">
                <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>Provision New Administrative Account</span>
                </h3>
                <p className="text-[11px] text-slate-600">
                  New administrators will be able to access this dashboard and publish changes.
                </p>

                <AdminEnrollmentForm
                  onAdminCreated={() => showToast('New administrator enrolled successfully.')}
                  onCreate={store.createNewAdmin}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Sub-component for enrolling new admin
const AdminEnrollmentForm: React.FC<{
  onAdminCreated: () => void;
  onCreate: (newAdmin: Omit<AdminAccount, 'createdAt'>) => boolean;
}> = ({ onAdminCreated, onCreate }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Executive Administrator');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (!username.trim() || !password.trim() || !email.trim()) {
      setErr('All required fields must be supplied.');
      return;
    }

    const success = onCreate({
      username: username.trim(),
      email: email.trim(),
      name: name.trim() || username.trim(),
      role,
      password: password.trim(),
    });

    if (success) {
      setUsername('');
      setEmail('');
      setName('');
      setPassword('');
      onAdminCreated();
    } else {
      setErr('An administrator with this username already exists.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {err && <p className="text-rose-600 font-medium">{err}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-700 font-semibold mb-1">New Admin Username</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. director_rohit"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Corporate Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. director@ziproo.com"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Full Legal Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Executive Director"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Role Designation</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
          >
            <option value="Executive Administrator">Executive Administrator</option>
            <option value="Branch Operations Director">Branch Operations Director</option>
            <option value="Editorial Director">Editorial Director</option>
            <option value="Super Administrator">Super Administrator</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-slate-700 font-semibold mb-1">Security Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
        />
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-sm cursor-pointer"
      >
        Grant Administrator Clearance
      </button>
    </form>
  );
};
