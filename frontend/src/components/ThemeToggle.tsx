import { FormControlLabel, Switch } from '@mui/material';

type Props = {
    isLight: boolean;
    onToggle: (value: boolean) => void;
};

export function ThemeToggle({ isLight, onToggle }: Props) {
    return <FormControlLabel control={<Switch />} label="Theme" />;
}
