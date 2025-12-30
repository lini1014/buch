import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Stack, TextField } from '@mui/material';

type Props = {
    query: string;
    loading: boolean;
    onQueryChange: (value: string) => void;
    onSearch: () => void;
};

export function SearchForm({ query, loading, onQueryChange, onSearch }: Props) {
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
            </Stack>
        </form>
    );
}
