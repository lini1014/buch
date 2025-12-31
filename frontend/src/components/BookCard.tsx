import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import type { Buch } from '../lib/types';

type Props = {
    book: Buch;
};

export function BookCard({ book }: Props) {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardContent>
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
                        <Typography variant="body2" color="text.secondary">
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
            </CardContent>
        </Card>
    );
}
