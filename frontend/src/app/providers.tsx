'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { type ReactNode } from 'react';
import { theme } from '../theme';

type Props = {
    readonly children: ReactNode;
};

export const AppProviders = ({ children }: Props) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
);
