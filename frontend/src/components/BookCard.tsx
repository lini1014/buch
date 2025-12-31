import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
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
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    height: '100%',
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
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

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Rating value={book.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                        ISBN {book.isbn}
                    </Typography>
                </Stack>

                <Divider />

                <Stack spacing={0.5}>
                    <Typography variant="body2">
                        Preis:{' '}
                        <strong>
                            {book.preis !== undefined && book.preis !== null
                                ? `${book.preis} €`
                                : 'n/a'}
                        </strong>
                    </Typography>
                    <Typography variant="body2">
                        Lieferbar: <strong>{book.lieferbar ? 'Ja' : 'Nein'}</strong>
                    </Typography>

                    {book.schlagwoerter && book.schlagwoerter.length > 0 && (
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {book.schlagwoerter.map((tag) => (
                                <Chip
                                    key={`${book.id}-${tag}`}
                                    label={tag}
                                    size="small"
                                    color="secondary"
                                    variant="filled"
                                />
                            ))}
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
    );
}