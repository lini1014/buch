import { Box } from '@mui/material';
import type { Buch } from '../lib/types';
import { BookCard } from './BookCard';

type Props = {
    books: Buch[];
};

export function BookGrid({ books }: Props) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 360px))',
                gap: 2.5,
                alignItems: 'stretch',
                justifyContent: 'center',
            }}
        >
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </Box>
    );
}
