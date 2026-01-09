import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
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
import { useState } from 'react';
import type { AdminForm, AdminMode } from '../../lib/useAdminActions';

const TAG_OPTIONS = ['JAVASCRIPT', 'TYPESCRIPT', 'JAVA', 'PYTHON'] as const;

type FieldError = Partial<Record<keyof AdminForm, string>>;

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

export function AdminDialog({
    open,
    mode,
    form,
    onChange,
    onClose,
    onCreate,
    onUpdate,
    onDelete,
}: Props) {
    const isUpdate = mode === 'update';
    const isDelete = mode === 'delete';
    const isCreate = mode === 'create';
    const [errors, setErrors] = useState<FieldError>({});

    const setField = <K extends keyof AdminForm>(key: K, value: AdminForm[K]) => {
        onChange((prev) => ({
            ...prev,
            [key]: value,
        }));
        // Live-validate only a subset of fields
        if (key === 'titel' && typeof value === 'string' && (isCreate || isUpdate)) {
            setErrors((prevErr) => ({
                ...prevErr,
                titel: value.trim() === '' ? 'Titel ist erforderlich' : undefined,
            }));
        }
        if (
            key === 'isbn' &&
            typeof value === 'string' &&
            (isCreate || isDelete)
        ) {
            setErrors((prevErr) => ({
                ...prevErr,
                isbn:
                    value.trim() === ''
                        ? 'ISBN ist erforderlich'
                        : undefined,
            }));
        }
        if (key === 'id' && isUpdate) {
            const idNum = Number(value);
            setErrors((prevErr) => ({
                ...prevErr,
                id:
                    !Number.isInteger(idNum) || idNum <= 0
                        ? 'Gültige ID angeben'
                        : undefined,
            }));
        }
    };

    const validate = () => {
        const nextErrors: FieldError = {};

        if (isUpdate) {
            const idNum = Number(form.id);
            if (!Number.isInteger(idNum) || idNum <= 0) {
                nextErrors.id = 'Gültige ID angeben';
            }
        }
        if (isDelete) {
            if (form.isbn.trim() === '') {
                nextErrors.isbn = 'ISBN ist erforderlich';
            }
        }

        if (isCreate || isUpdate) {
            if (form.titel.trim() === '') {
                nextErrors.titel = 'Titel ist erforderlich';
            }
            if (form.rating.trim() !== '') {
                const ratingNum = Number(form.rating);
                if (Number.isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
                    nextErrors.rating = 'Rating zwischen 0 und 5 angeben';
                }
            }
            if (form.preis.trim() !== '') {
                const preisNum = Number(form.preis);
                if (Number.isNaN(preisNum) || preisNum < 0) {
                    nextErrors.preis = 'Preis muss eine Zahl >= 0 sein';
                }
            }
        }
        if (isCreate && form.isbn.trim() === '') {
            nextErrors.isbn = 'ISBN ist erforderlich';
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (action: () => void) => {
        if (!validate()) {
            return;
        }
        action();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {isCreate ? 'Buch anlegen' : isUpdate ? 'Buch ändern' : 'Buch löschen'}
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    {isUpdate && (
                        <TextField
                            label="ID"
                            value={form.id}
                            error={Boolean(errors.id)}
                            helperText={errors.id}
                            onChange={(e) => setField('id', e.target.value)}
                        />
                    )}
                    {isDelete && (
                        <TextField
                            label="ISBN"
                            value={form.isbn}
                            error={Boolean(errors.isbn)}
                            helperText={errors.isbn}
                            onChange={(e) => setField('isbn', e.target.value)}
                        />
                    )}
                    {(isCreate || isUpdate) && (
                        <>
                            <TextField
                                label="Titel"
                                value={form.titel}
                                error={Boolean(errors.titel)}
                                helperText={errors.titel}
                                onChange={(e) => setField('titel', e.target.value)}
                            />
                            <TextField
                                label="Untertitel"
                                value={form.untertitel}
                                onChange={(e) => setField('untertitel', e.target.value)}
                            />
                            <TextField
                                label="ISBN"
                                value={form.isbn}
                                error={Boolean(errors.isbn)}
                                helperText={errors.isbn}
                                onChange={(e) => setField('isbn', e.target.value)}
                            />
                            <TextField
                                label="Rating"
                                value={form.rating}
                                error={Boolean(errors.rating)}
                                helperText={errors.rating}
                                onChange={(e) => setField('rating', e.target.value)}
                            />
                            <TextField
                                label="Preis"
                                value={form.preis}
                                error={Boolean(errors.preis)}
                                helperText={errors.preis}
                                onChange={(e) => setField('preis', e.target.value)}
                            />
                            <Stack spacing={1}>
                                <FormControlLabel
                                    label="Schlagwörter"
                                    control={<span />}
                                    sx={{ pointerEvents: 'none', userSelect: 'none', ml: 0 }}
                                />
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {TAG_OPTIONS.map((tag) => {
                                        const checked = form.schlagwoerter.includes(tag);
                                        return (
                                    <FormControlLabel
                                        key={tag}
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={() =>
                                                            onChange((prev) => {
                                                                const exists = prev.schlagwoerter.includes(tag);
                                                                const nextTags = exists
                                                                    ? prev.schlagwoerter.filter((t) => t !== tag)
                                                                    : [...prev.schlagwoerter, tag];
                                                                return {
                                                                    ...prev,
                                                                    schlagwoerter: nextTags,
                                                                };
                                                            })
                                                        }
                                                    />
                                                }
                                                label={tag}
                                            />
                                        );
                                    })}
                                </Stack>
                            </Stack>
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
                                    onChange={(e) => setField('version', e.target.value)}
                                />
                            )}
                        </>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Schließen</Button>
                {isCreate && (
                    <Button
                        variant="contained"
                        onClick={() => handleSubmit(onCreate)}
                    >
                        Anlegen
                    </Button>
                )}
                {isUpdate && (
                    <Button
                        variant="contained"
                        onClick={() => handleSubmit(onUpdate)}
                    >
                        Ändern
                    </Button>
                )}
                {isDelete && (
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleSubmit(onDelete)}
                    >
                        Löschen
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
