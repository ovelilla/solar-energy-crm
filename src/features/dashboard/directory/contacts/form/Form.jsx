import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import useContacts from "@features/dashboard/directory/contacts/hooks/useContacts";
import { FormStyled, Row } from "./styles";

const Form = () => {
    const { values, errors, handleChange } = useContacts();

    return (
        <FormStyled>
            <TextField
                label="Nombre"
                name="name"
                type="text"
                value={values.name}
                error={errors.name.length > 0}
                helperText={errors.name}
                onChange={handleChange}
            />

            <TextField
                label="Apellidos"
                name="surname"
                type="text"
                value={values.surname}
                error={errors.surname.length > 0}
                helperText={errors.surname}
                onChange={handleChange}
            />

            <TextField
                label="Email"
                name="email"
                type="text"
                value={values.email}
                error={errors.email.length > 0}
                helperText={errors.email}
                onChange={handleChange}
            />

            <TextField
                label="Teléfono"
                name="phone"
                type="text"
                value={values.phone}
                error={errors.phone.length > 0}
                helperText={errors.phone}
                onChange={handleChange}
            />
        </FormStyled>
    );
};

export default Form;
