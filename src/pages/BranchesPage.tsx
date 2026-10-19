import React, { useState } from 'react';
import { 
  Shirt, 
  Cpu, 
  ArrowRight, 
  Edit3, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  X, 
  Briefcase, 
  Sparkles, 
  FolderPlus,
  UserPlus,
  Calendar,
  Layers,
  CheckCircle2,
  ExternalLink,
  Globe
} from 'lucide-react';
import { BranchData, ProjectData, CompanyUpdate, AdminAccount } from '../data/ziprooStore';
import { ZiprooLogo } from '../components/ZiprooLogo';

interface BranchesPageProps {
  branches: BranchData[];
  onAddBranch: (b: Omit<BranchData, 'id'>) => void;
  onUpdateBranch: (id: string, updated: Partial<BranchData>) => void;
  onDeleteBranch: (id: string) => void;
  projects: ProjectData[];
  onAddProject: (p: Omit<ProjectData, 'id'>) => void;
  onDeleteProject: (id: string) => void;
  onAddUpdate: (u: Omit<CompanyUpdate, 'id'>) => void;
  isAdmin: boolean;
  onOpenAdminAuth: () => void;
  onCreateNewAdmin: (a: Omit<AdminAccount, 'createdAt'>) => boolean;
}

export const BranchesPage: React.FC<BranchesPageProps> = ({
  branches,
  onAddBranch,
  onUpdateBranch,
  onDeleteBranch,
  projects,
  onAddProject,
  onDeleteProject,
  onAddUpdate,
  isAdmin,
  onOpenAdminAuth,
  onCreateNewAdmin,
}) => {
  // Modals
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);

  // New Branch Form
  const [branchName, setBranchName] = useState('');
  const [branchTagline, setBranchTagline] = useState('');
  const [branchDesc, setBranchDesc] = useState('');
  const [branchOfferings, setBranchOfferings] = useState('');
  const [branchWebsiteUrl, setBranchWebsiteUrl] = useState('https://ziproo.com');
  const [branchImage, setBranchImage] = useState('/src/assets/images/luxury_fashion_flagship_1792336067401.jpg');
  const [branchBadge, setBranchBadge] = useState('New Corporate Sector');
  const [deleteConfirmBranch, setDeleteConfirmBranch] = useState<BranchData | null>(null);

  // New Project Form
  const [projTitle, setProjTitle] = useState('');
  const [projSector, setProjSector] = useState('ZIPROO IT Solutions');
  const [projDesc, setProjDesc] = useState('');
  const [projMetrics, setProjMetrics] = useState('Enterprise Grade');
  const [projYear, setProjYear] = useState('2026');
  const [projDemoUrl, setProjDemoUrl] = useState('https://ziproo.com/projects');
  const [projImage, setProjImage] = useState('/src/assets/images/futuristic_it_technology_1792336067869.jpg');

  // New Update Form
  const [upTitle, setUpTitle] = useState('');
  const [upCategory, setUpCategory] = useState<CompanyUpdate['category']>('Innovation');
  const [upDesc, setUpDesc] = useState('');
  const [upContent, setUpContent] = useState('');

  // Create Admin Form (Admin only)
  const [newAdminUser, setNewAdminUser] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Executive Administrator');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [adminSuccessMsg, setAdminSuccessMsg] = useState(false);

  // Handlers
  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchName.trim() || !branchDesc.trim()) return;

    onAddBranch({
      name: branchName.trim(),
      tagline: branchTagline.trim() || 'Next-Gen Sector',
      category: 'Specialized Enterprise Branch',
      description: branchDesc.trim(),
      fullDescription: branchDesc.trim(),
      offerings: branchOfferings.split(',').map((s) => s.trim()).filter(Boolean),
      image: branchImage,
      badge: branchBadge,
      websiteUrl: branchWebsiteUrl.trim() || 'https://ziproo.com',
      published: true,
    });

    setBranchName('');
    setBranchTagline('');
    setBranchDesc('');
    setBranchOfferings('');
    setBranchWebsiteUrl('https://ziproo.com');
    setIsAddBranchModalOpen(false);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projDesc.trim()) return;

    onAddProject({
      title: projTitle.trim(),
      sector: projSector,
      description: projDesc.trim(),
      metrics: projMetrics,
      year: projYear,
      image: projImage,
      status: 'Live & Operational',
      launchDate: 'October 2026',
      demoUrl: projDemoUrl.trim() || 'https://ziproo.com/projects',
      published: true,
    });

    setProjTitle('');
    setProjDesc('');
    setProjDemoUrl('https://ziproo.com/projects');
    setIsAddProjectModalOpen(false);
  };

  const handleCreateUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upTitle.trim() || !upDesc.trim()) return;

    onAddUpdate({
      title: upTitle.trim(),
      category: upCategory,
      date: 'October 18, 2026',
      description: upDesc.trim(),
      content: upContent.trim() || upDesc.trim(),
      image: '/src/assets/images/ziproo_tech_innovation_1792336085977.jpg',
      readTime: '3 min read',
      published: true,
    });

    setUpTitle('');
    setUpDesc('');
    setUpContent('');
    setIsAddUpdateModalOpen(false);
  };

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUser.trim() || !newAdminPass.trim() || !newAdminEmail.trim()) return;

    const ok = onCreateNewAdmin({
      username: newAdminUser.trim(),
      email: newAdminEmail.trim(),
      name: newAdminName.trim() || newAdminUser.trim(),
      role: newAdminRole,
      password: newAdminPass.trim(),
    });

    if (ok) {
      setAdminSuccessMsg(true);
      setTimeout(() => {
        setAdminSuccessMsg(false);
        setIsCreateAdminModalOpen(false);
        setNewAdminUser('');
        setNewAdminEmail('');
        setNewAdminPass('');
      }, 1000);
    }
  };

  return (
    // WHITE & GREEN CORPORATE PALETTE
    <div className="min-h-screen bg-[#f8fafc] py-12 lg:py-20 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-mono font-medium">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Multi-Sector Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-display">
            OUR BRANCHES
          </h1>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-light">
            "Expanding Innovation Across Diverse Industries."
          </p>
        </div>

        {/* ADMIN ONLY CONTROLS (Only visible when admin is signed in) */}
        {isAdmin && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-emerald-300 shadow-md flex flex-wrap items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Administrator Operations Panel</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsAddBranchModalOpen(true)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Branch</span>
              </button>

              <button
                onClick={() => setIsAddProjectModalOpen(true)}
                className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <FolderPlus className="w-3.5 h-3.5 text-emerald-400" />
                <span>+ Add Project</span>
              </button>

              <button
                onClick={() => setIsAddUpdateModalOpen(true)}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>+ Add Update</span>
              </button>

              {/* Create new admin option (ONLY for admin) */}
              <button
                onClick={() => setIsCreateAdminModalOpen(true)}
                className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
                <span>+ Create Admin</span>
              </button>
            </div>
          </div>
        )}

        {/* BRANCHES LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {branches.map((branch) => {
            const isClothing = branch.id === 'clothing';
            const targetUrl = branch.websiteUrl;
            return (
              <div
                key={branch.id}
                className="group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white hover:border-emerald-500/80 transition-all flex flex-col justify-between shadow-lg hover:shadow-xl"
              >
                {/* Branch Image */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

                  {/* Sector Badge */}
                  <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-xl bg-white/90 border border-slate-200 backdrop-blur-md text-xs font-semibold text-slate-900 flex items-center gap-2 shadow-sm">
                    {isClothing ? (
                      <Shirt className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Cpu className="w-4 h-4 text-emerald-600" />
                    )}
                    <span>{branch.badge}</span>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmBranch(branch);
                      }}
                      className="absolute top-5 right-5 p-2 rounded-xl bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white transition-colors shadow-sm cursor-pointer z-10"
                      title="Delete branch (Admin Only)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Branch Info */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-emerald-700 font-mono font-semibold">
                        {branch.tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mt-1">
                        {branch.name}
                      </h2>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      "{branch.description}"
                    </p>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 font-mono mb-3">
                        Offerings & Solutions:
                      </p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {branch.offerings.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-slate-800"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Branch Website Navigation Action (Admin & Viewers) */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
                    {targetUrl ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-600/20"
                        title={`Open ${branch.name} official website`}
                      >
                        <span>VISIT OFFICIAL WEBSITE</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <span>Official Website Coming Soon</span>
                      </button>
                    )}
                    <a
                      href="mailto:ziproo2026@gmail.com?subject=Inquiry"
                      className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION: OUR PROJECTS */}
        <section id="projects" className="pt-12 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-mono font-semibold">
                Landmark Deployments
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mt-1">
                OUR PROJECTS
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Flagship production initiatives in bespoke textiles and intelligent digital systems.
              </p>
            </div>

            {isAdmin && (
              <button
                onClick={() => setIsAddProjectModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Project</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="group rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-emerald-500 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-[11px] font-mono text-emerald-800 font-semibold shadow-sm">
                    {proj.sector}
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-white text-rose-600 hover:bg-rose-600 hover:text-white transition-colors shadow-sm"
                      title="Delete project"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>{proj.year}</span>
                      <span className="text-emerald-700 font-semibold">{proj.metrics}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-emerald-700 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {proj.demoUrl ? (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5"
                      >
                        <span>View Project Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                        {proj.status || 'Live & Operational'}
                      </span>
                    )}
                    <a
                      href="mailto:ziproo2026@gmail.com?subject=Project%20Inquiry"
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODAL: ADD NEW BRANCH (Admin Only) */}
        {isAddBranchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900">
              <button
                onClick={() => setIsAddBranchModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Add New Company Branch
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Administrative authorization confirmed. This branch will be published live across ZIPROO.
              </p>

              <form onSubmit={handleCreateBranch} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Branch Name</label>
                  <input
                    type="text"
                    required
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="e.g. ZIPROO AEROSPACE & LOGISTICS"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Tagline</label>
                  <input
                    type="text"
                    value={branchTagline}
                    onChange={(e) => setBranchTagline(e.target.value)}
                    placeholder="e.g. Precision In Motion"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={branchDesc}
                    onChange={(e) => setBranchDesc(e.target.value)}
                    placeholder="Comprehensive branch mandate..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">
                    Offerings (comma separated)
                  </label>
                  <input
                    type="text"
                    value={branchOfferings}
                    onChange={(e) => setBranchOfferings(e.target.value)}
                    placeholder="Consulting, Cloud Migration, Rapid Prototyping"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">
                    Official Branch Website Link (URL)
                  </label>
                  <input
                    type="url"
                    required
                    value={branchWebsiteUrl}
                    onChange={(e) => setBranchWebsiteUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Clicking this branch card will immediately navigate to this branch website in a new tab.
                  </p>
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddBranchModalOpen(false)}
                    className="px-4 py-2 text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm cursor-pointer"
                  >
                    Publish Branch
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW PROJECT (Admin Only) */}
        {isAddProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900">
              <button
                onClick={() => setIsAddProjectModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-emerald-600" />
                Add New Corporate Project
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Publish a landmark initiative to the ZIPROO portfolio.
              </p>

              <form onSubmit={handleCreateProject} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    placeholder="e.g. Generative Fabric Weaving"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Sector</label>
                    <input
                      type="text"
                      value={projSector}
                      onChange={(e) => setProjSector(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Year / Milestone</label>
                    <input
                      type="text"
                      value={projYear}
                      onChange={(e) => setProjYear(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    placeholder="Impact and technological breakthrough..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">
                    Project Demonstration / Website URL
                  </label>
                  <input
                    type="url"
                    value={projDemoUrl}
                    onChange={(e) => setProjDemoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    When viewers click "View Project Demo", it will open this URL in a new tab.
                  </p>
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddProjectModalOpen(false)}
                    className="px-4 py-2 text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW UPDATE (Admin Only) */}
        {isAddUpdateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900">
              <button
                onClick={() => setIsAddUpdateModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Publish Company Update
              </h3>

              <form onSubmit={handleCreateUpdate} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Title</label>
                  <input
                    type="text"
                    required
                    value={upTitle}
                    onChange={(e) => setUpTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Category</label>
                  <select
                    value={upCategory}
                    onChange={(e) => setUpCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  >
                    <option value="Fashion">Fashion</option>
                    <option value="IT Solutions">IT Solutions</option>
                    <option value="Innovation">Innovation</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Global">Global</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Summary</label>
                  <textarea
                    rows={2}
                    required
                    value={upDesc}
                    onChange={(e) => setUpDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddUpdateModalOpen(false)}
                    className="px-4 py-2 text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CREATE NEW ADMIN (STRICTLY FOR LOGGED-IN ADMINS) */}
        {isCreateAdminModalOpen && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900">
              <button
                onClick={() => setIsCreateAdminModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                Provision New Administrator
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Grant authorized administrative clearance to a verified corporate team member.
              </p>

              {adminSuccessMsg ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                  <p className="font-bold text-slate-900">New Administrator Created!</p>
                </div>
              ) : (
                <form onSubmit={handleCreateAdmin} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">New Admin Username</label>
                    <input
                      type="text"
                      required
                      value={newAdminUser}
                      onChange={(e) => setNewAdminUser(e.target.value)}
                      placeholder="e.g. director_rohit"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Email Address</label>
                    <input
                      type="email"
                      required
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      placeholder="e.g. admin@ziproo.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Full Legal Name</label>
                    <input
                      type="text"
                      value={newAdminName}
                      onChange={(e) => setNewAdminName(e.target.value)}
                      placeholder="e.g. Executive Director"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Role</label>
                    <select
                      value={newAdminRole}
                      onChange={(e) => setNewAdminRole(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    >
                      <option value="Executive Administrator">Executive Administrator</option>
                      <option value="Branch Operations Director">Branch Operations Director</option>
                      <option value="Super Administrator">Super Administrator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Password</label>
                    <input
                      type="password"
                      required
                      value={newAdminPass}
                      onChange={(e) => setNewAdminPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsCreateAdminModalOpen(false)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                    >
                      Enroll Admin
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* CONFIRM DELETE BRANCH MODAL (Admin Safe Guard) */}
        {deleteConfirmBranch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-900 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-rose-600" />
                Confirm Branch Deletion
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to permanently delete <strong>{deleteConfirmBranch.name}</strong>?
                Other branches, corporate projects, and shared media will remain safe and unaffected.
              </p>
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmBranch(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDeleteBranch(deleteConfirmBranch.id);
                    setDeleteConfirmBranch(null);
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  Yes, Delete Branch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
