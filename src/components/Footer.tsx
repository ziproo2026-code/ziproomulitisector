import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Lock } from 'lucide-react';
import { ZiprooLogo } from './ZiprooLogo';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAdminAuth: () => void;
  customLogoUrl?: string;
  onOpenFeedback?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenAdminAuth,
  customLogoUrl,
  onOpenFeedback,
}) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 text-slate-600">
      {/* Top Banner with Brand Slogan */}
      <div className="border-b border-slate-200 bg-emerald-50/70 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs uppercase tracking-widest text-emerald-800 font-mono font-semibold">
              Corporate Motto
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              CREATE YOUR IDENTITY
            </h3>
            <p className="text-xs text-slate-600">Wear. Innovate. Belong. — Established 2026</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:ziproo2026@gmail.com?subject=Strategic%20Partnership"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Initiate Partnership</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/branches"
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold text-xs hover:bg-slate-50 transition-all shadow-xs"
            >
              Explore Sectors
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <ZiprooLogo variant="original" size="md" customLogoUrl={customLogoUrl} />
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              A next-generation brand built on innovation, creativity, and endless possibilities across fashion and IT solutions. Established 2026.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-900">ZIPROO — SINCE 2026</p>
              <p>Official Mail: <a href="mailto:ziproo2026@gmail.com" className="text-emerald-700 font-mono font-semibold">ziproo2026@gmail.com</a></p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/branches" className="hover:text-emerald-700 transition-colors">Our Branches</Link>
              </li>
              <li>
                <Link to="/leadership" className="hover:text-emerald-700 transition-colors">Leadership Team</Link>
              </li>
              <li>
                <Link to="/vision-mission" className="hover:text-emerald-700 transition-colors">Vision & Mission</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-700 transition-colors">About & Media Links</Link>
              </li>
              {onOpenFeedback && (
                <li>
                  <button
                    onClick={onOpenFeedback}
                    className="text-emerald-700 hover:text-emerald-800 font-bold transition-colors cursor-pointer"
                  >
                    Viewer Feedback Box
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Corporate Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Divisions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/branches" className="hover:text-emerald-700 transition-colors">ZIPROO Clothing</Link>
              </li>
              <li>
                <Link to="/branches" className="hover:text-emerald-700 transition-colors">ZIPROO IT Solutions</Link>
              </li>
              <li>
                <Link to="/branches#projects" className="hover:text-emerald-700 transition-colors">Enterprise Projects</Link>
              </li>
              <li>
                <Link to="/vision-mission#updates" className="hover:text-emerald-700 transition-colors">Company Dispatches</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Headquarters
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>ZIPROO Tower, Horizon Boulevard, Innovation District</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <a href="mailto:ziproo2026@gmail.com" className="hover:text-emerald-800 transition-colors font-mono">
                  ziproo2026@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href="tel:+18009477660" className="hover:text-emerald-800 transition-colors font-mono">
                  +1 (800) 947-7660
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 ZIPROO. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Terms and Conditions
            </button>
            <span>·</span>
            {/* Subtle administrative access for staff without exposing credentials */}
            <Link
              to="/admin"
              className="text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
              title="Staff Authorization"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
