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
    Select,
    MenuItem,
    FormHelperText,
    FormControl,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";

function JadwalAntrianModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [selectedPengantaran, setSelectedPengantaran] = useState("");
    const [kendala, setKendala] = useState("");
    const [alamatJemput, setAlamatJemput] = useState("");

    const [loading, setLoading] = useState(false);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [id, setId] = useState("");
    const dataCookie = Cookies.get("data");
    let namaDetail = "";
    let emailDetail = "";
    if (dataCookie) {
        const data = JSON.parse(dataCookie);
        namaDetail = data.nama;
        emailDetail = data.email;
    }
    const getUserDetail = () => {
        const token = Cookies.get("token");
        axios
            .get("http://127.0.0.1:3000/user/details/info", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setNama(res.data.dataPelanggan.nama);
                setEmail(res.data.dataPelanggan.email);
            })
            .catch((err) => {
                console.log(err.response);
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
    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handlePengantaranChange = (event) => {
        setSelectedPengantaran(event.target.value);
    };

    const handleKendalaChange = (event) => {
        setKendala(event.target.value);
    };

    const handleAlamatJemputChange = (event) => {
        setAlamatJemput(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedDate && selectedService && selectedPengantaran) {
            const token = Cookies.get("token");
            const formattedDate = new Date(selectedDate)
                .toISOString()
                .split("T")[0];

            setLoading(true);
            axios
                .post(
                    "http://127.0.0.1:3000/antrian",
                    {
                        TanggalAntrian: formattedDate,
                        idJenis: selectedService,
                        kendala,
                        metodePengantaran: selectedPengantaran,
                        alamatJemput,
                    },
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
                        setLoading(false);
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
                <DialogTitle>Jadwal Booking Service</DialogTitle>

                <Divider />
                <DialogContent>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2">Nama</Typography>
                        <Typography variant="h6" sx={{ color: "#7693FF" }}>
                            {namaDetail}
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2">Email</Typography>
                        <Typography variant="h6" sx={{ color: "#7693FF" }}>
                            {emailDetail}
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
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="subtitle1">Pilih Layanan</Typography>
                    <Select
                        value={selectedService}
                        onChange={handleServiceChange}
                        label="Layanan"
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value={1}>Laptop Repair</MenuItem>
                        <MenuItem value={2}>PC Repair</MenuItem>
                        <MenuItem value={3}>Device Maintenance</MenuItem>
                    </Select>
                    <FormControl>
                        <Typography variant="subtitle1">
                            Pilih Pengantaran
                        </Typography>
                        <Select
                            value={selectedPengantaran}
                            onChange={handlePengantaranChange}
                            label="Metode Pengantaran"
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="Datang ke Toko">
                                Datang ke Toko
                            </MenuItem>
                            <MenuItem value="Dijemput">Dijemput</MenuItem>
                        </Select>
                        <FormHelperText>
                            area penjemputan dengan maksimum jarak 20km antara
                            lokasi kamu dan Hariez Central Service{" "}
                        </FormHelperText>
                    </FormControl>

                    <Typography variant="subtitle1">Kendala</Typography>
                    <TextField
                        value={kendala}
                        onChange={handleKendalaChange}
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        sx={{ mb: 2, width: "100%" }}
                    />
                    {selectedPengantaran === "Dijemput" && (
                        <>
                            <Typography variant="subtitle1">
                                Alamat Pengantaran
                            </Typography>
                            <TextField
                                value={alamatJemput}
                                onChange={handleAlamatJemputChange}
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                sx={{ mb: 2, width: "100%" }}
                            />
                        </>
                    )}
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

export default JadwalAntrianModal;
