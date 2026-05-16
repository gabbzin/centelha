import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './resources/js/**/*.{ts,tsx,jsx,js}',
    './resources/views/**/*.blade.php',
    './resources/css/**/*.css',
    './resources/**/*.{html,php}',
  ],
  theme: {
    extend: {
      maxWidth: {
        lm: '1440px',
      },
      colors: {
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',

        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        surface: 'var(--surface)',
        heading: 'var(--heading)',

        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',

        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        info: 'var(--info)',

        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },

        sidebar: {
          DEFAULT: 'var(--sidebar-background)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          border: 'var(--sidebar-border)',
        },
      },
    },
  },
  plugins: [forms, typography],
};
