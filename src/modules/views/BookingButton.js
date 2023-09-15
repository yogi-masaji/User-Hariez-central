import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    Typography,
    Divider,
    Box,
    Snackbar,
    Alert,
    AlertTitle,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";

function BookingButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [id, setId] = useState("");
    const dataCookie = Cookies.get("data");
    let namaUser = "";
    if (dataCookie) {
        const data = JSON.parse(dataCookie);
        namaUser = data.nama;
    }
    const getUserDetail = () => {
        const token = Cookies.get("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        axios
            .get("http://127.0.0.1:3000/user/details/info", { headers })
            .then((res) => {
                setNama(res.data.nama);
                setEmail(res.data.email);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getUserDetail();
    }, []);
    const navigate = useNavigate();
    const handleModalOpen = () => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/sign-in");
        } else {
            setIsModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);
    };

    const handleSubmit = () => {
        if (selectedDate) {
            const token = Cookies.get("token");
            const formattedDate = new Date(selectedDate)
                .toISOString()
                .split("T")[0]; // Format the selected date as "yyyy-mm-dd"

            setLoading(true);
            axios
                .post(
                    "http://127.0.0.1:3000/antrian",
                    { TanggalAntrian: formattedDate },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log("Post request successful:", res.data);
                    setId(res.data.id);
                    setTimeout(() => {
                        setLoading(false); // Set loading state to false after a timeout (e.g., 2 seconds)
                        // setSuccessAlertOpen(true);
                        handleModalClose();
                    }, 1000);
                })
                .catch((err) => {
                    console.log("Error:", err.response);
                    setLoading(false);
                    setErrorAlertOpen(true);
                });
        }
    };

    const today = new Date().toISOString().split("T")[0]; // Get the current date in the format 'YYYY-MM-DD'
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);
    const maxDay = maxDate.toISOString().split("T")[0];

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleModalOpen}
                sx={{
                    width: "120",
                    height: "50px",
                    backgroundColor: "#FFA500",
                    borderRadius: "50px",
                    "&:hover": {
                        backgroundColor: "#bd7d08",
                    },
                }}
            >
                Book Now
            </Button>

            <Dialog open={isModalOpen} onClose={handleModalClose}>
                <DialogTitle>Jadwal Booking Services</DialogTitle>

                <Divider />
                <DialogContent>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2">Nama</Typography>
                        <Typography variant="h6" sx={{ color: "#7693FF" }}>
                            {nama}
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2">Email</Typography>
                        <Typography variant="h6" sx={{ color: "#7693FF" }}>
                            {email}
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1">
                        Pilih Tanggal Booking
                    </Typography>
                    <TextField
                        type="date"
                        inputProps={{ min: today, max: maxDay }}
                        defaultValue={today}
                        fullWidth
                        onChange={handleDateChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={loading} // Disable button when loading is true
                    >
                        {loading ? "Loading..." : "Submit"}{" "}
                        {/* Display appropriate text based on loading state */}
                    </Button>
                </DialogActions>
            </Dialog>
            {id && (
                <Dialog open={id !== null} onClose={() => setId(null)}>
                    <DialogTitle>Booking Successful</DialogTitle>
                    <DialogContent>
                        <Box textAlign="center" mb={2}>
                            <CheckCircleOutlineIcon
                                sx={{
                                    fontSize: 80,
                                    color: "#4CAF50",
                                }}
                            />
                            <Typography variant="h5" sx={{ color: "#4CAF50" }}>
                                Your booking code is:
                            </Typography>
                        </Box>
                        <Typography
                            variant="h4"
                            sx={{ textAlign: "center", textTransform: "none" }}
                            gutterBottom
                        >
                            {id}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setId(null)}
                            variant="contained"
                            color="primary"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <Snackbar
                open={errorAlertOpen}
                autoHideDuration={1000}
                onClose={() => setErrorAlertOpen(false)}
            >
                <Alert
                    onClose={() => setErrorAlertOpen(false)}
                    severity="error"
                >
                    <AlertTitle>Error</AlertTitle>
                    An error occurred while booking.
                </Alert>
            </Snackbar>
        </>
    );
}

export default BookingButton;
