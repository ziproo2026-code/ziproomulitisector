import React, { useState } from 'react';
import { 
  Users, 
  Edit3, 
  Mail, 
  ShieldCheck, 
  Camera, 
  Save, 
  X, 
  CheckCircle2, 
  Sparkles,
  Lock
} from 'lucide-react';
import { TeamMember } from '../data/ziprooStore';
import { ZiprooLogo } from '../components/ZiprooLogo';

interface LeadershipPageProps {
  team: TeamMember[];
  onUpdateTeamMember: (id: string, updated: Partial<TeamMember>) => void;
  isAdmin: boolean;
  onOpenAdminAuth: () => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({
  team,
  onUpdateTeamMember,
  isAdmin,
  onOpenAdminAuth,
}) => {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formName, setFormName] = useState('');
  const [formPosition, setFormPosition] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

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

  return (
    // WHITE & GREEN CORPORATE PALETTE
    <div className="min-h-screen bg-[#f8fafc] py-12 lg:py-20 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-mono font-medium">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Executive Governance</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-display">
            THE VISIONARIES BEHIND ZIPROO
          </h1>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-light">
            "Building the Future Together."
          </p>

          {/* Admin editing status notice (only displayed if admin is active) */}
          {isAdmin && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Admin Mode Active: You can edit Founder and Co-Founders details and portraits.</span>
            </div>
          )}
        </div>

        {/* THREE LEADERSHIP CARDS (Founder, Co-Founder, Co-Founder) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => {
            const label = index === 0 ? 'Founder' : 'Co-Founder';
            return (
              <div
                key={member.id}
                className="group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white hover:border-emerald-500/80 transition-all flex flex-col justify-between shadow-lg hover:shadow-xl"
              >
                {/* Photo with formal suit */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.position}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Corner Position Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-mono font-bold uppercase text-emerald-800 shadow-sm">
                    {label}
                  </div>

                  {/* Edit button (Admin only) */}
                  {isAdmin && (
                    <button
                      onClick={() => handleStartEdit(member)}
                      className="absolute top-4 right-4 p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                      title="Edit Member Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>

                {/* Profile Information */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-emerald-700 font-mono font-semibold">
                        {member.position}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">ZIPROO 2026</span>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
                      {member.name}
                    </h2>

                    <p className="text-xs font-semibold text-slate-700">
                      {member.role}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-normal">
                      "{member.bio}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={`mailto:${member.email || 'ziproo2026@gmail.com'}`}
                      className="inline-flex items-center gap-1.5 text-slate-600 hover:text-emerald-700 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="truncate max-w-[170px]">{member.email || 'ziproo2026@gmail.com'}</span>
                    </a>

                    {isAdmin ? (
                      <button
                        onClick={() => handleStartEdit(member)}
                        className="text-xs text-emerald-700 hover:text-emerald-800 font-bold"
                      >
                        Modify Details
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">Verified Profile</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Commitment Statement */}
        <div className="p-8 sm:p-12 rounded-3xl bg-emerald-50/60 border border-emerald-100 text-center max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center">
            <ZiprooLogo variant="original" size="sm" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            A Collective Mission of Innovation and Individuality
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our leadership team unifies visionary fashion designers, enterprise cloud architects, and strategic operators committed to upholding the promise: <strong className="text-slate-900">Create Your Identity</strong>.
          </p>
        </div>

        {/* MODAL: EDIT LEADERSHIP PROFILE (Admin Only) */}
        {editingMember && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900">
              <button
                onClick={() => setEditingMember(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-600" />
                Edit Leadership Profile
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Authorized administrator changes to name, position, role, and portrait.
              </p>

              {saveSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                  <p className="font-bold text-slate-900">Profile Updated</p>
                </div>
              ) : (
                <form onSubmit={handleSaveTeam} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Position</label>
                    <input
                      type="text"
                      required
                      value={formPosition}
                      onChange={(e) => setFormPosition(e.target.value)}
                      placeholder="e.g. Founder & CEO or Co-Founder & CTO"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Role</label>
                    <input
                      type="text"
                      required
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      placeholder="e.g. Founder & Strategic Leadership"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Bio / Description</label>
                    <textarea
                      rows={3}
                      value={formBio}
                      onChange={(e) => setFormBio(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Direct Email</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="name@ziproo.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">
                      Photograph (File Upload or Image URL)
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs"
                      />
                      <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl cursor-pointer inline-flex items-center gap-1.5 shrink-0">
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

                  <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingMember(null)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
