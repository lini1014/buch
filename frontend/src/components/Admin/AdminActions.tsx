import { Box, Button, Typography } from '@mui/material';
import type { AdminMode } from '../../lib/useAdminActions';

type Props = {
    onSelectMode: (mode: AdminMode) => void;
    info?: string;
    error?: string;
};

export function AdminActions({ onSelectMode, info, error }: Props) {
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

            {info && (
                <Typography sx={{ mt: 1 }} color="success.main">
                    {info}
                </Typography>
            )}
            {error && (
                <Typography sx={{ mt: 1 }} color="error.main">
                    {error}
                </Typography>
            )}
        </Box>
    );
}
