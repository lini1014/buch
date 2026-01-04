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

export function AdminDialog({ open, mode, onClose }: Props) {
    const isUpdate = mode === 'update';
    const isCreate = mode === 'create';

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {isCreate ? 'Buch anlegen' : isUpdate ? 'Buch ändern' : 'Buch löschen'}
            </DialogTitle>
            <DialogContent dividers>{/* Inhalt folgt */}</DialogContent>
        </Dialog>
    );
}
