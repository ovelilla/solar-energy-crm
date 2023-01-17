import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@hooks";
import { useAuth } from "@features/auth/hooks";
import {
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    InputAdornment,
    IconButton,
    Typography,
} from "@mui/material";
import { Header, Icon, Title, Body, Form } from "./styles";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

const AuthLayout = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { values, errors, setValues, setErrors, handleChange } = useForm({
        email: "",
        password: "",
    });
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!values.email) {
            errors.email = "El email es obligatorio";
        }

        if (!values.password) {
            errors.password = "La contraseña es obligatoria";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        login();
        navigate("/");
    };

    return (
        <>
            <Header>
                <Icon>
                    <LockOutlined />
                </Icon>
                <Title>Iniciar sesión</Title>
            </Header>

            <Body>
                <Form onSubmit={handleSubmit}>
                    <TextField
                        name="email"
                        label="Email"
                        autoComplete="email"
                        type="email"
                        value={values.email}
                        error={errors.email.length > 0}
                        helperText={errors.email}
                        onChange={handleChange}
                        autoFocus
                        InputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        error={errors.password.length > 0}
                        helperText={errors.password}
                        onChange={handleChange}
                        InputProps={{
                            style: { fontSize: 16 },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                    />

                    <FormControlLabel
                        sx={{ gap: 1 }}
                        control={<Checkbox value="remember" color="primary" />}
                        label={<Typography sx={{ fontSize: 16 }}>Recordarme</Typography>}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        color="primary"
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        Iniciar sesión
                    </Button>
                </Form>
            </Body>
        </>
    );
};

export default AuthLayout;
