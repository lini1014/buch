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
                    checked={isLight}
                    onChange={(e) => onToggle(e.target.checked)}
                />
            }
            label="Theme"
        />
    );
}
