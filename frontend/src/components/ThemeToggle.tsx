import { FormControlLabel, Switch } from '@mui/material';

type Props = {
    isLight: boolean;
    onToggle: (value: boolean) => void;
};

export function ThemeToggle({ isLight, onToggle }: Props) {
    return (
        <FormControlLabel
            control={
                <Switch
                    key="theme-toggle"
                    checked={isLight}
                    onChange={(e) => onToggle(e.target.checked)}
                />
            }
            label={isLight ? 'Light' : 'Dark'}
            sx={{
                color: isLight ? '#333' : '#c7c7c7',
            }}
        />
    );
}
