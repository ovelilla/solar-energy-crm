import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Close } from "@icons";
import { StyledConfirm, Header, Title, Body, Footer } from "./styles";
import useUI from "@hooks/useUI";

const Confirm = () => {
    const { stateConfirm, handleClickConfirm } = useUI();

    return (
        <StyledConfirm onClose={() => handleClickConfirm(false)} open={stateConfirm.open}>
            <Header>
                <Title>{stateConfirm.title}</Title>

                <Tooltip title="Cerrar">
                    <IconButton size="large" onClick={() => handleClickConfirm(false)}>
                        <Close />
                    </IconButton>
                </Tooltip>
            </Header>

            <Body>
                <p>{stateConfirm.message}</p>
            </Body>

            <Footer>
                <Button variant="outlined" onClick={() => handleClickConfirm(false)}>
                    {stateConfirm.cancel}
                </Button>

                <Button variant="contained" onClick={() => handleClickConfirm(true)}>
                    {stateConfirm.confirm}
                </Button>
            </Footer>
        </StyledConfirm>
    );
};

export default Confirm;
