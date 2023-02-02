import { IconButton } from "@mui/material";
import { Container, Adornment, Input } from "./styles";
import { Close, Search as SearchIcon } from "@icons";
import { useHeader } from "@hooks";

const Search = () => {
    const { searchText, handleChangeSearchText, handleCloseSearch } = useHeader();

    return (
        <Container>
            <Adornment>
                <SearchIcon />
            </Adornment>

            <Input
                type="text"
                placeholder="Buscar"
                autoFocus
                value={searchText}
                onChange={handleChangeSearchText}
            />

            <IconButton size="large" onClick={handleCloseSearch}>
                <Close />
            </IconButton>
        </Container>
    );
};

export default Search;
