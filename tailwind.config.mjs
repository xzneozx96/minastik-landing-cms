/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shine: 'shine 5s ease-in-out 500ms infinite',
        'shiny-text': 'shiny-text 5s infinite',
        rainbow: 'rainbow 5s linear infinite',
        'border-beam': 'border-beam 8s infinite linear',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
        grotesk: ['var(--font-grotesk)', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shine: {
          '0%': { top: '0', transform: 'scaleY(5)', opacity: '0' },
          '10%': { opacity: '.8' },
          '20%': { top: '100%', transform: 'scaleY(10)', opacity: '0' },
          '100%': { top: '100%', transform: 'scaleY(1)', opacity: '0' },
        },
        gradient: {
          to: { 'background-position': '200% center' },
        },
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - 100px) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + 100px) 0',
          },
        },
        rainbow: {
          to: {
            backgroundPosition: '300% 0',
          },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 600,
                marginBottom: '1.25rem',
                lineHeight: 1.25,
                fontSize: '2.25rem', // Default font size
                '@screen md': {
                  fontSize: '3rem', // md breakpoint
                },
                '@screen lg': {
                  fontSize: '4.5rem', // lg breakpoint
                },
              },
              h2: {
                fontWeight: 600,
                marginBottom: '1.25rem',
                lineHeight: 1.25,
                fontSize: '1.75rem', // Default font size
                '@screen md': {
                  fontSize: '2.25rem', // md breakpoint
                },
                '@screen lg': {
                  fontSize: '2.75rem', // md breakpoint
                },
              },
              h3: {
                fontWeight: 400,
                marginBottom: '1.25rem',
                lineHeight: 1.25,
                fontSize: '1.25rem', // Default font size
                '@screen md': {
                  fontSize: '1.5rem', // md breakpoint
                },
                '@screen lg': {
                  fontSize: '1.75rem', // md breakpoint
                },
              },
              h4: {
                fontWeight: 400,
                marginBottom: '1.25rem',
                lineHeight: 1.25,
                fontSize: '1.125rem', // Default font size
              },
              p: {
                color: '#c7d2fe',
                fontSize: '1rem', // Default font size
                '@screen lg': {
                  fontSize: '1.125rem', // lg breakpoint
                },
              },
              li: {
                color: '#c7d2fe',
                fontSize: '1rem', // Default font size
                '@screen lg': {
                  fontSize: '1.125rem', // lg breakpoint
                },
              },
            },
          ],
        },
      }),
    },
  },
}
