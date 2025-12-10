'use client';

import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Divider,
    FormControlLabel,
    Rating,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { bookApi } from '../lib/api';
import type { Buch, Page } from '../lib/types';

type FetchState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'error'; message: string }
    | { status: 'success'; data: Page<Buch> };

export default function Home() {
    const [query, setQuery] = useState('');
    const [lieferbarOnly, setLieferbarOnly] = useState(false);
    const [state, setState] = useState<FetchState>({ status: 'idle' });

    const loadBooks = useCallback(async () => {
        setState({ status: 'loading' });
        try {
            const data = await bookApi.list({
                titel: query || undefined,
                lieferbar: lieferbarOnly ? true : undefined,
            });
            setState({ status: 'success', data });
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Unbekannter Fehler bei der Abfrage';
            setState({ status: 'error', message });
        }
    }, [lieferbarOnly, query]);

    useEffect(() => {
        void loadBooks();
    }, [loadBooks]);

    const books = useMemo(() => {
        if (state.status !== 'success') {
            return [];
        }
        return state.data.content;
    }, [state]);

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Stack spacing={4}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                        sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            display: 'inline-flex',
                        }}
                    >
                        <LibraryBooksRoundedIcon />
                    </Box>
                    <div>
                        <Typography variant="h4">Buch Explorer</Typography>
                        <Typography color="text.secondary">
                            Next.js + MUI Frontend auf Basis des Buch-Backends
                        </Typography>
                    </div>
                </Stack>

                <Card>
                    <CardContent>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                void loadBooks();
                            }}
                        >
                            <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                spacing={2}
                                alignItems={{ xs: 'stretch', md: 'center' }}
                            >
                                <TextField
                                    fullWidth
                                    label="Titel enthält"
                                    placeholder="z.B. Java, Microservices, Cloud"
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <SearchRoundedIcon
                                                fontSize="small"
                                                color="primary"
                                                sx={{ mr: 1 }}
                                            />
                                        ),
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={lieferbarOnly}
                                            onChange={(event) =>
                                                setLieferbarOnly(
                                                    event.target.checked,
                                                )
                                            }
                                        />
                                    }
                                    label="Nur lieferbare Bücher"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    startIcon={<SearchRoundedIcon />}
                                    sx={{ px: 3 }}
                                    disabled={state.status === 'loading'}
                                >
                                    Suchen
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>

                {state.status === 'loading' && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ justifyContent: 'center', py: 6 }}
                    >
                        <CircularProgress />
                        <Typography color="text.secondary">
                            Bücher werden geladen...
                        </Typography>
                    </Stack>
                )}

                {state.status === 'error' && (
                    <Alert severity="error">{state.message}</Alert>
                )}

                {state.status === 'success' && books.length === 0 && (
                    <Alert severity="info">
                        Keine Bücher gefunden. Probiere eine andere Suche.
                    </Alert>
                )}

                {state.status === 'success' && books.length > 0 && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 2.5,
                        }}
                    >
                        {books.map((book) => (
                            <Card key={book.id} sx={{ height: '100%' }}>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1.5,
                                        height: '100%',
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent="space-between"
                                    >
                                        <Stack spacing={0.5}>
                                            <Typography variant="h6">
                                                {book.titel?.titel ?? '—'}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {book.titel?.untertitel ?? ''}
                                            </Typography>
                                        </Stack>
                                        <Chip
                                            label={book.art ?? 'Unbekannt'}
                                            color="primary"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Stack>

                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Rating
                                            value={book.rating}
                                            precision={0.5}
                                            readOnly
                                            size="small"
                                        />
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            ISBN {book.isbn}
                                        </Typography>
                                    </Stack>

                                    <Divider />

                                    <Stack spacing={0.5}>
                                        <Typography variant="body2">
                                            Preis:{' '}
                                            <strong>
                                                {book.preis !== undefined &&
                                                book.preis !== null
                                                    ? `${book.preis} €`
                                                    : 'n/a'}
                                            </strong>
                                        </Typography>
                                        <Typography variant="body2">
                                            Lieferbar:{' '}
                                            <Chip
                                                label={
                                                    book.lieferbar
                                                        ? 'Ja'
                                                        : 'Nein'
                                                }
                                                color={
                                                    book.lieferbar
                                                        ? 'success'
                                                        : 'default'
                                                }
                                                size="small"
                                            />
                                            </Typography>
                                            {book.schlagwoerter &&
                                                book.schlagwoerter.length > 0 && (
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        flexWrap="wrap"
                                                        useFlexGap
                                                    >
                                                    {book.schlagwoerter.map(
                                                        (tag) => (
                                                            <Chip
                                                                key={`${book.id}-${tag}`}
                                                                label={tag}
                                                                size="small"
                                                                color="secondary"
                                                                variant="filled"
                                                            />
                                                        ),
                                                    )}
                                                </Stack>
                                            )}
                                        <Box sx={{ flexGrow: 1 }} />
                                        <Button
                                            component={Link}
                                            href={`/books/${book.id}`}
                                            variant="outlined"
                                            size="small"
                                            sx={{ alignSelf: 'flex-start', mt: 1 }}
                                        >
                                            Details
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Stack>
        </Container>
    );
}
