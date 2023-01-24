import { IconButton } from "@mui/material";
import { Container, Adornment, Input } from "./styles";
import { Close, Search as SearchIcon } from "@icons";
import { useHeader } from "@hooks";

const Search = ({ setOpenSearch }) => {
    const { search, setSearch } = useHeader();

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleClick = () => {
        setOpenSearch(false);
        setSearch("");
    };

    return (
        <Container>
            <Adornment>
                <SearchIcon />
            </Adornment>

            <Input
                type="text"
                placeholder="Buscar"
                autoFocus
                value={search}
                onChange={handleChange}
            />

            <IconButton size="large" onClick={handleClick}>
                <Close />
            </IconButton>
        </Container>
    );
};

export default Search;
