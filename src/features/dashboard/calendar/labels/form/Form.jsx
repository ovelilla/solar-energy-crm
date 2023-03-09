import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import Colorpicker from "@features/dashboard/calendar/labels/colorpicker";
import { Palette } from "@icons";
import { StyledForm, ColorIcon } from "./styles";

const Form = () => {
    const [stateMenu, setStateMenu] = useState({ open: false, anchor: null });

    const { valuesLabel, errorsLabel, handleChangeLabel } = useCalendar();

    const inputRef = useRef(null);

    const handleClick = (e) => {
        setStateMenu({ ...stateMenu, open: true, anchor: inputRef.current });
    };

    return (
        <StyledForm>
            <TextField
                label="Nombre"
                name="name"
                type="text"
                value={valuesLabel.name}
                error={errorsLabel.name.length > 0}
                helperText={errorsLabel.name}
                onChange={handleChangeLabel}
            />

            <TextField
                label="Descripción"
                name="description"
                type="text"
                value={valuesLabel.description}
                error={errorsLabel.description.length > 0}
                helperText={errorsLabel.description}
                onChange={handleChangeLabel}
                multiline
                rows={4}
                InputProps={{
                    style: {
                        padding: 0,
                    },
                }}
            />

            <TextField
                label="Color"
                name="color"
                type="text"
                ref={inputRef}
                value={valuesLabel.color}
                error={errorsLabel.color.length > 0}
                helperText={errorsLabel.color}
                onChange={handleChangeLabel}
                InputProps={{
                    disabled: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={handleClick}>
                                <ColorIcon color={valuesLabel.color} />
                            </IconButton>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClick}>
                                <Palette />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Colorpicker stateMenu={stateMenu} setStateMenu={setStateMenu} />
        </StyledForm>
    );
};

export default Form;
