import Draggable from "react-draggable";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import useProtections from "@features/dashboard/installation/protections/hooks/useProtections";
import Form from "@features/dashboard/installation/protections/form";
import { Close, ExpandArrowsAlt } from "@icons";
import { StyledDialog, Header, Title, Actions, Body, Footer } from "./styles";

const PaperComponent = (props) => {
    const { stateCreate } = useProtections();

    if (stateCreate.fullscreen) {
        return <Paper {...props} />;
    }

    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"], .button'}
        >
            <Paper {...props} />
        </Draggable>
    );
};

const Create = () => {
    const { stateCreate, handleCloseDialog, handleFullscreenDialog, createProtection } =
        useProtections();

    return (
        <StyledDialog
            onClose={handleCloseDialog}
            open={stateCreate.open}
            fullScreen={stateCreate.fullscreen}
            PaperComponent={PaperComponent}
        >
            <Header id="draggable-dialog-title" fullScreen={stateCreate.fullscreen}>
                <Title>Crear protección</Title>
                <Actions>
                    <Tooltip title="Pantalla completa">
                        <IconButton
                            size="large"
                            className="button"
                            onClick={handleFullscreenDialog}
                        >
                            <ExpandArrowsAlt />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Cerrar">
                        <IconButton size="large" className="button" onClick={handleCloseDialog}>
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
                    onClick={createProtection}
                    loading={stateCreate.loading}
                >
                    Crear
                </LoadingButton>
            </Footer>
        </StyledDialog>
    );
};

export default Create;
