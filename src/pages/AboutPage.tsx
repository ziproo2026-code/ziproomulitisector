import React, { useState } from 'react';
import { 
  Instagram, 
  Youtube, 
  Mail, 
  Linkedin, 
  ExternalLink, 
  Edit3, 
  Save, 
  X, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  Share2
} from 'lucide-react';
import { SocialMediaLinks } from '../data/ziprooStore';
import { ZiprooLogo } from '../components/ZiprooLogo';

interface AboutPageProps {
  socialLinks: SocialMediaLinks;
  onUpdateSocialLinks: (links: Partial<SocialMediaLinks>) => void;
  isAdmin: boolean;
  onOpenAdminAuth: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  socialLinks,
  onUpdateSocialLinks,
  isAdmin,
  onOpenAdminAuth,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formLinks, setFormLinks] = useState<SocialMediaLinks>(socialLinks);
  const [successToast, setSuccessToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSocialLinks(formLinks);
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      setIsEditing(false);
    }, 700);
  };

  const mediaList = [
    {
      title: 'YouTube',
      handle: '@ziprooofficial',
      url: socialLinks.youtube,
      icon: Youtube,
      hoverClass: 'hover:border-red-500 hover:bg-red-50/50 group-hover:text-red-600',
      badge: 'Video & Keynotes',
    },
    {
      title: 'Official Mail Desk',
      handle: 'ziproo2026@gmail.com',
      url: `mailto:${socialLinks.email}`,
      icon: Mail,
      hoverClass: 'hover:border-emerald-500 hover:bg-emerald-50/50 group-hover:text-emerald-700',
      badge: 'Corporate Inquiries',
    },
    {
      title: 'Instagram',
      handle: '_ziproo',
      url: socialLinks.instagram,
      icon: Instagram,
      hoverClass: 'hover:border-pink-500 hover:bg-pink-50/50 group-hover:text-pink-600',
      badge: 'Fashion & Lookbooks',
    },
    {
      title: 'LinkedIn',
      handle: 'ZIPROO Global',
      url: socialLinks.linkedin,
      icon: Linkedin,
      hoverClass: 'hover:border-sky-500 hover:bg-sky-50/50 group-hover:text-sky-600',
      badge: 'Enterprise & Careers',
    },
    {
      title: 'Twitter / X',
      handle: '@ziproo_brand',
      url: socialLinks.twitter,
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      hoverClass: 'hover:border-slate-400 hover:bg-slate-100 group-hover:text-slate-900',
      badge: 'Real-Time Dispatches',
    },
  ];

  return (
    // CRISP WHITE & GREEN CORPORATE PALETTE
    <div className="min-h-screen bg-[#f8fafc] py-12 lg:py-20 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Top Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-emerald-700 font-mono font-semibold">
            Corporate Profile & Connect
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            ABOUT ZIPROO & MEDIA LINKS
          </h1>
          <p className="text-sm text-slate-600">
            Connecting our multi-sector operations with global partners, customers, and creators.
          </p>
        </div>

        {/* TWO-COLUMN LAYOUT: MEDIA LINKS ON LEFT, RIGHT SIDE DESCRIPTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT SIDE: MEDIA LINKS */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-lg flex-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                      Official Broadcast Channels
                    </span>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setFormLinks(socialLinks);
                        setIsEditing(true);
                      }}
                      className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:text-emerald-900 transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Links</span>
                    </button>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-2">
                  OFFICIAL MEDIA LINKS
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed mb-6 font-normal">
                  Click to connect directly via our verified media handles and corporate mail desk.
                </p>

                {/* Media Links Cards */}
                <div className="space-y-3">
                  {mediaList.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.title}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group p-4 rounded-2xl bg-slate-50 border border-slate-200 transition-all flex items-center justify-between gap-4 ${item.hoverClass}`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:scale-105 transition-all shadow-sm">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900 transition-colors">
                                {item.title}
                              </h4>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 font-mono border border-slate-200">
                                {item.badge}
                              </span>
                            </div>
                            <p className="text-xs text-emerald-700 font-mono mt-0.5 font-semibold">
                              {item.handle}
                            </p>
                          </div>
                        </div>

                        <div className="p-2 text-slate-400 group-hover:text-slate-800 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Direct Mail CTA Button */}
              <div className="pt-6 border-t border-slate-100">
                <a
                  href="mailto:ziproo2026@gmail.com?subject=Inquiry%20from%20ZIPROO%20Website"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-600/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email to ziproo2026@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: DESCRIPTION OF ABOUT ZIPROO */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-lg flex flex-col justify-between min-h-[600px] group">
            {/* Background architectural image */}
            <div className="absolute inset-0">
              <img
                src="/src/assets/images/white_green_corporate_atrium_1792338681741.jpg"
                alt="ZIPROO Corporate Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/90" />
            </div>

            {/* Content Container */}
            <div className="relative p-8 sm:p-12 z-10 space-y-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <ZiprooLogo variant="original" size="md" />
                  <span className="text-xs font-mono text-emerald-800 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 font-bold">
                    Est. 2026
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display mb-6">
                  ABOUT ZIPROO
                </h2>

                {/* EXACT REQUIRED TEXT */}
                <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  <p className="text-lg text-slate-900 font-medium">
                    ZIPROO is more than just a brand — it is a vision to create identity through fashion, technology, and innovation.
                  </p>

                  <p>
                    Our journey begins with a commitment to quality, creativity, and progress. Through our clothing collections and IT solutions, we aim to deliver products and services that connect with modern lifestyles.
                  </p>

                  <p>
                    We believe in thinking differently, creating meaningful solutions, and building a brand that grows with every generation.
                  </p>

                  <p className="text-slate-800 font-medium">
                    ZIPROO represents ambition, innovation, and the freedom to create your own identity.
                  </p>
                </div>
              </div>

              {/* Slogan Banner on the right */}
              <div className="pt-8 border-t border-slate-200">
                <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 backdrop-blur-sm">
                  <p className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold mb-1">
                    The Universal Creed
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-emerald-800 font-display tracking-tight">
                    CREATE YOUR IDENTITY — WITH ZIPROO.
                  </p>
                  <p className="mt-1 text-xs text-slate-500 font-medium">
                    Wear. Innovate. Belong.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL: EDIT MEDIA LINKS (Admin Only) */}
        {isEditing && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900">
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-600" />
                Configure Media Links
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Update destination URLs for the official ZIPROO social and email handles.
              </p>

              {successToast ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                  <p className="font-bold text-slate-900">Media Links Updated!</p>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">YouTube URL</label>
                    <input
                      type="url"
                      value={formLinks.youtube}
                      onChange={(e) => setFormLinks({ ...formLinks, youtube: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Email (ziproo2026@gmail.com)</label>
                    <input
                      type="email"
                      value={formLinks.email}
                      onChange={(e) => setFormLinks({ ...formLinks, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Instagram (_ziproo)</label>
                    <input
                      type="url"
                      value={formLinks.instagram}
                      onChange={(e) => setFormLinks({ ...formLinks, instagram: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">LinkedIn URL</label>
                    <input
                      type="url"
                      value={formLinks.linkedin}
                      onChange={(e) => setFormLinks({ ...formLinks, linkedin: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Twitter / X URL</label>
                    <input
                      type="url"
                      value={formLinks.twitter}
                      onChange={(e) => setFormLinks({ ...formLinks, twitter: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                    >
                      Save Links
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
