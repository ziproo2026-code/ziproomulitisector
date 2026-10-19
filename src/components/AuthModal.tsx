import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight,
  UserPlus,
  KeyRound
} from 'lucide-react';
import { ZiprooLogo } from './ZiprooLogo';
import { AdminAccount } from '../data/ziprooStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleLogin: (name: string, email: string) => void;
  onEmailLogin: (name: string, email: string) => void;
  onAdminLogin: (username: string, pass: string) => boolean;
  isAdmin: boolean;
  onCreateAdmin: (newAdmin: Omit<AdminAccount, 'createdAt'>) => boolean;
  defaultAdminTab?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onGoogleLogin,
  onEmailLogin,
  onAdminLogin,
  isAdmin,
  onCreateAdmin,
  defaultAdminTab = false,
}) => {
  // If user is already admin, allow 'new_admin' tab. Otherwise, viewers only see user or secure admin login.
  const [isAdminView, setIsAdminView] = useState(defaultAdminTab);
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'login' | 'create'>(
    isAdmin ? 'create' : 'login'
  );
  const [userMode, setUserMode] = useState<'signin' | 'signup'>('signin');

  // User form
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Admin Login form
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');

  // New Admin creation form (Admin only)
  const [newAdminUser, setNewAdminUser] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Executive Administrator');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [newAdminSuccess, setNewAdminSuccess] = useState(false);
  const [newAdminError, setNewAdminError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Google Sign-In Simulation
  const handleGoogleSignIn = () => {
    const mockEmail = 'user@gmail.com';
    const mockName = 'Google Member';
    setIsSuccess(true);
    setSuccessMessage('Signed in with Google account successfully');
    setTimeout(() => {
      onGoogleLogin(mockName, mockEmail);
      setIsSuccess(false);
      onClose();
    }, 700);
  };

  // Email User Form Submit
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (userMode === 'signup' && !userName.trim()) {
      errs.userName = 'Full name is required';
    }
    if (!userEmail.trim()) {
      errs.userEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      errs.userEmail = 'Please provide a valid email';
    }
    if (!userPassword) {
      errs.userPassword = 'Password is required';
    } else if (userPassword.length < 6) {
      errs.userPassword = 'Password must be at least 6 characters';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSuccess(true);
    setSuccessMessage(userMode === 'signup' ? 'Identity account created successfully' : 'Signed in successfully');
    setTimeout(() => {
      onEmailLogin(userName, userEmail);
      setIsSuccess(false);
      onClose();
    }, 700);
  };

  // Admin Login Submit
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    if (!adminUser.trim() || !adminPass.trim()) {
      setAdminError('Enter your username and password');
      return;
    }

    const verified = onAdminLogin(adminUser.trim(), adminPass.trim());
    if (verified) {
      setIsSuccess(true);
      setSuccessMessage('Administrator clearance confirmed');
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 700);
    } else {
      setAdminError('Invalid administrative credentials');
    }
  };

  // Create New Admin Submit (Restricted to logged-in Admin only)
  const handleCreateAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewAdminError('');
    if (!newAdminUser.trim() || !newAdminPass.trim() || !newAdminEmail.trim()) {
      setNewAdminError('Username, email, and password are required');
      return;
    }

    const ok = onCreateAdmin({
      username: newAdminUser.trim(),
      email: newAdminEmail.trim(),
      name: newAdminName.trim() || newAdminUser.trim(),
      role: newAdminRole,
      password: newAdminPass.trim(),
    });

    if (ok) {
      setNewAdminSuccess(true);
      setTimeout(() => {
        setNewAdminSuccess(false);
        setActiveAdminSubTab('login');
        setAdminUser(newAdminUser);
        setAdminPass(newAdminPass);
      }, 1200);
    } else {
      setNewAdminError('An administrator with this username already exists.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-800">
        {/* Subtle Green & White Ambient Accent */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-emerald-100/70 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo and Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <ZiprooLogo variant="original" size="sm" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950 font-display">
            {isAdminView
              ? 'ZIPROO Management Portal'
              : userMode === 'signin'
              ? 'Sign In to ZIPROO'
              : 'Create Your Identity'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isAdminView
              ? 'Secure console for authorized corporate administrators.'
              : 'Sign in with your Google account or email account.'}
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-base font-semibold text-slate-900">{successMessage}</h3>
            <p className="text-xs text-slate-500">Redirecting to your session...</p>
          </div>
        ) : !isAdminView ? (
          /* ========================================================
             REGULAR VIEWER SIGN IN (Clean, no admin leak)
             ======================================================== */
          <div className="space-y-4">
            {/* GOOGLE SIGN IN OPTION */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm border border-slate-300 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google Account</span>
            </button>

            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">
                or with mail account
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Email Mode Toggle */}
            <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setUserMode('signin');
                  setErrors({});
                }}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  userMode === 'signin'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserMode('signup');
                  setErrors({});
                }}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  userMode === 'signup'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleUserSubmit} className="space-y-3.5">
              {userMode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Rohith Sharma"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>
                  {errors.userName && <p className="text-[11px] text-rose-500 mt-0.5">{errors.userName}</p>}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
                {errors.userEmail && <p className="text-[11px] text-rose-500 mt-0.5">{errors.userEmail}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.userPassword && <p className="text-[11px] text-rose-500 mt-0.5">{errors.userPassword}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{userMode === 'signin' ? 'Sign In' : 'Create Identity Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Discrete admin portal link (no credentials displayed to viewer) */}
            <div className="pt-2 text-center border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAdminView(true)}
                className="text-[11px] text-slate-400 hover:text-emerald-700 transition-colors inline-flex items-center gap-1 font-mono"
              >
                <Lock className="w-3 h-3" />
                <span>Executive Management Portal</span>
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================
             ADMIN SECURE LOGIN (Or New Admin creation if authenticated)
             ======================================================== */
          <div className="space-y-4">
            {/* If logged-in admin, allow switching between Admin panel & create new admin */}
            {isAdmin && (
              <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold mb-2">
                <button
                  type="button"
                  onClick={() => setActiveAdminSubTab('login')}
                  className={`flex-1 py-1.5 rounded-lg ${
                    activeAdminSubTab === 'login' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Admin Status
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAdminSubTab('create')}
                  className={`flex-1 py-1.5 rounded-lg ${
                    activeAdminSubTab === 'create' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  + Enroll New Admin
                </button>
              </div>
            )}

            {!isAdmin || activeAdminSubTab === 'login' ? (
              /* Admin Login Form */
              <form onSubmit={handleAdminSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Administrator ID / Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={adminUser}
                      onChange={(e) => setAdminUser(e.target.value)}
                      placeholder="Username or admin email"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Security Passkey
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      placeholder="Passkey"
                      className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {adminError && <p className="text-xs text-rose-500 font-medium">{adminError}</p>}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Authenticate Administrator</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAdminView(false)}
                    className="text-xs text-slate-400 hover:text-slate-700"
                  >
                    ← Back to Viewer Sign In
                  </button>
                </div>
              </form>
            ) : (
              /* Create New Admin Form (ONLY VISIBLE WHEN LOGGED IN AS ADMIN) */
              <form onSubmit={handleCreateAdminSubmit} className="space-y-3 text-xs">
                {newAdminSuccess ? (
                  <div className="py-6 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                    <h4 className="font-bold text-slate-900">New Administrator Created</h4>
                    <p className="text-[11px] text-slate-500">The new administrator has been registered.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">New Admin Username</label>
                      <input
                        type="text"
                        required
                        value={newAdminUser}
                        onChange={(e) => setNewAdminUser(e.target.value)}
                        placeholder="e.g. director_rohit"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        placeholder="e.g. admin@ziproo.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        value={newAdminName}
                        onChange={(e) => setNewAdminName(e.target.value)}
                        placeholder="e.g. Executive Director"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Administrative Role</label>
                      <select
                        value={newAdminRole}
                        onChange={(e) => setNewAdminRole(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                      >
                        <option value="Executive Administrator">Executive Administrator</option>
                        <option value="Branch Operations Director">Branch Operations Director</option>
                        <option value="Super Administrator">Super Administrator</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Password</label>
                      <input
                        type="password"
                        required
                        value={newAdminPass}
                        onChange={(e) => setNewAdminPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    {newAdminError && <p className="text-[11px] text-rose-500">{newAdminError}</p>}

                    <button
                      type="submit"
                      className="w-full py-2.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Provision Administrator</span>
                    </button>
                  </>
                )}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
