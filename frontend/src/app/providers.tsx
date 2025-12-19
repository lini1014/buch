'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { type ReactNode } from 'react';
import { theme } from '../theme';
import { AuthProvider } from '../lib/auth';

type Props = {
    readonly children: ReactNode;
};

export const AppProviders = ({ children }: Props) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
);
