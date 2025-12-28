import { useCallback, useState } from 'react';
import { bookApi } from './api';

export type AdminMode = 'create' | 'update' | 'delete' | null;

export type AdminForm = {
    id: string;
    titel: string;
    untertitel: string;
    isbn: string;
    rating: string;
    preis: string;
    art: string;
    lieferbar: boolean;
    version: string;
};

const defaultForm: AdminForm = {
    id: '',
    titel: '',
    untertitel: '',
    isbn: '',
    rating: '',
    preis: '',
    art: '',
    lieferbar: false,
    version: '',
};

export function useAdminActions(token: string | undefined, loadBooks: () => Promise<void>) {
    const [adminForm, setAdminForm] = useState<AdminForm>(defaultForm);
    const [adminInfo, setAdminInfo] = useState<string | undefined>(undefined);
    const [adminError, setAdminError] = useState<string | undefined>(undefined);
    const [adminMode, setAdminMode] = useState<AdminMode>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const adminPayload = useCallback(() => {
        const payload: Record<string, unknown> = {};

        if (adminForm.isbn.trim() !== '') {
            payload.isbn = adminForm.isbn.trim();
        }
        if (adminForm.rating.trim() !== '') {
            const ratingNum = Number(adminForm.rating);
            if (!Number.isNaN(ratingNum)) {
                payload.rating = ratingNum;
            }
        }
        if (adminForm.art) {
            payload.art = adminForm.art;
        }
        if (adminForm.preis.trim() !== '') {
            const preisNum = Number(adminForm.preis);
            if (!Number.isNaN(preisNum)) {
                payload.preis = preisNum;
            }
        }
        payload.lieferbar = adminForm.lieferbar;

        const titelObj: Record<string, string> = {};
        if (adminForm.titel.trim() !== '') {
            titelObj.titel = adminForm.titel.trim();
        }
        if (adminForm.untertitel.trim() !== '') {
            titelObj.untertitel = adminForm.untertitel.trim();
        }
        if (Object.keys(titelObj).length > 0) {
            payload.titel = titelObj;
        }

        return payload;
    }, [adminForm]);

    const handleCreate = useCallback(async () => {
        setAdminError(undefined);
        setAdminInfo(undefined);
        if (!token) {
            setAdminError('Kein Token vorhanden.');
            return;
        }
        try {
            const created = await bookApi.create(adminPayload(), token);
            if (created && (created as { id?: string | number }).id !== undefined) {
                setAdminInfo(`Buch ${(created as { id: string | number }).id} angelegt.`);
            } else {
                setAdminInfo('Buch angelegt.');
            }
            await loadBooks();
        } catch (err) {
            setAdminError(err instanceof Error ? err.message : 'Anlegen fehlgeschlagen');
        }
    }, [adminPayload, loadBooks, token]);

    const handleUpdate = useCallback(async () => {
        setAdminError(undefined);
        setAdminInfo(undefined);
        const idNum = Number(adminForm.id);
        if (!Number.isInteger(idNum)) {
            setAdminError('Gültige ID für Update angeben.');
            return;
        }
        const versionHeader =
            adminForm.version.trim().length > 0 ? adminForm.version.trim() : undefined;
        if (!token) {
            setAdminError('Kein Token vorhanden.');
            return;
        }
        try {
            await bookApi.update(idNum, adminPayload(), token, versionHeader);
            setAdminInfo(`Buch ${idNum} aktualisiert.`);
            await loadBooks();
        } catch (err) {
            setAdminError(
                err instanceof Error ? err.message : 'Aktualisieren fehlgeschlagen',
            );
        }
    }, [adminForm.id, adminForm.version, adminPayload, loadBooks, token]);

    const handleDelete = useCallback(async () => {
        setAdminError(undefined);
        setAdminInfo(undefined);
        const idNum = Number(adminForm.id);
        if (!Number.isInteger(idNum)) {
            setAdminError('Gültige ID für Löschung angeben.');
            return;
        }
        if (!token) {
            setAdminError('Kein Token vorhanden.');
            return;
        }
        try {
            await bookApi.remove(idNum, token);
            setAdminInfo(`Buch ${idNum} gelöscht.`);
            await loadBooks();
        } catch (err) {
            setAdminError(err instanceof Error ? err.message : 'Löschen fehlgeschlagen');
        }
    }, [adminForm.id, loadBooks, token]);

    const resetMessages = useCallback(() => {
        setAdminError(undefined);
        setAdminInfo(undefined);
    }, []);

    const closeDialog = useCallback(() => {
        setDialogOpen(false);
        resetMessages();
    }, [resetMessages]);

    const openDialog = useCallback((mode: AdminMode) => {
        setAdminMode(mode);
        setDialogOpen(true);
        resetMessages();
    }, [resetMessages]);

    return {
        adminForm,
        setAdminForm,
        adminInfo,
        adminError,
        adminMode,
        dialogOpen,
        setDialogOpen,
        setAdminMode,
        handleCreate,
        handleUpdate,
        handleDelete,
        openDialog,
        closeDialog,
        resetMessages,
    };
}
