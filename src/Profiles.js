import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Container,
    Stack,
    Typography,
    Card,
    Box,
    Avatar,
    TextField,
    Button,
    CircularProgress,
    Alert,
    InputAdornment,
    Grid,
} from "@mui/material";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";

function Profiles() {
    const [profile, setProfile] = useState("");
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [nomorTelepon, setNomorTelepon] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");
    const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
    const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = Cookies.get("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(
                "http://127.0.0.1:3000/user/details/info",
                { headers }
            );
            console.log(response.data);
            setProfile(response.data);
            setNama(response.data.nama);
            setEmail(response.data.email);
            setNomorTelepon(response.data.nomorTelepon);
        };

        fetchProfileData();
    }, []);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleNamaChange = (event) => {
        const value = event.target.value;
        setNama(value);
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    };

    const handleNomorTeleponChange = (event) => {
        const value = event.target.value;
        setNomorTelepon(value);
    };

    const updateProfile = () => {
        setUpdateProfileLoading(true); // Set loading state to true
        if (
            nama.trim() === "" ||
            email.trim() === "" ||
            nomorTelepon.trim() === ""
        ) {
            setErrorMessage("All fields are required.");
            setSuccessMessage("");
            setUpdateProfileLoading(false);
            setTimeout(() => {
                setErrorMessage("");
            }, 1000);
            return;
        }

        const token = Cookies.get("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const updatedProfile = {
            ...profile,
            nama,
            email,
            nomorTelepon,
        };

        axios
            .put(
                `http://127.0.0.1:3000/user/update/${profile.id}`,
                updatedProfile,
                { headers }
            )
            .then((response) => {
                console.log(response.data);
                setProfile(updatedProfile);
                setSuccessMessage("Profile updated successfully.");
                setTimeout(() => {
                    setErrorMessage("");
                    setSuccessMessage("");
                    setUpdateProfileLoading(false);
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage("Failed to update profile.");
                setSuccessMessage("");
                setUpdateProfileLoading(false);
            });
    };

    const updatePassword = () => {
        setUpdatePasswordLoading(true); // Set loading state to true

        if (password.trim() === "" || confirmPassword.trim() === "") {
            setPasswordErrorMessage(
                "Password and Confirm Password fields are required."
            );
            setPasswordSuccessMessage("");
            setUpdatePasswordLoading(false);
            setTimeout(() => {
                setPasswordErrorMessage("");
            }, 1000);
            return;
        }

        if (password !== confirmPassword) {
            setPasswordErrorMessage(
                "Password and Confirm Password fields must match."
            );
            setPasswordSuccessMessage("");
            setUpdatePasswordLoading(false);
            setTimeout(() => {
                setPasswordErrorMessage("");
            }, 1000);
            return;
        }
        if (password.length < 6) {
            setPasswordErrorMessage(
                "Password must be at least 6 characters long."
            );
            setPasswordSuccessMessage("");
            setUpdatePasswordLoading(false);
            setTimeout(() => {
                setPasswordErrorMessage("");
            }, 1000);
            return;
        }

        const token = Cookies.get("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const updatedPassword = {
            password,
        };

        axios
            .put(
                `http://127.0.0.1:3000/user/update/password/${profile.id}`,
                updatedPassword,
                { headers }
            )
            .then((response) => {
                console.log(response.data);
                setPasswordSuccessMessage("Password updated successfully.");
                setTimeout(() => {
                    setPasswordErrorMessage("");
                    setPasswordSuccessMessage("");
                    setUpdatePasswordLoading(false);
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
                setPasswordErrorMessage("Failed to update password.");
                setPasswordSuccessMessage("");
                setUpdatePasswordLoading(false);
            });
    };

    return (
        <div style={{ backgroundColor: "#F5F5F5" }}>
            <AppAppBar />
            <Container sx={{ mt: 5 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={2}
                            sx={{
                                p: {
                                    xs: 3,
                                    sm: 0,
                                },
                            }}
                        >
                            <Typography variant="h4" gutterBottom>
                                Profile
                            </Typography>
                        </Stack>
                        <Card
                            sx={{
                                mb: 5,
                                marginRight: 5,
                                marginLeft: { xs: 5, sm: 0 },
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Box sx={{ p: 5, display: "flex" }}>
                                <Avatar
                                    sx={{
                                        backgroundColor: "#808080",
                                        color: "#ffffff",
                                        mr: 2,
                                    }}
                                >
                                    {profile.nama?.charAt(0)}
                                </Avatar>
                                <Stack spacing={1}>
                                    <Typography fontWeight={700}>
                                        {profile.nama}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {profile.email}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {profile.nomorTelepon}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={2}
                            sx={{
                                p: {
                                    xs: 3,
                                    sm: 0,
                                },
                            }}
                        >
                            <Typography variant="h4" gutterBottom>
                                Edit Profile
                            </Typography>
                        </Stack>
                        <Card
                            sx={{
                                mb: 5,
                                marginRight: { xs: 3, sm: 0 },
                                marginLeft: { xs: 3, sm: 0 },
                            }}
                        >
                            <Box sx={{ p: 5, display: "flex" }}>
                                <Stack spacing={1}>
                                    <Typography fontWeight={700}>
                                        Nama
                                    </Typography>
                                    <TextField
                                        id="nama"
                                        variant="outlined"
                                        value={nama}
                                        onChange={handleNamaChange}
                                    />
                                    <Typography fontWeight={700}>
                                        Email
                                    </Typography>
                                    <TextField
                                        id="email"
                                        variant="outlined"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    <Typography fontWeight={700}>
                                        Nomor Telepon
                                    </Typography>
                                    <TextField
                                        id="nomorTelepon"
                                        variant="outlined"
                                        value={nomorTelepon}
                                        onChange={handleNomorTeleponChange}
                                        type="number"
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={
                                            updateProfileLoading ? (
                                                <CircularProgress size={20} />
                                            ) : (
                                                <SaveIcon />
                                            )
                                        }
                                        style={{
                                            backgroundColor: "blue",
                                            marginTop: "20px",
                                        }}
                                        onClick={updateProfile}
                                        disabled={updateProfileLoading} // Disable the button while loading
                                    >
                                        Simpan
                                    </Button>
                                    {errorMessage && (
                                        <Alert severity="error">
                                            {errorMessage}
                                        </Alert>
                                    )}
                                    {successMessage && (
                                        <Alert severity="success">
                                            {successMessage}
                                        </Alert>
                                    )}
                                </Stack>
                            </Box>
                        </Card>

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={2}
                            sx={{
                                p: {
                                    xs: 3,
                                    sm: 0,
                                },
                            }}
                        >
                            <Typography variant="h4" gutterBottom>
                                Change Password
                            </Typography>
                        </Stack>
                        <Card
                            sx={{
                                mb: 5,
                                marginRight: { xs: 3, sm: 0 },
                                marginLeft: { xs: 3, sm: 0 },
                            }}
                        >
                            <Box sx={{ p: 5, display: "flex" }}>
                                <Stack spacing={1}>
                                    <Typography fontWeight={700}>
                                        Password
                                    </Typography>
                                    <TextField
                                        id="password"
                                        variant="outlined"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Button
                                                        onClick={
                                                            toggleShowPassword
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </Button>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Typography fontWeight={700}>
                                        Confirm Password
                                    </Typography>
                                    <TextField
                                        id="confirmPassword"
                                        variant="outlined"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Button
                                                        onClick={
                                                            toggleShowPassword
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </Button>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={
                                            updatePasswordLoading ? (
                                                <CircularProgress size={20} />
                                            ) : (
                                                <SaveIcon />
                                            )
                                        }
                                        style={{
                                            backgroundColor: "blue",
                                            marginTop: "20px",
                                        }}
                                        onClick={updatePassword}
                                        disabled={updatePasswordLoading} // Disable the button while loading
                                    >
                                        Change Password
                                    </Button>
                                    {passwordErrorMessage && (
                                        <Alert severity="error">
                                            {passwordErrorMessage}
                                        </Alert>
                                    )}
                                    {passwordSuccessMessage && (
                                        <Alert severity="success">
                                            {passwordSuccessMessage}
                                        </Alert>
                                    )}
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default withRoot(Profiles);
