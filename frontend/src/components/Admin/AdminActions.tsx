import { Box } from '@mui/material';

type Props = {
    onSelectMode: (mode: 'create' | 'update' | 'delete') => void;
};

export function AdminActions({}: Props) {
    return (
        <Box sx={{ mt: 4, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {/* Aktionen folgen */}
        </Box>
    );
}
