/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // RAFT primary — confident ocean azure (institutional, water/climate)
        brand: {
          50: '#f0f8ff',
          100: '#dcefff',
          200: '#b9dfff',
          300: '#82c8ff',
          400: '#43a8fd',
          500: '#1888ec',
          600: '#0a6cc9',
          700: '#0a56a2',
          800: '#0e4985',
          900: '#123f6e',
          950: '#0c2747',
        },
        // Secondary accent — teal/aqua (rivers, freshness, AI signal)
        aqua: {
          50: '#effbf8',
          100: '#d6f5ee',
          200: '#b0eade',
          300: '#7cdac9',
          400: '#43c0b0',
          500: '#1fa496',
          600: '#14857b',
          700: '#136a64',
          800: '#145551',
          900: '#144745',
          950: '#052a2a',
        },
        // Alert / flood-warning signal — used sparingly for emphasis
        signal: {
          50: '#fff8eb',
          100: '#feefc7',
          200: '#fddd8a',
          300: '#fcc44d',
          400: '#fbab24',
          500: '#f5890b',
          600: '#d96706',
          700: '#b44709',
          800: '#92370e',
          900: '#782f0f',
          950: '#451603',
        },
        // IIT Hyderabad institutional accents.
        // NOTE: IITH publishes its logo colours in CMYK only — these are
        // unofficial sRGB approximations used solely for institutional accents
        // (the sun motif from the logo + indigo wordmark). Replace with official
        // web colours if IITH provides them.
        iith: {
          indigo: '#2e3192',
          red: '#ed3124',
          orange: '#f36f21',
          amber: '#faa61a',
          yellow: '#ffcb05',
        },
        // Neutral ink — slightly cool slate for text & surfaces
        ink: {
          50: '#f6f8fb',
          100: '#eef1f6',
          200: '#dce3ec',
          300: '#bdcad9',
          400: '#94a6bd',
          500: '#6f83a0',
          600: '#566a86',
          700: '#46566d',
          800: '#3c495c',
          900: '#1f2937',
          950: '#0f1722',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)',
        card: '0 4px 24px -8px rgba(13,42,82,0.12)',
        'card-hover': '0 18px 50px -16px rgba(13,42,82,0.28)',
        glow: '0 0 0 1px rgba(24,136,236,0.12), 0 10px 40px -10px rgba(24,136,236,0.45)',
        'inner-line': 'inset 0 1px 0 0 rgba(255,255,255,0.6)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(110deg, #0a56a2 0%, #1888ec 45%, #1fa496 100%)',
        'brand-gradient-soft': 'linear-gradient(110deg, #dcefff 0%, #effbf8 100%)',
        'mesh-light':
          'radial-gradient(at 18% 12%, rgba(24,136,236,0.12) 0px, transparent 50%), radial-gradient(at 82% 8%, rgba(31,164,150,0.10) 0px, transparent 45%), radial-gradient(at 70% 80%, rgba(24,136,236,0.08) 0px, transparent 50%)',
        'grid-light':
          'linear-gradient(to right, rgba(13,42,82,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,42,82,0.06) 1px, transparent 1px)',
        'dot-light': 'radial-gradient(rgba(13,42,82,0.10) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '44px 44px',
        dot: '22px 22px',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.55' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.08)', opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '80%, 100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        aurora: 'aurora 14s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        marquee: 'marquee 38s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        'border-beam': 'spin-slow 5s linear infinite',
        'border-sweep': 'shimmer 6s linear infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.4,0,0.2,1) infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}
