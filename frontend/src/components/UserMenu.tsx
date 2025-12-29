import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { Box, Button, IconButton, Menu, Typography } from '@mui/material';
import { useState } from 'react';

type Props = {
    username?: string | null;
    onLogout: () => void;
};

export function UserMenu({ username, onLogout }: Props) {
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
                PaperProps={{
                    sx: { minWidth: 200, bgcolor: '#2d2d2d', color: '#f5f5f5' },
                }}
            >
                <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonOutlineRoundedIcon />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {username ?? 'Unbekannt'}
                    </Typography>
                </Box>

                <Button
                    fullWidth
                    onClick={() => {
                        setMenuAnchor(null);
                        onLogout();
                    }}
                    sx={{ justifyContent: 'flex-start', color: '#f5f5f5', px: 2 }}
                >
                    Log-out
                </Button>
            </Menu>
        </>
    );
}
