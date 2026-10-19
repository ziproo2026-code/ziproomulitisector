import React, { useState } from 'react';
import { X, Star, MessageSquare, CheckCircle, Sparkles, Send, User, Mail, ShieldAlert } from 'lucide-react';
import { ViewerUser, ViewerFeedback } from '../data/ziprooStore';

interface ViewerFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: ViewerUser | null;
  onSubmitFeedback: (feedback: Omit<ViewerFeedback, 'id' | 'createdAt' | 'status' | 'adminNotes'>) => void;
  onOpenAuth?: () => void;
}

export const ViewerFeedbackModal: React.FC<ViewerFeedbackModalProps> = ({
  isOpen,
  onClose,
  user,
  onSubmitFeedback,
  onOpenAuth,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<ViewerFeedback['category']>('Suggestions');
  const [message, setMessage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const name = user ? user.name : (guestName.trim() || 'Visitor');
    const email = user ? user.email : (guestEmail.trim() || 'visitor@ziproo.com');
    const userId = user ? user.id : 'guest-viewer';

    onSubmitFeedback({
      userId,
      userName: name,
      userEmail: email,
      category,
      rating,
      message: message.trim(),
    });

    const generatedId = `FB-${Date.now().toString().slice(-6)}`;
    setSubmissionId(generatedId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setMessage('');
    setGuestName('');
    setGuestEmail('');
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-800">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Feedback Received!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you for contributing to ZIPROO's identity and evolution. Our executive leadership team reviews all viewer submissions.
              </p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-mono">
              Reference ID: <span className="font-bold">{submissionId}</span>
            </div>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Viewer Feedback Box</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                Share Your Thoughts With ZIPROO
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Help shape our multi-sector branches, projects, and future technology roadmaps.
              </p>
            </div>

            {/* Viewer Account State Box */}
            {user ? (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-emerald-950">{user.name}</p>
                    <p className="text-[11px] text-emerald-700 font-mono">{user.email}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                  {user.provider === 'google' ? 'Google Verified' : 'Email Verified'}
                </span>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Submitting as public viewer</span>
                  {onOpenAuth && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenAuth();
                      }}
                      className="text-emerald-700 hover:text-emerald-800 font-bold underline"
                    >
                      Sign In with Google / Email
                    </button>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {!user && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Your Name</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Your Email</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Category */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Topic Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Suggestions', 'Branches', 'Projects', 'Website', 'Other'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-2 px-2.5 rounded-xl text-center font-medium transition-all cursor-pointer ${
                        category === cat
                          ? 'bg-emerald-600 text-white font-bold shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Experience Rating: <span className="text-emerald-700 font-bold">{hoverRating || rating} / 5 Stars</span>
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Feedback or Idea</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you like, what we can improve, or new branch ideas for ZIPROO..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-md hover:shadow-emerald-600/25 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Feedback</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
