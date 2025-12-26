import { Button, Stack, Typography } from '@mui/material';

type Props = {
    page: number;
    totalPages: number;
    loading: boolean;
    isLight: boolean;
    onPrev: () => void;
    onNext: () => void;
};

export function PaginationBar({ page, totalPages, onPrev, onNext }: Props) {
    return (
        <Stack direction="row" justifyContent="center" spacing={2} alignItems="center" sx={{ mt: 2, pb: 4 }}>
            <Button variant="outlined" onClick={onPrev}>
                Zurück
            </Button>

            <Typography>
                Seite {page + 1} von {totalPages}
            </Typography>

            <Button variant="outlined" onClick={onNext}>
                Weiter
            </Button>
        </Stack>
    );
}
