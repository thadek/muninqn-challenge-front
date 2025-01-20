import {  Container, Typography, Stack } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

const LoginRequired = () => {
    const navigate = useNavigate();

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                textAlign: "center",
            }}
        >
            <Stack spacing={3} alignItems="center">
                <LockOutlined sx={{ fontSize: 80, color: "error.main" }} />
                <Typography variant="h5" color="error">
                    Es necesario iniciar sesión
                </Typography>
                <Typography variant="body1">
                    Para acceder a esta sección, debes iniciar sesión con tu cuenta.
                </Typography>
                <Button
                    size="lg"
                    color="primary"
                    onClick={() => navigate("/login")}
                >
                    Iniciar sesión
                </Button>
            </Stack>
        </Container>
    );
};

export default LoginRequired;
