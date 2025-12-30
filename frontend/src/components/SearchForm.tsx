import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';

type Props = {
    query: string;
    art: string | undefined;
    lieferbarOnly: boolean;
    loading: boolean;
    onQueryChange: (value: string) => void;
    onArtChange: (value: string | undefined) => void;
    onLieferbarChange: (value: boolean) => void;
    onSearch: () => void;
};

export function SearchForm({
    query,
    art,
    lieferbarOnly,
    loading,
    onQueryChange,
    onArtChange,
    onLieferbarChange,
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
            </Stack>
        </form>
    );
}
