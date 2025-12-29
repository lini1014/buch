import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';

type Props = {
    username?: string | null;
    onLogout: () => void;
};

export function UserMenu({}: Props) {
    return (
        <IconButton
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
    );
}
