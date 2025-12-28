import { Button, Stack, Typography } from '@mui/material';

type Props = {
    page: number;
    totalPages: number;
    loading: boolean;
    isLight: boolean;
    onPrev: () => void;
    onNext: () => void;
};

export function PaginationBar({ page, totalPages, loading, isLight, onPrev, onNext }: Props) {
    const isFirstPage = page === 0;
    const isLastPage = page + 1 >= totalPages;

    return (
        <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{ mt: 2, pb: 4 }}
        >
            <Button
                variant="outlined"
                onClick={onPrev}
                disabled={isFirstPage || loading}
                aria-label="Vorherige Seite"
            >
                Zurück
            </Button>

            <Typography sx={{ color: isLight ? '#111' : '#f5f5f5' }}>
                Seite {page + 1} von {totalPages}
            </Typography>

            <Button
                variant="outlined"
                onClick={onNext}
                disabled={isLastPage || loading}
                aria-label="Nächste Seite"
            >
                Weiter
            </Button>
        </Stack>
    );
}
