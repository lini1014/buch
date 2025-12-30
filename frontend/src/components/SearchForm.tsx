import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import type { TagState } from '../lib/useBookSearch';

type Props = {
    query: string;
    art: string | undefined;
    lieferbarOnly: boolean;
    tags: TagState;
    loading: boolean;
    onQueryChange: (value: string) => void;
    onArtChange: (value: string | undefined) => void;
    onLieferbarChange: (value: boolean) => void;
    onTagToggle: (tag: keyof TagState, checked: boolean) => void;
    onReset: () => void;
    onSearch: () => void;
};

export function SearchForm({
    query,
    art,
    lieferbarOnly,
    tags,
    loading,
    onQueryChange,
    onArtChange,
    onLieferbarChange,
    onTagToggle,
    onReset,
    onSearch,
}: Props) {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onSearch();
            }}
        >
            <Stack spacing={2.5}>
                <TextField
                    fullWidth
                    placeholder="Titel oder Stichwort"
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    InputProps={{
                        startAdornment: (
                            <SearchRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                        ),
                    }}
                    disabled={loading}
                />

                <FormControl fullWidth>
                    <InputLabel id="art-label">Art</InputLabel>
                    <Select
                        labelId="art-label"
                        label="Art"
                        value={art ?? ''}
                        onChange={(event) => onArtChange(event.target.value || undefined)}
                    >
                        <MenuItem value="">
                            <em>Beliebig</em>
                        </MenuItem>
                        <MenuItem value="EPUB">EPUB</MenuItem>
                        <MenuItem value="HARDCOVER">Hardcover</MenuItem>
                        <MenuItem value="PAPERBACK">Paperback</MenuItem>
                    </Select>
                </FormControl>

                <FormControlLabel
                    control={
                        <Switch
                            checked={Boolean(lieferbarOnly)}
                            onChange={(event) => onLieferbarChange(event.target.checked)}
                        />
                    }
                    label="Nur lieferbar"
                />

                <FormControl component="fieldset">
                    <FormLabel component="legend">Technologien</FormLabel>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} flexWrap="wrap">
                        {(['javascript', 'typescript', 'java', 'python'] as const).map((tag) => (
                            <FormControlLabel
                                key={tag}
                                control={
                                    <Checkbox
                                        checked={tags[tag]}
                                        onChange={(event) =>
                                            onTagToggle(tag, event.target.checked)
                                        }
                                    />
                                }
                                label={tag}
                            />
                        ))}
                    </Stack>
                </FormControl>

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={onReset} disabled={loading}>
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SearchRoundedIcon />}
                        disabled={loading}
                    >
                        Suchen
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
}
