import { useCallback, useEffect, useMemo, useState } from 'react';
import { bookApi } from './api';
import type { Buch, Page } from './types';

export type FetchState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'error'; message: string }
    | { status: 'success'; data: Page<Buch> };

export type TagState = {
    javascript: boolean;
    typescript: boolean;
    java: boolean;
    python: boolean;
};

const DEFAULT_TAGS: TagState = {
    javascript: false,
    typescript: false,
    java: false,
    python: false,
};

export function useBookSearch(token: string | undefined) {
    const [query, setQuery] = useState('');
    const [lieferbarOnly, setLieferbarOnly] = useState(false);
    const [art, setArt] = useState<string | undefined>(undefined);
    const [tags, setTags] = useState<TagState>(DEFAULT_TAGS);
    const [page, setPage] = useState(0);
    const [state, setState] = useState<FetchState>({ status: 'idle' });

    const loadBooks = useCallback(async () => {
        setState({ status: 'loading' });
        try {
            const data = await bookApi.list(
                {
                    titel: query || undefined,
                    lieferbar: lieferbarOnly ? true : undefined,
                    art,
                    javascript: tags.javascript || undefined,
                    typescript: tags.typescript || undefined,
                    java: tags.java || undefined,
                    python: tags.python || undefined,
                    page: page + 1,
                    size: 4,
                },
                token,
            );
            setState({ status: 'success', data });
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Unbekannter Fehler bei der Abfrage';
            setState({ status: 'error', message });
        }
    }, [art, lieferbarOnly, page, query, tags.java, tags.javascript, tags.python, tags.typescript, token]);

    useEffect(() => {
        void loadBooks();
    }, [loadBooks]);

    const books = useMemo(() => {
        if (state.status !== 'success') {
            return [];
        }
        return state.data.content;
    }, [state]);

    const totalPages = state.status === 'success' ? state.data.page.totalPages : 0;

    const resetFilters = useCallback(() => {
        setQuery('');
        setArt(undefined);
        setLieferbarOnly(false);
        setTags({ ...DEFAULT_TAGS });
        setPage(0);
    }, []);

    return {
        query,
        setQuery,
        lieferbarOnly,
        setLieferbarOnly,
        art,
        setArt,
        tags,
        setTags,
        page,
        setPage,
        state,
        books,
        totalPages,
        loadBooks,
        resetFilters,
    };
}
