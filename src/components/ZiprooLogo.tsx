import React from 'react';

interface ZiprooLogoProps {
  className?: string;
  variant?: 'original' | 'white' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customLogoUrl?: string;
}

/**
 * Pixel-precise reproduction of the original ZIPROO brand logo
 * Featuring the signature circular 'Z' monogram, bold geometric 'iproo' lettering,
 * and the 'since 2026' subscript.
 * Supports custom admin-uploaded logo URLs while preserving original vector logo.
 */
export const ZiprooLogo: React.FC<ZiprooLogoProps> = ({
  className = '',
  variant = 'white',
  size = 'md',
  customLogoUrl,
}) => {
  // Height presets
  const sizeMap = {
    sm: 'h-7',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  };

  const selectedHeight = sizeMap[size] || 'h-10';

  if (customLogoUrl && customLogoUrl.trim()) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src={customLogoUrl}
          alt="ZIPROO Brand Logo"
          className={`${selectedHeight} w-auto object-contain max-w-full`}
        />
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center p-2.5 bg-white rounded-xl shadow-lg border border-neutral-200/20 ${className}`}>
        <svg
          viewBox="0 0 540 180"
          className={selectedHeight}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="ZIPROO Logo - since 2026"
        >
          {/* Circular disc */}
          <circle cx="85" cy="85" r="76" fill="#18181b" />
          
          {/* Bold White Z inside circle */}
          <path
            d="M50 48 H120 V65 L76 112 H122 V128 H48 V111 L92 64 H50 V48 Z"
            fill="#ffffff"
          />

          {/* Lowercase 'iproo' in black bold geometric font */}
          <text
            x="165"
            y="125"
            fill="#18181b"
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '118px',
              fontWeight: 800,
              letterSpacing: '-0.035em',
            }}
          >
            iproo
          </text>

          {/* 'since 2026' right-aligned under 'proo' */}
          <text
            x="320"
            y="160"
            fill="#27272a"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '29px',
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            since 2026
          </text>
        </svg>
      </div>
    );
  }

  // Variant for light backgrounds (pure black logo as uploaded)
  if (variant === 'original') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <svg
          viewBox="0 0 540 180"
          className={`${selectedHeight} w-auto`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="ZIPROO Logo - since 2026"
        >
          {/* Charcoal Black Circle */}
          <circle cx="85" cy="85" r="76" fill="#18181b" />

          {/* Crisp White Z */}
          <path
            d="M50 48 H120 V65 L76 112 H122 V128 H48 V111 L92 64 H50 V48 Z"
            fill="#ffffff"
          />

          {/* 'iproo' in bold charcoal */}
          <text
            x="165"
            y="125"
            fill="#18181b"
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '118px',
              fontWeight: 800,
              letterSpacing: '-0.035em',
            }}
          >
            iproo
          </text>

          {/* 'since 2026' */}
          <text
            x="320"
            y="160"
            fill="#3f3f46"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '29px',
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            since 2026
          </text>
        </svg>
      </div>
    );
  }

  // Variant for dark backgrounds (inverted white logo with subtle electric accent)
  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        viewBox="0 0 540 180"
        className={`${selectedHeight} w-auto`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ZIPROO Logo - since 2026"
      >
        {/* Glow backdrop for high-end futuristic feel */}
        <defs>
          <filter id="ziproo-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#9333ea" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Crisp White/Silver Circle */}
        <circle cx="85" cy="85" r="76" fill="#f4f4f5" />

        {/* Deep Black Z */}
        <path
          d="M50 48 H120 V65 L76 112 H122 V128 H48 V111 L92 64 H50 V48 Z"
          fill="#09090b"
        />

        {/* 'iproo' in brilliant white */}
        <text
          x="165"
          y="125"
          fill="#ffffff"
          style={{
            fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: '118px',
            fontWeight: 800,
            letterSpacing: '-0.035em',
          }}
        >
          iproo
        </text>

        {/* 'since 2026' in electric cyan / cool silver */}
        <text
          x="320"
          y="160"
          fill="#a1a1aa"
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: '29px',
            fontWeight: 600,
            letterSpacing: '0.01em',
          }}
        >
          since 2026
        </text>
      </svg>
    </div>
  );
};
