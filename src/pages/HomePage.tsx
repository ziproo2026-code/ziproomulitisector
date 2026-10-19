import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, ArrowUpRight, Sparkles, Shirt, Cpu, ExternalLink, MessageSquare, CheckCircle } from 'lucide-react';
import { ZiprooLogo } from '../components/ZiprooLogo';
import { BranchData, CompanySettings } from '../data/ziprooStore';

interface HomePageProps {
  onOpenAuth: () => void;
  user: { name: string; email: string; provider: 'google' | 'email' } | null;
  branches: BranchData[];
  settings?: CompanySettings;
  onOpenFeedback?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenAuth,
  user,
  branches,
  settings,
  onOpenFeedback,
}) => {
  const currentSlogan = settings?.slogan || 'CREATE YOUR IDENTITY';
  const currentTagline = settings?.tagline || 'Wear. Innovate. Belong.';
  const currentQuote =
    settings?.introQuote ||
    'A next-generation brand built on innovation, creativity, and endless possibilities across fashion, technology, and future industries.';
  const backgroundWallpaper =
    settings?.heroBackgroundUrl ||
    '/src/assets/images/white_green_corporate_atrium_1792338681741.jpg';

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between bg-white overflow-hidden text-slate-800">
      {/* 1. Abstract Corporate Wallpaper Background without people */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundWallpaper}
          alt="Modern corporate white and green architectural headquarters wallpaper without person"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft Crisp White Glass Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/80 to-white/95 backdrop-blur-[2px]" />
      </div>

      {/* Main Centerpiece Content: Exact Logo -> Slogan -> Buttons */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl mx-auto">
        {/* Established Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold tracking-wider mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>ZIPROO · MULTI-SECTOR ENTERPRISE · SINCE 2026</span>
        </div>

        {/* 1. EXACT ZIPROO LOGO, CENTERED AND PROMINENT */}
        <div className="mb-6 p-4 sm:p-6 rounded-3xl bg-white/90 border border-slate-200/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all">
          <ZiprooLogo
            variant="original"
            size="xl"
            customLogoUrl={settings?.logoUrl}
          />
        </div>

        {/* 2. SLOGAN BELOW THE LOGO: "CREATE YOUR IDENTITY" */}
        <div className="space-y-3 mb-10 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 font-display drop-shadow-sm">
            {currentSlogan}
          </h1>
          <p className="text-lg sm:text-2xl font-light text-emerald-700 font-display tracking-wide">
            {currentTagline}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-1">
            "{currentQuote}"
          </p>
        </div>

        {/* 3. BUTTONS: SIGN IN, OUR BRANCHES, AND OUR PROJECTS */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-2xl">
          {/* SIGN IN BUTTON */}
          <button
            onClick={onOpenAuth}
            className="flex-1 min-w-[170px] py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-emerald-600/25 hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{user ? 'MY ACCOUNT' : 'SIGN IN'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* OUR BRANCHES BUTTON (Requirement: "give our branches option also in first page") */}
          <Link
            to="/branches"
            className="flex-1 min-w-[170px] py-3.5 px-6 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-600 text-emerald-700 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-sm hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>OUR BRANCHES</span>
          </Link>

          {/* OUR PROJECTS BUTTON */}
          <Link
            to="/branches#projects"
            className="flex-1 min-w-[170px] py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
          >
            <span>OUR PROJECTS</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>

        {/* Viewer Account State & Feedback Box Trigger */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
          {user ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 font-medium shadow-xs">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Signed in as <strong>{user.name}</strong> ({user.provider === 'google' ? 'Google Account' : 'Email Account'})</span>
            </div>
          ) : (
            <span className="text-slate-500 font-mono">
              Sign in with your Google or Mail account to join the ZIPROO community
            </span>
          )}

          {onOpenFeedback && (
            <button
              onClick={onOpenFeedback}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Feedback Box</span>
            </button>
          )}
        </div>
      </div>

      {/* FEATURED BRANCHES PREVIEW ON FIRST PAGE */}
      <div className="relative z-10 border-t border-slate-200 bg-white/95 backdrop-blur-md py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-mono font-semibold">
                Core Divisions Overview
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                ZIPROO Flagship Branches
              </h2>
            </div>
            <Link
              to="/branches"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
            >
              <span>Explore All Branches & Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.slice(0, 2).map((branch) => {
              const isClothing = branch.id === 'clothing';
              const targetUrl = branch.websiteUrl || 'https://ziproo.com';
              return (
                <div
                  key={branch.id}
                  className="group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isClothing ? (
                          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <Shirt className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
                            <Cpu className="w-5 h-5" />
                          </div>
                        )}
                        <h3 className="text-base font-bold text-slate-900 font-display">
                          {branch.name}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {branch.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {branch.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {branch.offerings.slice(0, 4).map((offering, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium"
                        >
                          {offering}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                    <Link
                      to="/branches"
                      className="text-xs font-bold text-slate-700 hover:text-emerald-800 inline-flex items-center gap-1"
                    >
                      <span>Branch Overview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Requirement: Clicking a branch card or its VISIT WEBSITE button must open that branch's configured official website in a new browser tab */}
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-700 hover:text-white hover:bg-emerald-600 px-3 py-1.5 rounded-lg border border-emerald-300 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                      title={`Visit ${branch.name} Official Website`}
                    >
                      <span>VISIT WEBSITE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
