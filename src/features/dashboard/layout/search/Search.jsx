import { IconButton } from "@mui/material";
import { Container, Adornment, Input } from "./styles";
import { Close, Search as SearchIcon } from "@icons";

const Search = ({ setOpenSearch }) => {
    return (
        <Container>
            <Adornment>
                <SearchIcon />
            </Adornment>

            <Input type="text" placeholder="Buscar" />

            <IconButton size="large" onClick={() => setOpenSearch(false)}>
                <Close />
            </IconButton>
        </Container>
    );
};

export default Search;
