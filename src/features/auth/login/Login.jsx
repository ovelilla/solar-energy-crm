import { useState } from "react";
import {
    TextField,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    IconButton,
    Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import useAuth from "@features/auth/hooks/useAuth";
import { Header, Icon, Title, Body, Form } from "./styles";

const AuthLayout = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { loading, values, errors, handleChange, handleLogin } = useAuth();

    return (
        <>
            <Header>
                <Icon>
                    <LockOutlined />
                </Icon>
                <Title>Iniciar sesión</Title>
            </Header>

            <Body>
                <Form onSubmit={handleLogin} noValidate>
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

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        size="large"
                        color="primary"
                        fullWidth
                        sx={{ mt: 1 }}
                        loading={loading}
                    >
                        Iniciar sesión
                    </LoadingButton>
                </Form>
            </Body>
        </>
    );
};

export default AuthLayout;
