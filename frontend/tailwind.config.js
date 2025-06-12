/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--color-background) / <alpha-value>)',
                foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
                card: 'rgb(var(--color-card) / <alpha-value>)',
                'card-hover': 'rgb(var(--color-card-hover) / <alpha-value>)',
                border: 'rgb(var(--color-border) / <alpha-value>)',
                input: 'rgb(var(--color-input) / <alpha-value>)',
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                'primary-hover': 'rgb(var(--color-primary-hover) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                'secondary-hover': 'rgb(var(--color-secondary-hover) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
                muted: 'rgb(var(--color-muted) / <alpha-value>)',
                'muted-foreground': 'rgb(var(--color-muted-foreground) / <alpha-value>)',
                error: 'rgb(var(--color-error) / <alpha-value>)',
                'error-hover': 'rgb(var(--color-error-hover) / <alpha-value>)',
                success: 'rgb(var(--color-success) / <alpha-value>)',
                'success-hover': 'rgb(var(--color-success-hover) / <alpha-value>)',
                warning: 'rgb(var(--color-warning) / <alpha-value>)',
                'warning-hover': 'rgb(var(--color-warning-hover) / <alpha-value>)',
                info: 'rgb(var(--color-info) / <alpha-value>)',
                'info-hover': 'rgb(var(--color-info-hover) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter var', 'system-ui', 'sans-serif'],
            },
            animation: {
                slideIn: 'slideIn 0.3s ease-out',
                fadeIn: 'fadeIn 0.2s ease-out',
                pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}