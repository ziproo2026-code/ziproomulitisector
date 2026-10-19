import React, { useState } from 'react';
import { 
  Eye, 
  Target, 
  Bell, 
  Calendar, 
  ArrowRight, 
  Plus, 
  Trash2, 
  X, 
  Clock, 
  Sparkles, 
  CheckCircle,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { CompanyUpdate } from '../data/ziprooStore';
import { ZiprooLogo } from '../components/ZiprooLogo';

interface VisionMissionPageProps {
  updates: CompanyUpdate[];
  onAddUpdate: (update: Omit<CompanyUpdate, 'id'>) => void;
  onDeleteUpdate: (id: string) => void;
  isAdmin: boolean;
  onOpenAdminAuth: () => void;
}

export const VisionMissionPage: React.FC<VisionMissionPageProps> = ({
  updates,
  onAddUpdate,
  onDeleteUpdate,
  isAdmin,
  onOpenAdminAuth,
}) => {
  // Modal for reading full announcement
  const [selectedUpdate, setSelectedUpdate] = useState<CompanyUpdate | null>(null);

  // Form for administrator publishing new announcement
  const [isPublishingOpen, setIsPublishingOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CompanyUpdate['category']>('Fashion');
  const [newDate, setNewDate] = useState('October 18, 2026');
  const [newDesc, setNewDesc] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('/src/assets/images/luxury_fashion_flagship_1792336067401.jpg');
  const [newReadTime, setNewReadTime] = useState('3 min read');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    onAddUpdate({
      title: newTitle.trim(),
      category: newCategory,
      date: newDate,
      description: newDesc.trim(),
      content: newContent.trim() || newDesc.trim(),
      image: newImage,
      readTime: newReadTime,
      published: true,
    });

    setNewTitle('');
    setNewDesc('');
    setNewContent('');
    setIsPublishingOpen(false);
  };

  return (
    // CRISP WHITE & GREEN CORPORATE PALETTE
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 lg:py-20 px-4 sm:px-6 lg:px-8 selection:bg-emerald-600 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Guiding Principles & Corporate Press</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 font-display">
            VISION, MISSION & TODAY'S UPDATE
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Strategic alignment driving ethical innovation, individuality, and verified corporate announcements.
          </p>
        </div>

        {/* 3-Section Layout: Vision (Left) | Mission (Middle) | Update of ZIPROO (Aside) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SECTION: OUR VISION (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-lg shadow-emerald-950/5 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                    Forward Perspective
                  </span>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 font-display">
                    OUR VISION
                  </h2>
                </div>
              </div>

              {/* Exact Vision Text from user */}
              <blockquote className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed border-l-4 border-emerald-500 pl-4 py-1 italic bg-emerald-50/60 rounded-r-xl">
                "To build a globally recognized brand that inspires creativity, innovation, and individuality across fashion, technology, and future industries."
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                By synthesizing avant-garde garment aesthetics with enterprise technological agility, ZIPROO empowers creators, professionals, and forward-thinkers globally.
              </p>
            </div>

            <div className="pt-8 border-t border-slate-100 mt-8 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono">ZIPROO Global 2026</span>
              <ZiprooLogo variant="original" size="sm" />
            </div>
          </div>

          {/* MIDDLE SECTION: OUR MISSION (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-lg shadow-emerald-950/5 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                    Core Mandate
                  </span>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 font-display">
                    OUR MISSION
                  </h2>
                </div>
              </div>

              {/* Exact Mission Text from user */}
              <blockquote className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed border-l-4 border-emerald-600 pl-4 py-1 italic bg-emerald-50/60 rounded-r-xl">
                "To deliver high-quality products and innovative digital solutions while empowering people to express their identity and helping businesses grow through technology."
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We craft each garment with tactile distinction and architect software platforms that solve complex enterprise challenges with speed and security.
              </p>
            </div>

            <div className="pt-8 border-t border-slate-100 mt-8 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono">Create Your Identity</span>
              <span className="text-emerald-700 font-semibold font-mono">Wear · Innovate · Belong</span>
            </div>
          </div>

          {/* ASIDE: UPDATE OF ZIPROO (4 cols) */}
          <div id="updates" className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                    Corporate Dispatches
                  </span>
                  <h2 className="text-xl font-black tracking-tight text-slate-900 font-display">
                    UPDATE OF ZIPROO
                  </h2>
                </div>
              </div>

              {/* Publish announcement button (Admin only) */}
              {isAdmin && (
                <button
                  onClick={() => setIsPublishingOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                  title="Publish official company announcement"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish</span>
                </button>
              )}
            </div>

            {/* Updates List */}
            <div className="space-y-4">
              {updates.map((item) => (
                <div
                  key={item.id}
                  className="group p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 bg-slate-50/70 hover:bg-white transition-all shadow-sm space-y-3"
                >
                  {/* Thumbnail */}
                  <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-white/95 text-[10px] font-semibold text-emerald-800 shadow-sm">
                      {item.category}
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-600" />
                        {item.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setSelectedUpdate(item)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => onDeleteUpdate(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Delete announcement"
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

        {/* Read More Modal */}
        {selectedUpdate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900">
              <button
                onClick={() => setSelectedUpdate(null)}
                className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  {selectedUpdate.category}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedUpdate.date} · {selectedUpdate.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-4">
                {selectedUpdate.title}
              </h2>

              <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100">
                <img
                  src={selectedUpdate.image}
                  alt={selectedUpdate.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 text-sm text-slate-700 leading-relaxed pr-2">
                <p className="font-medium text-slate-900">
                  {selectedUpdate.description}
                </p>
                <p>
                  {selectedUpdate.content}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <ZiprooLogo variant="original" size="sm" />
                <button
                  onClick={() => setSelectedUpdate(null)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold"
                >
                  Close Dispatch
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Publish Announcement Modal (Admin Only) */}
        {isPublishingOpen && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900">
              <button
                onClick={() => setIsPublishingOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Publish Company Announcement
                </h3>
              </div>

              <form onSubmit={handlePublish} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Announcement Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. ZIPROO Announces Expansion of Tokyo Atelier"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                    >
                      <option value="Fashion">Fashion & Streetwear</option>
                      <option value="IT Solutions">IT Solutions & AI</option>
                      <option value="Corporate">Corporate Governance</option>
                      <option value="Innovation">Innovation R&D</option>
                      <option value="Global">Global Operations</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Date
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Short Summary
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Key takeaway of the announcement..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Full Content
                  </label>
                  <textarea
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Comprehensive press release text..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsPublishingOpen(false)}
                    className="px-4 py-2 text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
                  >
                    Publish Dispatch
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
