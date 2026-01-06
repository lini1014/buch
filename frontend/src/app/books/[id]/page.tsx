import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Link as MuiLink,
    Rating,
    Stack,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { bookApi } from '../../../lib/api';
import type { Buch } from '../../../lib/types';
import type { ReactNode } from 'react';

type Props = {
    readonly params: { readonly id: string };
};

const DetailRow = ({
    label,
    value,
}: {
    readonly label: string;
    readonly value: ReactNode;
}) => (
    <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={0.5}
        justifyContent="space-between"
    >
        <Typography color="text.secondary">{label}</Typography>
        <Typography fontWeight={600}>{value}</Typography>
    </Stack>
);

const formatDate = (value?: string | null) => {
    if (!value) {
        return '—';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleDateString('de-DE');
};

export default async function BookDetail({ params }: Props) {
    const id = Number(params.id);
    if (!Number.isInteger(id)) {
        return notFound();
    }

    let book: Buch | undefined;
    try {
        book = await bookApi.get(id);
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Buch konnte nicht geladen werden.';
        return (
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Alert severity="error">{message}</Alert>
            </Container>
        );
    }

    if (!book) {
        return notFound();
    }

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Stack spacing={3}>
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
                        <Typography variant="h4">
                            {book.titel?.titel ?? 'Unbekannter Titel'}
                        </Typography>
                        <Typography color="text.secondary">
                            ID {book.id} · ISBN {book.isbn}
                        </Typography>
                    </div>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <Rating value={book.rating} precision={0.5} readOnly />
                    <Chip
                        label={book.art ?? 'Unbekannt'}
                        color="primary"
                        variant="outlined"
                    />
                    {book.lieferbar && (
                        <Chip label="Lieferbar" color="success" size="small" />
                    )}
                </Stack>

                <Card>
                    <CardContent>
                        <Stack spacing={2}>
                            {book.titel?.untertitel && (
                                <Typography color="text.secondary">
                                    {book.titel.untertitel}
                                </Typography>
                            )}
                            <DetailRow
                                label="Preis"
                                value={
                                    book.preis !== undefined && book.preis !== null
                                        ? `${book.preis} €`
                                        : '—'
                                }
                            />
                            <DetailRow
                                label="Rabatt"
                                value={
                                    book.rabatt !== undefined && book.rabatt !== null
                                        ? `${(Number(book.rabatt) * 100).toFixed(1)} %`
                                        : '—'
                                }
                            />
                            <DetailRow
                                label="Erscheinungsdatum"
                                value={formatDate(book.datum)}
                            />
                            <DetailRow
                                label="Homepage"
                                value={
                                    book.homepage ? (
                                        <MuiLink
                                            href={book.homepage}
                                            target="_blank"
                                            rel="noreferrer"
                                            display="inline-flex"
                                            alignItems="center"
                                            gap={0.5}
                                        >
                                            <InsertLinkRoundedIcon
                                                fontSize="small"
                                            />
                                            {book.homepage}
                                        </MuiLink>
                                    ) : (
                                        '—'
                                    )
                                }
                            />
                            {book.schlagwoerter &&
                                book.schlagwoerter.length > 0 && (
                                    <>
                                        <Divider />
                                        <Typography fontWeight={600}>
                                            Schlagwörter
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                            useFlexGap
                                        >
                                            {book.schlagwoerter.map((tag) => (
                                                <Chip
                                                    key={`${book.id}-${tag}`}
                                                    label={tag}
                                                    color="secondary"
                                                    size="small"
                                                />
                                            ))}
                                        </Stack>
                                    </>
                                )}
                            {book.abbildungen &&
                                book.abbildungen.length > 0 && (
                                    <>
                                        <Divider />
                                        <Typography fontWeight={600}>
                                            Abbildungen
                                        </Typography>
                                        <Stack spacing={1}>
                                            {book.abbildungen.map(
                                                (bild, index) => (
                                                    <Chip
                                                        key={`${book.id}-img-${index.toString()}`}
                                                        label={
                                                            bild.beschriftung ??
                                                            bild.contentType ??
                                                            'Abbildung'
                                                        }
                                                        variant="outlined"
                                                    />
                                                ),
                                            )}
                                        </Stack>
                                    </>
                                )}
                        </Stack>
                    </CardContent>
                </Card>

                <Stack direction="row" spacing={1}>
                    <Chip
                        component={Link}
                        href="/"
                        icon={<ArrowBackIosNewRoundedIcon />}
                        label="Zurück zur Übersicht"
                        clickable
                        variant="outlined"
                    />
                </Stack>
            </Stack>
        </Container>
    );
}
