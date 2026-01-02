import { Box } from '@mui/material';

type Props = {
    books: unknown[];
};

export function BookGrid({ }: Props) {
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
            {/* BookCards folgen */}
        </Box>
    );
}
