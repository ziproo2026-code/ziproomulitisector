import React, { useState } from 'react';
import { 
  Users, 
  Edit3, 
  Mail, 
  ShieldCheck, 
  Camera, 
  Save, 
  X, 
  Eye, 
  Target, 
  Bell, 
  Calendar, 
  ArrowRight, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles,
  Lock,
  Clock
} from 'lucide-react';
import { TeamMember, CompanyUpdate } from '../data/ziprooStore';
import { ZiprooLogo } from '../components/ZiprooLogo';

interface LeadershipVisionPageProps {
  team: TeamMember[];
  onUpdateTeamMember: (id: string, updated: Partial<TeamMember>) => void;
  updates: CompanyUpdate[];
  onAddUpdate: (u: Omit<CompanyUpdate, 'id'>) => void;
  onDeleteUpdate: (id: string) => void;
  isAdmin: boolean;
  onOpenAdminAuth: () => void;
}

export const LeadershipVisionPage: React.FC<LeadershipVisionPageProps> = ({
  team,
  onUpdateTeamMember,
  updates,
  onAddUpdate,
  onDeleteUpdate,
  isAdmin,
  onOpenAdminAuth,
}) => {
  // Editing state for Team Member
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formName, setFormName] = useState('');
  const [formPosition, setFormPosition] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Read More Modal for Update
  const [selectedUpdate, setSelectedUpdate] = useState<CompanyUpdate | null>(null);

  // Publish Announcement Modal
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CompanyUpdate['category']>('Fashion');
  const [newDesc, setNewDesc] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleStartEdit = (member: TeamMember) => {
    if (!isAdmin) {
      onOpenAdminAuth();
      return;
    }
    setEditingMember(member);
    setFormName(member.name);
    setFormPosition(member.position);
    setFormRole(member.role);
    setFormBio(member.bio);
    setFormImage(member.image);
    setFormEmail(member.email || '');
    setSaveSuccess(false);
  };

  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    onUpdateTeamMember(editingMember.id, {
      name: formName.trim() || editingMember.name,
      position: formPosition.trim() || editingMember.position,
      role: formRole.trim() || editingMember.role,
      bio: formBio.trim() || editingMember.bio,
      image: formImage.trim() || editingMember.image,
      email: formEmail.trim() || editingMember.email,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setEditingMember(null);
      setSaveSuccess(false);
    }, 700);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    onAddUpdate({
      title: newTitle.trim(),
      category: newCategory,
      date: 'October 18, 2026',
      description: newDesc.trim(),
      content: newContent.trim() || newDesc.trim(),
      image: '/src/assets/images/ziproo_tech_innovation_1792336085977.jpg',
      readTime: '3 min read',
      published: true,
    });

    setNewTitle('');
    setNewDesc('');
    setNewContent('');
    setIsPublishModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070a08] py-12 lg:py-20 px-4 sm:px-6 lg:px-8 text-neutral-200">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* SECTION 1: LEADERSHIP TEAM (Founder, Co-Founder, Co-Founder) */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
              <Users className="w-3.5 h-3.5" />
              <span>Executive Leadership</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-display">
              THE VISIONARIES BEHIND ZIPROO
            </h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-light">
              "Building the Future Together."
            </p>

            <div className="p-3.5 rounded-2xl bg-[#0c1410] border border-emerald-950/80 text-xs text-slate-300 max-w-xl mx-auto flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Founder & Co-Founders are <strong>edited by admin only</strong> with name, position, role, and photos.
                </span>
              </div>
              {!isAdmin && (
                <button
                  onClick={onOpenAdminAuth}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold shrink-0 transition-colors"
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>

          {/* THREE LEADERSHIP CARDS (Founder, Co-Founder, Co-Founder) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => {
              const label = index === 0 ? 'Founder' : index === 1 ? 'Co-Founder' : 'Co-Founder';
              return (
                <div
                  key={member.id}
                  className="group relative rounded-3xl overflow-hidden border border-emerald-950/80 bg-[#0c130f]/80 hover:border-emerald-700/60 transition-all flex flex-col justify-between shadow-2xl"
                >
                  {/* Photo with formal suit */}
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.position}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c130f] via-transparent to-transparent opacity-80" />

                    {/* Corner Position Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold uppercase text-emerald-300">
                      {label}
                    </div>

                    {/* Edit button (Admin only) */}
                    <button
                      onClick={() => handleStartEdit(member)}
                      className={`absolute top-4 right-4 p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                        isAdmin
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                          : 'bg-black/60 hover:bg-slate-800 text-slate-300 border-white/10'
                      }`}
                      title={isAdmin ? 'Edit Member Details' : 'Requires Admin Authorization'}
                    >
                      {isAdmin ? <Edit3 className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      <span>{isAdmin ? 'Edit Profile' : 'Admin Edit'}</span>
                    </button>
                  </div>

                  {/* Profile Info */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-semibold">
                          {member.position}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">ZIPROO 2026</span>
                      </div>

                      <h2 className="text-2xl font-bold text-white tracking-tight font-display">
                        {member.name}
                      </h2>

                      <p className="text-xs font-semibold text-slate-300">
                        {member.role}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                        "{member.bio}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                      <a
                        href={`mailto:${member.email || 'ziproo2026@gmail.com'}`}
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="truncate max-w-[170px]">{member.email || 'ziproo2026@gmail.com'}</span>
                      </a>

                      {isAdmin ? (
                        <button
                          onClick={() => handleStartEdit(member)}
                          className="text-xs text-emerald-400 hover:text-emerald-300 font-bold"
                        >
                          Modify
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">Verified Lead</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: VISION, MISSION AND ASIDE UPDATE OF ZIPROO */}
        <section className="pt-16 border-t border-neutral-800 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
              Corporate Direction & Living Dispatches
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              VISION, MISSION & TODAY'S UPDATE
            </h2>
            <p className="text-sm text-slate-400">
              Where strategic purpose directly translates into our daily innovation dispatches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT / MIDDLE: VISION & MISSION (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* OUR VISION */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0c1410] border border-emerald-950/80 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                      Future Horizon
                    </span>
                    <h3 className="text-2xl font-black text-white font-display">OUR VISION</h3>
                  </div>
                </div>

                <blockquote className="text-base sm:text-lg text-emerald-100 font-medium leading-relaxed border-l-2 border-emerald-500 pl-4 py-1 italic bg-emerald-950/20 rounded-r-xl">
                  "To build a globally recognized brand that inspires creativity, innovation, and individuality across fashion, technology, and future industries."
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed">
                  ZIPROO empowers generations of thinkers and creators through the transformative convergence of bespoke design and intelligent computational infrastructure.
                </p>
              </div>

              {/* OUR MISSION */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0e1612] border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-200">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                      Guiding Purpose
                    </span>
                    <h3 className="text-2xl font-black text-white font-display">OUR MISSION</h3>
                  </div>
                </div>

                <blockquote className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed border-l-2 border-slate-400 pl-4 py-1 italic bg-slate-900/40 rounded-r-xl">
                  "To deliver high-quality products and innovative digital solutions while empowering people to express their identity and helping businesses grow through technology."
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed">
                  We maintain rigorous craftsmanship across all textile garments while engineering bulletproof web, mobile, and artificial intelligence solutions.
                </p>
              </div>
            </div>

            {/* ASIDE: UPDATE OF ZIPROO (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#0c130f] border border-emerald-950/80 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                      Company Dispatch
                    </span>
                    <h3 className="text-xl font-black text-white font-display">UPDATE OF ZIPROO</h3>
                  </div>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => setIsPublishModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Publish</span>
                  </button>
                )}
              </div>

              {/* Updates List */}
              <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
                {updates.map((item) => (
                  <div
                    key={item.id}
                    className="group p-4 rounded-2xl bg-[#080d0a] border border-neutral-800 hover:border-emerald-600/40 transition-all space-y-3"
                  >
                    <div className="relative h-32 w-full rounded-xl overflow-hidden bg-neutral-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 text-[10px] font-semibold text-emerald-300">
                        {item.category}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-emerald-400" />
                          {item.date}
                        </span>
                        <span>·</span>
                        <span>{item.readTime}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setSelectedUpdate(item)}
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => onDeleteUpdate(item.id)}
                          className="text-slate-500 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MODAL: EDIT LEADERSHIP PROFILE (Admin Only) */}
        {editingMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-[#0b130f] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
              <button
                onClick={() => setEditingMember(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-400" />
                Edit Leadership Profile
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Authorized administrator changes to name, position, role, and portrait.
              </p>

              {saveSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                  <p className="font-bold text-white">Executive Profile Updated</p>
                </div>
              ) : (
                <form onSubmit={handleSaveTeam} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Position</label>
                    <input
                      type="text"
                      required
                      value={formPosition}
                      onChange={(e) => setFormPosition(e.target.value)}
                      placeholder="e.g. Founder & CEO or Co-Founder & CTO"
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Role</label>
                    <input
                      type="text"
                      required
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      placeholder="e.g. Founder & Strategic Leadership"
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Bio / Description</label>
                    <textarea
                      rows={3}
                      value={formBio}
                      onChange={(e) => setFormBio(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Direct Email</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="name@ziproo.com"
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      Photograph (File Upload or Image URL)
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs"
                      />
                      <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end gap-3 border-t border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setEditingMember(null)}
                      className="px-4 py-2 text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* MODAL: READ MORE UPDATE */}
        {selectedUpdate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#0c1410] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white flex flex-col overflow-hidden">
              <button
                onClick={() => setSelectedUpdate(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  {selectedUpdate.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedUpdate.date} · {selectedUpdate.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-display mb-4">
                {selectedUpdate.title}
              </h2>

              <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-5 bg-neutral-900 border border-neutral-800">
                <img
                  src={selectedUpdate.image}
                  alt={selectedUpdate.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 text-sm text-slate-300 leading-relaxed pr-2">
                <p className="font-medium text-white">{selectedUpdate.description}</p>
                <p>{selectedUpdate.content}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-between">
                <ZiprooLogo variant="white" size="sm" />
                <button
                  onClick={() => setSelectedUpdate(null)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
                >
                  Close Dispatch
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: PUBLISH ANNOUNCEMENT */}
        {isPublishModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-[#0b130f] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                Publish Update of ZIPROO
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Post an official announcement to the ZIPROO corporate dispatches.
              </p>

              <form onSubmit={handlePublishSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. ZIPROO Unveils Next-Gen AI Micro-Framework"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
                  >
                    <option value="Fashion">Fashion</option>
                    <option value="IT Solutions">IT Solutions</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Innovation">Innovation</option>
                    <option value="Global">Global</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Short Summary</label>
                  <textarea
                    rows={2}
                    required
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Full Story Content</label>
                  <textarea
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsPublishModalOpen(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
                  >
                    Broadcast Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
