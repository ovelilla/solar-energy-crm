import Draggable from "react-draggable";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import useBatteries from "@features/dashboard/products/batteries/hooks/useBatteries";
import Form from "@features/dashboard/products/batteries/form";
import { Close, ExpandArrowsAlt } from "@icons";
import { StyledDialog, Header, Title, Actions, Body, Footer } from "./styles";

const PaperComponent = (props) => {
    const { stateCreate } = useBatteries();

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
    const { stateCreate, handleCloseDialog, handleFullscreenDialog, createBattery } =
        useBatteries();

    return (
        <StyledDialog
            onClose={handleCloseDialog}
            open={stateCreate.open}
            fullScreen={stateCreate.fullscreen}
            PaperComponent={PaperComponent}
        >
            <Header id="draggable-dialog-title" fullScreen={stateCreate.fullscreen}>
                <Title>Crear batería</Title>
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
                    onClick={createBattery}
                    loading={stateCreate.loading}
                >
                    Crear
                </LoadingButton>
            </Footer>
        </StyledDialog>
    );
};

export default Create;