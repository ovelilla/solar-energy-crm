import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Plus } from "@icons";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import Menu from "@features/dashboard/calendar/labels/menu";
import { Container, Title, LabelsContainer, Label, LabelName } from "./styles";

const Labels = () => {
    const [stateMenu, setStateMenu] = useState({ open: false, anchor: null });

    const {
        stateCalendar,
        stateDialogCreateLabel,
        setStateDialogCreateLabel,
        stateLabel,
        setStateLabel,
        resetFormLabel,
        updateLabelEnabled,
    } = useCalendar();

    const handleOpenMenu = (e, label) => {
        setStateLabel({ ...stateLabel, label });
        setStateMenu({ open: true, anchor: e.currentTarget });
    };

    const handleCreateLabel = () => {
        resetFormLabel();
        setStateDialogCreateLabel({ ...stateDialogCreateLabel, open: true });
    };

    const handleChangeCheckbox = (e, label) => {
        const { checked } = e.target;
        updateLabelEnabled(label._id, checked);
    };

    const usedLabels = stateCalendar.events.reduce((labels, event) => {
        if (event.labelId && !labels.includes(event.labelId)) {
            return [...labels, event.labelId];
        } else {
            return labels;
        }
    }, []);

    return (
        <Container>
            <Title>
                <span>Etiquetas</span>
                <Tooltip title="Crear">
                    <IconButton size="large" onClick={handleCreateLabel}>
                        <Plus />
                    </IconButton>
                </Tooltip>
            </Title>
            <LabelsContainer>
                {stateLabel.loading ? (
                    <div>Cargando...</div>
                ) : (
                    stateLabel.labels.map((label) => {
                        if (
                            (label.isSpecial && usedLabels.includes(label._id)) ||
                            !label.isSpecial
                        ) {
                            return (
                                <Label key={label._id}>
                                    <FormControlLabel
                                        sx={{
                                            overflow: "hidden",
                                            ".MuiTypography-root": {
                                                overflow: "hidden",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                            },
                                        }}
                                        control={
                                            <Checkbox
                                                checked={label.isEnabled}
                                                onChange={(e) => handleChangeCheckbox(e, label)}
                                                sx={{
                                                    color: label.color,
                                                    "&.Mui-checked": {
                                                        color: label.color,
                                                    },
                                                }}
                                            />
                                        }
                                        label={<LabelName>{label.name}</LabelName>}
                                    />
                                    {!label.isSpecial && (
                                        <Tooltip title="Abrir menú">
                                            <IconButton
                                                size="large"
                                                onClick={(e) => handleOpenMenu(e, label)}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Label>
                            );
                        }
                    })
                )}
            </LabelsContainer>

            <Menu stateMenu={stateMenu} setStateMenu={setStateMenu} />
        </Container>
    );
};

export default Labels;
