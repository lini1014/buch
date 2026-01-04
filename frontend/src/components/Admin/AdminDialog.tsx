import { Dialog, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
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

export function AdminDialog({ open, mode, form, onChange, onClose }: Props) {
    const isUpdate = mode === 'update';
    const isDelete = mode === 'delete';
    const isCreate = mode === 'create';

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {isCreate ? 'Buch anlegen' : isUpdate ? 'Buch ändern' : 'Buch löschen'}
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    {(isUpdate || isDelete) && (
                        <TextField
                            label="ID"
                            value={form.id}
                            onChange={(e) =>
                                onChange((prev) => ({
                                    ...prev,
                                    id: e.target.value,
                                }))
                            }
                        />
                    )}
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
