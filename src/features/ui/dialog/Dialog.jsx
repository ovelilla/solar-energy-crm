import { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { CSSTransition } from "react-transition-group";
import { Rnd } from "react-rnd";
import useUI from "@hooks/useUI";
import useWindowSize from "@hooks/useWindowSize";
import { Close, ExpandArrowsAlt } from "@icons";
import { Overlay, Container, Header, Title, Actions, Body, Footer } from "./styles";

const Dialog = ({ children, state, setState, title, action, onClick, onClose, onExited }) => {
    const [isRnd, setIsRnd] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [savedPosition, setSavedPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: "auto", height: "auto" });
    const [savedSize, setSavedSize] = useState({ width: "auto", height: "auto" });

    const overlayRef = useRef(null);
    const containerRef = useRef(null);

    const { question } = useUI();
    const { width, height } = useWindowSize();

    useEffect(() => {
        if (state.open) {
            const rect = containerRef.current.getBoundingClientRect();
            setPosition({
                x: state.fullscreen ? 0 : window.innerWidth / 2 - rect.width / 2,
                y: state.fullscreen ? 0 : window.innerHeight / 2 - rect.height / 2,
            });
            const width = window.innerWidth - 32 > 640 ? 640 : window.innerWidth - 32;
            setSize({ width: width, height: "auto" });
        }
    }, [width, height]);

    const handleClickOverlay = (e) => {
        if (isRnd) {
            setIsRnd(false);
        }
        if (e.target === e.currentTarget && !isRnd) {
            handleClose();
        }
    };

    const handleClose = async () => {
        const confirm = await question({
            title: "¿Cerrar ventana?",
            message:
                "¿Estás seguro de que deseas cerrar? Los datos que no hayan sido guardados se perderán.",
            confirm: "Cerrar",
            cancel: "Cancelar",
            action: null,
        });
        if (!confirm) {
            return;
        }
        setState({ ...state, open: false });
        if (onClose) {
            onClose();
        }
    };

    const handleEnter = () => {
        if (window.innerWidth < 480) {
            setState({ ...state, fullscreen: true });
            setSize({ width: "100%", height: "100%" });
            return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const width = window.innerWidth - 32 > 640 ? 640 : window.innerWidth - 32;
        setPosition({
            x: window.innerWidth / 2 - width / 2,
            y: window.innerHeight / 2 - rect.height / 2,
        });
        setSize({ width: width, height: "auto" });
    };

    const handleExited = () => {
        setPosition({ x: 0, y: 0 });
        setSize({ width: "auto", height: "auto" });
        setState({ ...state, fullscreen: false, loading: false });
        if (onExited) {
            onExited();
        }
    };

    const handleFullscreen = () => {
        setState({ ...state, fullscreen: !state.fullscreen });
        setSavedPosition({ x: position.x, y: position.y });
        setSavedSize({ width: size.width, height: size.height });

        if (state.fullscreen) {
            setPosition({
                x: savedPosition.x,
                y: savedPosition.y,
            });
            setSize({ width: savedSize.width, height: savedSize.height });
        } else {
            setPosition({ x: 0, y: 0 });
            setSize({ width: "100%", height: "100%" });
        }
    };

    const handleClickAction = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <CSSTransition
            nodeRef={overlayRef}
            in={state.open}
            timeout={300}
            classNames={"dialog"}
            mountOnEnter={true}
            unmountOnExit={true}
            onEnter={handleEnter}
            onExited={handleExited}
        >
            <Overlay ref={overlayRef} fullscreen={state.fullscreen} onClick={handleClickOverlay}>
                <CSSTransition
                    nodeRef={containerRef}
                    in={state.open}
                    timeout={300}
                    classNames={"dialog"}
                    appear={true}
                >
                    <Rnd
                        position={position}
                        size={size}
                        minWidth={320}
                        minHeight={240}
                        dragHandleClassName={"drag-handle"}
                        cancel=".cancel"
                        resizeHandleStyles={{
                            top: { cursor: "ns-resize" },
                            right: { cursor: "ew-resize" },
                            bottom: { cursor: "ns-resize" },
                            left: { cursor: "ew-resize" },
                        }}
                        disableDragging={state.fullscreen}
                        enableResizing={{
                            top: !state.fullscreen,
                            right: !state.fullscreen,
                            bottom: !state.fullscreen,
                            left: !state.fullscreen,
                            topRight: !state.fullscreen,
                            bottomRight: !state.fullscreen,
                            bottomLeft: !state.fullscreen,
                            topLeft: !state.fullscreen,
                        }}
                        onDragStart={() => setIsRnd(true)}
                        onDragStop={(e, d) => {
                            setPosition({ x: d.x, y: d.y });
                        }}
                        onResizeStart={() => setIsRnd(true)}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            setPosition({ x: position.x, y: position.y });
                            setSize({
                                width: ref.style.width,
                                height: ref.style.height,
                            });
                        }}
                    >
                        <Container ref={containerRef} fullscreen={state.fullscreen}>
                            <Header className={"drag-handle"} fullscreen={state.fullscreen}>
                                <Title>{title}</Title>
                                <Actions>
                                    <Tooltip title="Pantalla completa">
                                        <IconButton
                                            size="large"
                                            className="cancel"
                                            onClick={handleFullscreen}
                                        >
                                            <ExpandArrowsAlt />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Cerrar">
                                        <IconButton
                                            size="large"
                                            className="cancel"
                                            onClick={handleClose}
                                        >
                                            <Close />
                                        </IconButton>
                                    </Tooltip>
                                </Actions>
                            </Header>

                            <Body>{children}</Body>

                            <Footer>
                                <Button variant="outlined" onClick={handleClose}>
                                    Cancelar
                                </Button>

                                <LoadingButton
                                    variant="contained"
                                    onClick={handleClickAction}
                                    loading={state.loading}
                                >
                                    {action}
                                </LoadingButton>
                            </Footer>
                        </Container>
                    </Rnd>
                </CSSTransition>
            </Overlay>
        </CSSTransition>
    );
};

export default Dialog;
