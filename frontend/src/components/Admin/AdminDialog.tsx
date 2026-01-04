import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import type { AdminForm, AdminMode } from '../../lib/useAdminActions';

type Props = {
    open: boolean;
    mode: AdminMode;
    form: AdminForm;
    onChange: (updater: (prev: AdminForm) => AdminForm) => void;
    onClose: () => void;
    onCreate: () => void;
    onUpdate: () => void;
    onDelete: () => void;
};

export function AdminDialog({ open, onClose }: Props) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Admin</DialogTitle>
            <DialogContent dividers>{/* Inhalt folgt */}</DialogContent>
        </Dialog>
    );
}
