'use client';

import {
    Alert,
    Box,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { AdminActions } from '../components/Admin/AdminActions';
import { AdminDialog } from '../components/Admin/AdminDialog';
import { BookGrid } from '../components/BookGrid';
import { PaginationBar } from '../components/PaginationBar';
import { SearchForm } from '../components/SearchForm';
import { ThemeToggle } from '../components/ThemeToggle';
import { UserMenu } from '../components/UserMenu';
import { useAuth } from '../lib/auth';
import { useAdminActions } from '../lib/useAdminActions';
import { useBookSearch, type TagState } from '../lib/useBookSearch';

export default function Home() {
    const { token, isAuthenticated, logout, username } = useAuth();

    const {
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
    } = useBookSearch(token, isAuthenticated);

    const {
        adminForm,
        setAdminForm,
        adminInfo,
        adminError,
        adminMode,
        dialogOpen,
        openDialog,
        closeDialog,
        handleCreate,
        handleUpdate,
        handleDelete,
    } = useAdminActions(token, loadBooks);

    const [isLight, setIsLight] = useState(false);
    const isAdmin = username?.toLowerCase() === 'admin';

    const palette = {
        background: isLight ? '#f7f7f7' : '#1f1f1f',
        panel: isLight ? '#f2f2f2' : '#e6e6e6',
    };

    const handleSearch = () => {
        setPage(0);
        void loadBooks();
    };

    const handleReset = () => {
        resetFilters();
    };

    const handleTagToggle = (tag: keyof TagState, checked: boolean) =>
        setTags((prev) => ({ ...prev, [tag]: checked }));

    const isLoading = state.status === 'loading';
    const isSuccess = state.status === 'success';

    return (
        <Box
            suppressHydrationWarning
            sx={{
                minHeight: '100vh',
                bgcolor: palette.background,
                position: 'relative',
                overflow: 'hidden',
                px: { xs: 2, md: 6 },
                py: { xs: 3, md: 4 },
                transition: 'background-color 0.3s ease',
            }}
        >
            {isAuthenticated && (
                <UserMenu username={username} onLogout={logout} />
            )}

            <Box
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                }}
            >
                <ThemeToggle isLight={isLight} onToggle={setIsLight} />
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    zIndex: 2,
                }}
            >
                <Box
                    component="img"
                    src="/hka-banner.png"
                    alt="HKA"
                    sx={{
                        height: { xs: 150, sm: 190 },
                        width: { xs: 300, sm: 420 },
                        maxWidth: '50vw',
                        objectFit: 'contain',
                    }}
                />
            </Box>

            <Box
                sx={{
                    maxWidth: 700,
                    mx: 'auto',
                    bgcolor: palette.panel,
                    borderRadius: '32px',
                    p: { xs: 3, sm: 4 },
                    boxShadow: '0 22px 60px rgba(0,0,0,0.35)',
                    transition: 'background-color 0.3s ease',
                }}
            >
                {!isAuthenticated && (
                    <Alert
                        severity="info"
                        action={
                            <Typography
                                component="a"
                                href="/login"
                                sx={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                Anmelden
                            </Typography>
                        }
                        sx={{ mb: 2 }}
                    >
                        Bitte melde dich an, um Bücher zu laden.
                    </Alert>
                )}

                {isAuthenticated && (
                    <SearchForm
                        query={query}
                        art={art}
                        lieferbarOnly={lieferbarOnly}
                        tags={tags}
                        loading={isLoading}
                        onQueryChange={setQuery}
                        onArtChange={setArt}
                        onLieferbarChange={setLieferbarOnly}
                        onTagToggle={handleTagToggle}
                        onReset={handleReset}
                        onSearch={handleSearch}
                    />
                )}

                {isAuthenticated && isAdmin && (
                    <AdminActions
                        onSelectMode={openDialog}
                        info={adminInfo}
                        error={adminError}
                    />
                )}
            </Box>

            <Stack spacing={2} sx={{ mt: 3 }}>
                {isLoading && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ justifyContent: 'center', py: 3 }}
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

                {isSuccess && books.length === 0 && (
                    <Alert severity="info">
                        Keine Bücher gefunden. Probiere eine andere Suche.
                    </Alert>
                )}

                {isSuccess && books.length > 0 && (
                    <BookGrid books={books} />
                )}

                {isSuccess && totalPages > 1 && (
                    <PaginationBar
                        page={page}
                        totalPages={totalPages}
                        loading={isLoading}
                        isLight={isLight}
                        onPrev={() => {
                            if (page > 0) {
                                setPage(page - 1);
                            }
                        }}
                        onNext={() => {
                            if (page + 1 < totalPages) {
                                setPage(page + 1);
                            }
                        }}
                    />
                )}
            </Stack>

            <AdminDialog
                open={dialogOpen}
                mode={adminMode}
                form={adminForm}
                onChange={setAdminForm}
                onClose={closeDialog}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </Box>
    );
}
