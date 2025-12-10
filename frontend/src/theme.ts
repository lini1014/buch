import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2b59ff',
        },
        secondary: {
            main: '#ff7a3d',
        },
        background: {
            default: '#f5f7fb',
            paper: '#ffffff',
        },
        text: {
            primary: '#0f172a',
            secondary: '#4b5563',
        },
    },
    shape: {
        borderRadius: 14,
    },
    typography: {
        fontFamily:
            'var(--font-jakarta), "Plus Jakarta Sans", "Segoe UI", system-ui, -apple-system, sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 10px 40px rgba(15, 23, 42, 0.08)',
                    border: '1px solid rgba(15, 23, 42, 0.06)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    letterSpacing: 0.2,
                },
            },
        },
    },
});
