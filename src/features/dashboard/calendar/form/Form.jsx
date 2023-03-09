import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import { StyledForm, ResponsiveRow, Color } from "./styles";

const Form = () => {
    const {
        stateCalendar,
        stateLabel,
        valuesEvent,
        errorsEvent,
        setValueEvent,
        handleChangeEvent,
    } = useCalendar();

    const usedLabels = stateCalendar.events.reduce((labels, event) => {
        if (event.labelId && !labels.includes(event.labelId)) {
            return [...labels, event.labelId];
        } else {
            return labels;
        }
    }, []);

    return (
        <StyledForm>
            <TextField
                label="Título"
                name="title"
                type="text"
                value={valuesEvent.title}
                error={errorsEvent.title.length > 0}
                helperText={errorsEvent.title}
                onChange={handleChangeEvent}
            />

            <ResponsiveRow>
                <DateTimePicker
                    renderInput={(props) => <TextField sx={{ flexGrow: 1 }} {...props} />}
                    label="Inicio"
                    name="start"
                    value={valuesEvent.start}
                    onChange={(newValue) => {
                        setValueEvent("start", newValue);
                    }}
                    hideTabs={false}
                    showToolbar={false}
                    DialogProps={{
                        BackdropProps: {
                            style: {
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                            },
                        },
                        PaperProps: {
                            style: {
                                margin: "0px",
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                borderRadius: "8px",
                            },
                        },
                    }}
                    PaperProps={{
                        style: {
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            borderRadius: "8px",
                        },
                    }}
                />

                <DateTimePicker
                    renderInput={(props) => <TextField sx={{ flexGrow: 1 }} {...props} />}
                    label="Fin"
                    name="end"
                    value={valuesEvent.end}
                    onChange={(newValue) => {
                        setValueEvent("end", newValue);
                    }}
                    hideTabs={false}
                    showToolbar={false}
                    DialogProps={{
                        BackdropProps: {
                            style: {
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                            },
                        },
                        PaperProps: {
                            style: {
                                margin: "0px",
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                borderRadius: "8px",
                            },
                        },
                    }}
                    PaperProps={{
                        style: {
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            borderRadius: "8px",
                        },
                    }}
                />
            </ResponsiveRow>

            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            name="allDay"
                            checked={valuesEvent.allDay}
                            onChange={(e) => {
                                setValueEvent("allDay", e.target.checked);
                            }}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    }
                    label="Todo el día"
                />
            </FormGroup>

            <FormControl error={errorsEvent.labelId.length > 0}>
                <InputLabel id="labelId-label">Etiqueta</InputLabel>
                <Select
                    labelId="labelId-label"
                    name="labelId"
                    value={valuesEvent.labelId}
                    label="Etiqueta"
                    onChange={handleChangeEvent}
                >
                    {stateLabel.labels.map((label) => {
                        if (
                            (label.isSpecial && usedLabels.includes(label._id)) ||
                            !label.isSpecial
                        ) {
                            return (
                                <MenuItem key={label._id} value={label._id}>
                                    <Color color={label.color} />
                                    <span>{label.name}</span>
                                </MenuItem>
                            );
                        }
                    })}
                </Select>
                {errorsEvent.labelId.length > 0 && (
                    <FormHelperText>{errorsEvent.labelId}</FormHelperText>
                )}
            </FormControl>

            <TextField
                label="Descripción"
                name="description"
                type="text"
                value={valuesEvent.description}
                error={errorsEvent.description.length > 0}
                helperText={errorsEvent.description}
                onChange={handleChangeEvent}
                multiline
                rows={4}
                InputProps={{
                    style: {
                        padding: 0,
                    },
                }}
            />
        </StyledForm>
    );
};

export default Form;
