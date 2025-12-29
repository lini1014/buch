import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton, Menu } from '@mui/material';
import { useState } from 'react';

type Props = {
    username?: string | null;
    onLogout: () => void;
};

export function UserMenu({}: Props) {
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    return (
        <>
            <IconButton
                onClick={(event) => setMenuAnchor(event.currentTarget)}
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: '#d32f2f',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
                }}
            >
                <MenuRoundedIcon />
            </IconButton>

            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
        </>
    );
}
