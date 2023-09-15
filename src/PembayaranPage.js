import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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
    Tab,
    Tabs,
    Grid,
    Divider,
} from "@mui/material";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import PaidIcon from "@mui/icons-material/Paid";
import PaymentIcon from "@mui/icons-material/Payment";
import CashMethod from "./modules/views/CashMethod";
import TransferMethod from "./modules/views/TransferMethod";

function TabPanel({ value, index, children }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function PembayaranPage() {
    const { id } = useParams();
    const [profile, setProfile] = useState("");
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [nomorTelepon, setNomorTelepon] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const [detailPerbaikan, setDetailPerbaikan] = useState(null);

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

    useEffect(() => {
        const getUserdetailPerbaikanDetail = async () => {
            try {
                const token = Cookies.get("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(
                    `http://127.0.0.1:3000/user/perbaikan/detail/${id}`,
                    { headers }
                );
                console.log(response.data["Data Perbaikan"]);
                setDetailPerbaikan(response.data["Data Perbaikan"]);
            } catch (error) {
                console.log(error);
            }
        };

        getUserdetailPerbaikanDetail();
    }, [id]);

    return (
        <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
            <AppAppBar />
            <Container sx={{ mt: 5 }}>
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
                        Pembayaran
                    </Typography>
                </Stack>
                <Grid container spacing={2}>
                    <Grid xs={12} md={5}>
                        <Card
                            sx={{
                                mb: 5,
                                marginRight: 5,
                                marginLeft: { xs: 5, sm: 0 },
                                display: "flex",
                                justifyContent: "start",
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
                                <Divider />
                            </Box>
                        </Card>
                        <Card
                            sx={{
                                mb: 5,
                                marginRight: 5,
                                marginLeft: { xs: 5, sm: 0 },
                                display: "flex",
                                justifyContent: "start",
                            }}
                        >
                            <Box sx={{ p: 3 }}>
                                <Stack spacing={1}>
                                    <Typography fontWeight={700}>
                                        Kode Perbaikan:{" "}
                                        {detailPerbaikan?.kodePerbaikan}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Perangkat: {detailPerbaikan?.perangkat}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Kendala: {detailPerbaikan?.kendala}
                                    </Typography>
                                </Stack>

                                {/* Divider with full length */}
                                <Divider sx={{ width: "100%", my: 2 }} />

                                <Stack spacing={1}>
                                    <Typography variant="h5" fontWeight={700}>
                                        Total:{" "}
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(detailPerbaikan?.biaya)}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid xs={12} md={5}>
                        <Card
                            sx={{
                                mb: 5,
                                marginRight: { xs: 3, sm: 0 },
                                marginLeft: { xs: 3, sm: 0 },
                            }}
                        >
                            <Box sx={{ p: 3 }}>
                                <Stack
                                    sx={{
                                        // backgroundColor: "#ff9999",
                                        p: 5,
                                        borderRadius: 3,
                                        border: 2,
                                        borderColor: "#D3DBE1",
                                    }}
                                    spacing={1}
                                >
                                    <Typography variant="h5" fontWeight={700}>
                                        Total:{" "}
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(detailPerbaikan?.biaya)}
                                    </Typography>
                                    <Divider />
                                    <Typography variant="body2">
                                        Metode Pembayaran
                                    </Typography>
                                    <Tabs
                                        value={activeTab}
                                        onChange={handleTabChange}
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="Perbaikan Tabs"
                                        sx={{
                                            bgcolor: "transparent",
                                            "& .MuiTabs-indicator": {
                                                display: "none",
                                            },
                                        }}
                                    >
                                        <Tab
                                            icon={
                                                <PaidIcon
                                                    sx={{
                                                        color:
                                                            activeTab === 0
                                                                ? "green"
                                                                : "inherit", // Set the icon color to green when active, otherwise inherit the default color
                                                        marginLeft: "8px",
                                                    }}
                                                />
                                            }
                                            iconPosition="start"
                                            label="Cash"
                                            value={0}
                                            sx={{
                                                marginRight: "8px",
                                                border:
                                                    activeTab === 0
                                                        ? "2px solid green"
                                                        : "2px solid #D3DBE1",
                                                borderRadius: 3,
                                            }}
                                        />
                                        <Tab
                                            icon={
                                                <PaymentIcon
                                                    sx={{
                                                        color:
                                                            activeTab === 1
                                                                ? "green"
                                                                : "inherit", // Set the icon color to green when active, otherwise inherit the default color
                                                        marginLeft: "8px",
                                                    }}
                                                />
                                            }
                                            iconPosition="start"
                                            label="Transfer"
                                            value={1}
                                            sx={{
                                                marginLeft: "8px",
                                                border:
                                                    activeTab === 1
                                                        ? "2px solid green"
                                                        : "2px solid #D3DBE1",
                                                borderRadius: 3,
                                            }}
                                        />
                                    </Tabs>

                                    <Divider />

                                    <TabPanel value={activeTab} index={0}>
                                        <CashMethod id={id} />
                                    </TabPanel>
                                    <TabPanel value={activeTab} index={1}>
                                        <TransferMethod id={id} />
                                    </TabPanel>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default withRoot(PembayaranPage);
