import Draggable from "react-draggable";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import useOrientation from "@features/dashboard/parameters/orientation/hooks/useOrientation";
import Form from "@features/dashboard/parameters/orientation/form";
import { Close, ExpandArrowsAlt } from "@icons";
import { StyledDialog, Header, Title, Actions, Body, Footer } from "./styles";

const PaperComponent = (props) => {
    const { stateCreate } = useOrientation();

    if (stateCreate.fullscreen) {
        return <Paper {...props} />;
    }
    
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
};

const Update = () => {
    const { stateUpdate, handleCloseDialog, handleFullscreenDialog, updateOrientation } =
        useOrientation();

    return (
        <StyledDialog
            onClose={handleCloseDialog}
            open={stateUpdate.open}
            fullScreen={stateUpdate.fullscreen}
            PaperComponent={PaperComponent}
        >
            <Header id="draggable-dialog-title" fullScreen={stateUpdate.fullscreen}>
                <Title>Actualizar orientación</Title>
                <Actions>
                    <Tooltip title="Pantalla completa">
                        <IconButton size="large" onClick={handleFullscreenDialog}>
                            <ExpandArrowsAlt />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Cerrar">
                        <IconButton size="large" onClick={handleCloseDialog}>
                            <Close />
                        </IconButton>
                    </Tooltip>
                </Actions>
            </Header>

            <Body>
                <Form />
            </Body>

            <Footer>
                <Button variant="outlined" onClick={handleCloseDialog}>
                    Cancelar
                </Button>

                <LoadingButton
                    variant="contained"
                    onClick={updateOrientation}
                    loading={stateUpdate.loading}
                >
                    Actualizar
                </LoadingButton>
            </Footer>
        </StyledDialog>
    );
};

export default Update;
