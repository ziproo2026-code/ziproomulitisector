import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Mail, Menu, X, LogIn, UserCheck, Shield, ChevronRight, MessageSquare } from 'lucide-react';
import { ZiprooLogo } from './ZiprooLogo';

interface NavbarProps {
  onOpenAuth: () => void;
  isAdmin: boolean;
  user: { name: string; email: string; provider: 'google' | 'email' } | null;
  onLogoutUser: () => void;
  onLogoutAdmin: () => void;
  customLogoUrl?: string;
  onOpenFeedback?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  isAdmin,
  user,
  onLogoutUser,
  onLogoutAdmin,
  customLogoUrl,
  onOpenFeedback,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Branches', path: '/branches' },
    { name: 'Leadership', path: '/leadership' },
    { name: 'Vision & Mission', path: '/vision-mission' },
    { name: 'About & Media', path: '/about' },
  ];

  return (
    <>
      {/* WHITE & GREEN STICKY TOP NAVBAR */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Zone 1: Exact ZIPROO Logo (Original black on white/clean, supports admin upload) */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
              aria-label="ZIPROO Homepage"
            >
              <ZiprooLogo
                variant="original"
                size="md"
                customLogoUrl={customLogoUrl}
                className="transition-transform group-hover:scale-102"
              />
            </Link>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-sm font-medium">
              {navLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `transition-colors relative py-1 whitespace-nowrap font-semibold ${
                      isActive
                        ? 'text-emerald-700 after:w-full after:h-0.5 after:bg-emerald-600 after:absolute after:bottom-0 after:left-0'
                        : 'text-slate-600 hover:text-emerald-700 hover:after:w-full after:w-0 after:h-0.5 after:bg-emerald-600 after:absolute after:bottom-0 after:left-0 after:transition-all'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Zone 3: Direct Actions for Viewer & Staff */}
            <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 shrink-0">
              {/* Send Email Action */}
              <a
                href="mailto:ziproo2026@gmail.com?subject=Inquiry%20from%20ZIPROO%20Website"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl transition-all"
                title="Send email to ziproo2026@gmail.com"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span className="whitespace-nowrap font-mono text-xs">ziproo2026@gmail.com</span>
              </a>

              {/* Viewer Feedback Box Trigger */}
              {onOpenFeedback && (
                <button
                  onClick={onOpenFeedback}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-xs"
                  title="Open Viewer Feedback Box"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="whitespace-nowrap">Feedback</span>
                </button>
              )}

              {/* Admin Badge & Direct Link ONLY IF ADMIN IS LOGGED IN */}
              {isAdmin && (
                <div className="flex items-center gap-1.5">
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold font-mono transition-all shadow-xs"
                    title="Open Admin Management Console"
                  >
                    <Shield className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Admin Console</span>
                  </Link>
                  <button
                    onClick={onLogoutAdmin}
                    className="text-[11px] text-slate-500 hover:text-rose-600 px-1 py-0.5 cursor-pointer font-medium"
                    title="Exit Admin Session"
                  >
                    Logout
                  </button>
                </div>
              )}

              {/* User Sign In / Status */}
              {user ? (
                <div className="flex items-center gap-2 pl-1">
                  <button
                    onClick={onOpenFeedback || onOpenAuth}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs text-emerald-900 cursor-pointer transition-colors"
                    title="Click to view account and submit feedback"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="max-w-[100px] truncate font-semibold">{user.name}</span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1 rounded font-mono">
                      {user.provider === 'google' ? 'G' : 'Mail'}
                    </span>
                  </button>
                  <button
                    onClick={onLogoutUser}
                    className="text-xs text-slate-500 hover:text-rose-600 cursor-pointer"
                    title="Log out from user account"
                  >
                    Exit
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all hover:scale-102 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">SIGN IN</span>
                </button>
              )}
            </div>

            {/* Mobile menu hamburger toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              {onOpenFeedback && (
                <button
                  onClick={onOpenFeedback}
                  className="p-2 text-slate-600 hover:text-emerald-700 rounded-lg"
                  title="Feedback"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                </button>
              )}
              <button
                onClick={onOpenAuth}
                className="p-2 text-xs font-bold text-white bg-emerald-600 rounded-lg shadow-sm"
              >
                {user ? user.name.slice(0, 5) : 'SIGN IN'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-fade-in shadow-xl">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </NavLink>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              {/* Feedback Option in Mobile */}
              {onOpenFeedback && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenFeedback();
                  }}
                  className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Viewer Feedback Box</span>
                </button>
              )}

              <a
                href="mailto:ziproo2026@gmail.com?subject=Inquiry"
                className="w-full py-2.5 px-3 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>ziproo2026@gmail.com</span>
              </a>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <Shield className="w-4 h-4 text-emerald-300" />
                  <span>Executive Admin Console</span>
                </Link>
              )}

              {user ? (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onLogoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="text-rose-600 font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In (Google / Email)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
