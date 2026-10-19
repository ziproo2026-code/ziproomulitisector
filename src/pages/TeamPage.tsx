import React, { useState } from 'react';
import { 
  Users, 
  Edit3, 
  Mail, 
  Linkedin, 
  ShieldCheck, 
  Camera, 
  Save, 
  X, 
  Briefcase, 
  CheckCircle2,
  Info
} from 'lucide-react';
import { TeamMember } from '../data/ziprooStore';
import { ZiprooLogo } from '../components/ZiprooLogo';

interface TeamPageProps {
  team: TeamMember[];
  onUpdateTeamMember: (id: string, updated: Partial<TeamMember>) => void;
  isAdmin: boolean;
}

export const TeamPage: React.FC<TeamPageProps> = ({ team, onUpdateTeamMember, isAdmin }) => {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const startEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormName(member.name);
    setFormRole(member.role);
    setFormBio(member.bio);
    setFormImage(member.image);
    setFormEmail(member.email || '');
    setSavedNotice(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    onUpdateTeamMember(editingMember.id, {
      name: formName.trim() || editingMember.name,
      role: formRole.trim() || editingMember.role,
      bio: formBio.trim() || editingMember.bio,
      image: formImage.trim() || editingMember.image,
      email: formEmail.trim() || editingMember.email,
    });

    setSavedNotice(true);
    setTimeout(() => {
      setEditingMember(null);
      setSavedNotice(false);
    }, 600);
  };

  // Handle local file photo upload for editing
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
    <div className="min-h-screen bg-[#060608] py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-400 text-xs font-mono font-medium">
            <Users className="w-3.5 h-3.5" />
            <span>Executive Governance</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-display">
            THE VISIONARIES BEHIND ZIPROO
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed font-light">
            "Building the Future Together."
          </p>

          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-xs text-neutral-400 max-w-xl mx-auto flex items-center gap-3 text-left">
            <Info className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              Executive profiles and photographs are fully customizable. Click "Edit Profile" to tailor names, titles, and portraits.
            </span>
          </div>
        </div>

        {/* Three Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => {
            const isFounder = member.id === 'founder';
            const isCoFounder = member.id === 'cofounder';

            return (
              <div
                key={member.id}
                className="group relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/70 hover:border-neutral-700 transition-all flex flex-col justify-between shadow-2xl"
              >
                {/* Executive Headshot in Suit */}
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono font-semibold uppercase text-purple-300">
                    {member.department}
                  </div>

                  {/* Edit button */}
                  <button
                    onClick={() => startEdit(member)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-neutral-900/80 hover:bg-purple-600 text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                    title="Customize Name, Role, or Portrait"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>

                {/* Profile Information */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-purple-400 font-mono font-semibold">
                        {isFounder ? 'Founder' : isCoFounder ? 'Co-Founder' : 'Operations Leader'}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">Since 2026</span>
                    </div>

                    <h2 className="text-2xl font-bold text-white tracking-tight font-display">
                      {member.name}
                    </h2>

                    <p className="text-xs font-semibold text-neutral-300">
                      {member.role}
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pt-1">
                      "{member.bio}"
                    </p>
                  </div>

                  {/* Contact / Action footer */}
                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <a
                      href={`mailto:${member.email || 'contact@ziproo.com'}`}
                      className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      <span className="truncate max-w-[160px]">{member.email || 'contact@ziproo.com'}</span>
                    </a>

                    <button
                      onClick={() => startEdit(member)}
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      Modify Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Commitment Statement */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 text-center max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center">
            <ZiprooLogo variant="white" size="sm" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            A Collective Mission of Innovation and Creativity
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Our leadership team unifies seasoned textile innovators, enterprise cloud architects, and operations specialists committed to upholding the promise: <strong className="text-white">Create Your Identity</strong>.
          </p>
        </div>

        {/* Edit Profile Modal */}
        {editingMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-[#0f0f14] border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
              <button
                onClick={() => setEditingMember(null)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-purple-400" />
                <h3 className="text-lg font-bold text-white">
                  Edit Executive Profile
                </h3>
              </div>

              {savedNotice ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                  <p className="text-sm font-semibold text-white">Profile Updated Successfully</p>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Rohith Sharma"
                      className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      placeholder="e.g. Founder & Strategic Leadership"
                      className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Official Description / Bio
                    </label>
                    <textarea
                      rows={3}
                      value={formBio}
                      onChange={(e) => setFormBio(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Direct Email
                    </label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="name@ziproo.com"
                      className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Photograph (File Upload or Image URL)
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="/src/assets/images/... or https://"
                        className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs"
                      />
                      <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Browse</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setEditingMember(null)}
                      className="px-4 py-2 text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-white text-neutral-950 font-bold rounded-xl hover:bg-neutral-200 inline-flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Profile</span>
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
