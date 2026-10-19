import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { ZiprooLogo } from './ZiprooLogo';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in text-slate-800">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700">
              {type === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {type === 'privacy' ? 'ZIPROO Privacy Policy' : 'ZIPROO Terms & Conditions'}
              </h3>
              <p className="text-xs text-slate-500">Effective Since 2026 · Corporate Governance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed pr-2">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-slate-900">1. Commitment to Data Dignity & Security</p>
              <p>
                At ZIPROO, protecting the confidentiality and integrity of your corporate and personal information is foundational to our mission. As a multi-sector enterprise spanning high-fashion and advanced IT solutions, we implement military-grade encryption and zero-knowledge data retention frameworks.
              </p>
              <p className="font-semibold text-slate-900">2. Scope of Collected Data</p>
              <p>
                We collect information provided directly through project inquiries, corporate correspondence, clothing orders, and software service agreements. We never sell, monetize, or harvest user telemetry for third-party advertising networks.
              </p>
              <p className="font-semibold text-slate-900">3. Enterprise Infrastructure Safeguards</p>
              <p>
                All digital solutions deployed through ZIPROO IT Solutions adhere to ISO/IEC 27001 standards, GDPR compliance, and encrypted transport protocols (TLS 1.3 / HTTPS).
              </p>
              <p className="font-semibold text-slate-900">4. Inquiries and Exercising Your Rights</p>
              <p>
                To request data deletion, review your profile, or communicate with our Data Governance Council, please contact <span className="text-emerald-700 font-medium">ziproo2026@gmail.com</span>.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-900">1. Master Service Agreement</p>
              <p>
                By accessing or contracting with ZIPROO, you agree to comply with our international corporate governance terms, product delivery standards, and intellectual property provisions.
              </p>
              <p className="font-semibold text-slate-900">2. Intellectual Property & Brand Rights</p>
              <p>
                All trademarks, including the ZIPROO wordmark, "Create Your Identity" slogan, fashion designs, proprietary software frameworks, and visual assets are the exclusive property of ZIPROO (Since 2026).
              </p>
              <p className="font-semibold text-slate-900">3. Multi-Sector Service Provision</p>
              <p>
                ZIPROO Clothing guarantees high-grade textile sourcing, ethical factory manufacturing, and inspection standards. ZIPROO IT Solutions guarantees service level agreements (SLAs) tailored to bespoke client architecture.
              </p>
              <p className="font-semibold text-slate-900">4. Jurisdiction & International Trade</p>
              <p>
                Agreements are governed by standard international commercial arbitration principles. For corporate legal inquiries, reach out to <span className="text-emerald-700 font-medium">ziproo2026@gmail.com</span>.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <ZiprooLogo variant="original" size="sm" />
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};
