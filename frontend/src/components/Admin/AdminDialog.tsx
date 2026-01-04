import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
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

                    {(isCreate || isUpdate) && (
                        <>
                            <TextField
                                label="Titel"
                                value={form.titel}
                                onChange={(e) =>
                                    onChange((prev) => ({
                                        ...prev,
                                        titel: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                label="Untertitel"
                                value={form.untertitel}
                                onChange={(e) =>
                                    onChange((prev) => ({
                                        ...prev,
                                        untertitel: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                label="ISBN"
                                value={form.isbn}
                                onChange={(e) =>
                                    onChange((prev) => ({
                                        ...prev,
                                        isbn: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                label="Rating"
                                value={form.rating}
                                onChange={(e) =>
                                    onChange((prev) => ({
                                        ...prev,
                                        rating: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                label="Preis"
                                value={form.preis}
                                onChange={(e) =>
                                    onChange((prev) => ({
                                        ...prev,
                                        preis: e.target.value,
                                    }))
                                }
                            />
                            <FormControl fullWidth>
                                <InputLabel id="admin-art-label">Art</InputLabel>
                                <Select
                                    labelId="admin-art-label"
                                    label="Art"
                                    value={form.art}
                                    onChange={(e) =>
                                        onChange((prev) => ({
                                            ...prev,
                                            art: e.target.value,
                                        }))
                                    }
                                >
                                    <MenuItem value="">
                                        <em>—</em>
                                    </MenuItem>
                                    <MenuItem value="EPUB">EPUB</MenuItem>
                                    <MenuItem value="HARDCOVER">HARDCOVER</MenuItem>
                                    <MenuItem value="PAPERBACK">PAPERBACK</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={Boolean(form.lieferbar)}
                                        onChange={(e) =>
                                            onChange((prev) => ({
                                                ...prev,
                                                lieferbar: e.target.checked,
                                            }))
                                        }
                                    />
                                }
                                label="Lieferbar"
                            />
                            {isUpdate && (
                                <TextField
                                    label="Version (If-Match)"
                                    value={form.version}
                                    onChange={(e) =>
                                        onChange((prev) => ({
                                            ...prev,
                                            version: e.target.value,
                                        }))
                                    }
                                />
                            )}
                        </>
                    )}
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
