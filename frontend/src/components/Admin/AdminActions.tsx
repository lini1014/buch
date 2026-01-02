import { Box, Button } from '@mui/material';
import type { AdminMode } from '../../lib/useAdminActions';

type Props = {
    onSelectMode: (mode: AdminMode) => void;
};

export function AdminActions({ onSelectMode }: Props) {
    return (
        <Box sx={{ mt: 4, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={() => onSelectMode('create')}>
                Anlegen
            </Button>
            <Button variant="outlined" onClick={() => onSelectMode('update')}>
                Ändern
            </Button>
            <Button variant="contained" color="error" onClick={() => onSelectMode('delete')}>
                Löschen
            </Button>
        </Box>
    );
}
