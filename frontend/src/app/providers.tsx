'use client';

import type { EmotionCache } from '@emotion/cache';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useServerInsertedHTML } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import { theme } from '../theme';
import { AuthProvider } from '../lib/auth';

type Props = {
    readonly children: ReactNode;
};

const createEmotionCache = () => {
    const cache = createCache({ key: 'mui', prepend: true });
    cache.compat = true;
    return cache;
};

export const AppProviders = ({ children }: Props) => (
    <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
    </AppRouterCacheProvider>
);

const AppRouterCacheProvider = ({ children }: Props) => {
    const [{ cache, flush }] = useState(() => {
        const cache = createEmotionCache();
        const flush = () => {
            const inserted = cache.inserted;
            cache.inserted = {};
            return inserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const inserted = flush();
        const names = Object.keys(inserted);
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += inserted[name];
        }
        return (
            <style
                data-emotion={`${cache.key} ${names.join(' ')}`}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: styles }}
            />
        );
    });

    return <CacheProvider value={cache}>{children}</CacheProvider>;
};
