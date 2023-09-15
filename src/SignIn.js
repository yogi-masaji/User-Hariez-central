import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
// @mui
import {
    Stack,
    IconButton,
    InputAdornment,
    TextField,
    Checkbox,
    Alert,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import withRoot from "./modules/withRoot";

// ----------------------------------------------------------------------

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 2000);
        }
    }, [isSuccess, navigate]);

    const handleClick = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setIsError(true);
            setErrorMessage("Please enter both email and password.");
            return;
        }

        setIsLoading(true);

        axios
            .post("http://127.0.0.1:3000/user/login", {
                email,
                password,
            })
            .then((response) => {
                console.log(response.data);
                Cookies.set("token", response.data.token, {
                    sameSite: "strict",
                    secure: true,
                    expires: 1,
                });
                Cookies.set("data", JSON.stringify(response.data.user), {
                    sameSite: "strict",
                    secure: true,
                    expires: 1,
                });
                setIsSuccess(true);
                setIsError(false);
                setErrorMessage("");
            })
            .catch((error) => {
                console.log(error);
                setIsError(true);
                setIsSuccess(false);
                setIsLoading(false);
                if (error.response?.data?.message === "wrong email/password") {
                    setErrorMessage(error.response.data.message);
                } else {
                    console.log(error);
                }
            });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (isError) {
            setIsError(false);
            setErrorMessage("");
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (isError) {
            setIsError(false);
            setErrorMessage("");
        }
    };

    return (
        <>
            <AppAppBar />
            <AppForm>
                <Stack spacing={3} sx={{ my: 5 }}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        marked="center"
                        align="center"
                    >
                        Sign In
                    </Typography>
                    <TextField
                        name="email"
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    {isError && (
                        <Alert
                            severity="error"
                            onClose={() => setIsError(false)}
                            sx={{
                                backgroundColor: "#f44336", // Custom background color
                                color: "#ffffff", // Custom text color
                                borderRadius: "8px", // Custom border radius
                                marginTop: "16px", // Custom margin top
                            }}
                        >
                            {errorMessage}
                        </Alert>
                    )}

                    <Typography>
                        Don&apos;t have an account?&nbsp;
                        <Link to="/sign-up">Register</Link>
                    </Typography>
                </Stack>

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleClick}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    {isLoading ? "Logging In..." : "Login"}
                </LoadingButton>
            </AppForm>
            <AppFooter />
        </>
    );
}

export default withRoot(SignIn);
