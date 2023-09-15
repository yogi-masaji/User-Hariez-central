import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Divider,
    CircularProgress,
    Button,
    TextField,
    InputAdornment,
    SvgIcon,
    Modal,
    Backdrop,
    Fade,
    Snackbar,
    Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import "moment/locale/id";
import noDataImg from "./../../assets/noData.png";
import { Search as SearchIcon } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.02)",
    },
    modalContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        width: 400,
        padding: theme.spacing(3),
        borderRadius: 4,
        outline: "none",
        [theme.breakpoints.down("sm")]: {
            width: "90%",
        },
    },
}));

function DataBooking() {
    const classes = useStyles();
    const [dataKomplain, setDataKomplain] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedKomplain, setSelectedKomplain] = useState(null);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    const getUserKomplainData = async () => {
        try {
            const token = Cookies.get("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(
                "http://127.0.0.1:3000/antrian/user",
                { headers }
            );

            setDataKomplain(response.data.antrians);
            setFilteredData(response.data.antrians);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserKomplainData();
    }, []);

    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        const filteredResults = dataKomplain.filter((komplain) =>
            komplain.id.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredData(filteredResults);
    };

    const handleOpenModal = (komplain) => {
        setSelectedKomplain(komplain);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleDeleteKomplain = async () => {
        try {
            const token = Cookies.get("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axios.delete(
                `http://127.0.0.1:3000/antrian/${selectedKomplain.id}`,
                { headers }
            );

            // Remove the deleted komplain from the data arrays
            const updatedDataKomplain = dataKomplain.filter(
                (komplain) => komplain.id !== selectedKomplain.id
            );
            const updatedFilteredData = filteredData.filter(
                (komplain) => komplain.id !== selectedKomplain.id
            );

            setDataKomplain(updatedDataKomplain);
            setFilteredData(updatedFilteredData);
            handleCloseModal();

            setSuccessAlert(true);
        } catch (error) {
            console.error("Error deleting komplain:", error);
            setErrorAlert(true);
        }
    };

    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccessAlert(false);
        setErrorAlert(false);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (dataKomplain.length === 0) {
        return (
            <Box
                sx={{
                    p: 4,
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    borderRadius: 2,
                    overflowX: "auto",
                    mb: 4,
                    textAlign: "center",
                }}
            >
                <img
                    src={noDataImg}
                    alt={noDataImg}
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                    }}
                />
                <Typography variant="subtitle1" mt={2} mb={2}>
                    No data available.
                </Typography>
            </Box>
        );
    }

    return (
        <div>
            <TextField
                label="Search Kode Booking"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                style={{ marginBottom: 16 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <SvgIcon color="action">
                                <SearchIcon />
                            </SvgIcon>
                        </InputAdornment>
                    ),
                }}
            />
            {filteredData.length === 0 ? (
                <Box
                    sx={{
                        p: 4,
                        bgcolor: "background.paper",
                        boxShadow: 1,
                        borderRadius: 2,
                        overflowX: "auto",
                        mb: 4,
                        textAlign: "center",
                    }}
                >
                    <img
                        src={noDataImg}
                        alt={noDataImg}
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                        }}
                    />
                    <Typography variant="subtitle1" mt={2} mb={2}>
                        No search results available.
                    </Typography>
                </Box>
            ) : (
                filteredData.map((komplain) => (
                    <Box
                        key={komplain.id}
                        sx={{
                            p: 4,
                            bgcolor: "background.paper",
                            boxShadow: 1,
                            borderRadius: 2,
                            overflowX: "auto",
                            mb: 4,
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            Kode Booking: {komplain.id}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Tanggal Booking:</strong>{" "}
                            {moment(komplain.TanggalAntrian)
                                .locale("id")
                                .format("DD MMMM YYYY")}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Nama:</strong> {komplain.User?.nama}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Kendala:</strong> {komplain.kendala}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Layanan Pengantaran:</strong>{" "}
                            {komplain.metodePengantaran}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Status:</strong>
                            <div
                                style={{
                                    display: "inline-block",
                                    fontWeight: "700",
                                    backgroundColor:
                                        komplain.status === "Pending"
                                            ? "#3498db"
                                            : komplain.status ===
                                              "Reschedule - Toko Tutup"
                                            ? "#e74c3c"
                                            : komplain.status ===
                                              "Reschedule - Fully Booked"
                                            ? "#e74c3c"
                                            : komplain.status === "Approved"
                                            ? "#2ecc71"
                                            : komplain.status ===
                                              "Approved - dalam penjemputan"
                                            ? "#2ecc71"
                                            : komplain.status ===
                                              "Sedang diperbaiki"
                                            ? "#ffff99"
                                            : "",
                                    color:
                                        komplain.status === "Pending"
                                            ? "#ffffff"
                                            : komplain.status ===
                                              "Reschedule - Fully Booked"
                                            ? "#ffffff"
                                            : komplain.status ===
                                              "Reschedule - Toko Tutup"
                                            ? "#ffffff"
                                            : komplain.status === "Approved"
                                            ? "#ffffff"
                                            : komplain.status ===
                                              "Approved - dalam penjemputan"
                                            ? "#ffffff"
                                            : komplain.status ===
                                              "Sedang diperbaiki"
                                            ? "#000000"
                                            : "",
                                    borderRadius: "4px",
                                    padding: "5px 10px",
                                    fontSize: "12px",
                                    lineHeight: "1",
                                    textAlign: "center",
                                }}
                            >
                                {komplain.status}
                            </div>
                            <Typography variant="body2" gutterBottom>
                                {komplain.status === "Pending" && (
                                    <>
                                        Mohon tunggu beberapa menit untuk
                                        approve booking <br />
                                    </>
                                )}
                            </Typography>
                        </Typography>
                        <Divider sx={{ mt: 3, mb: 2 }} />
                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            justifyContent="flex-end"
                            gap={2}
                            mt={2}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleOpenModal(komplain)}
                                disabled={
                                    komplain.PerbaikanNews &&
                                    komplain.PerbaikanNews.length > 0
                                }
                                style={{
                                    marginBottom: { xs: "8px", sm: 0 },
                                    marginRight: { xs: 0, sm: "8px" },
                                }}
                            >
                                Batalkan Antrian
                            </Button>

                            {komplain.PerbaikanNews &&
                                komplain.PerbaikanNews.length > 0 && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        component={Link}
                                        to={`/perbaikanku/${komplain.PerbaikanNews[0].id}`}
                                        style={{
                                            marginBottom: { xs: 0, sm: 0 },
                                            marginRight: { xs: 0, sm: "8px" },
                                        }}
                                        disabled={
                                            komplain.PerbaikanNews[0]
                                                .Pembayarans.length === 0 ||
                                            komplain.PerbaikanNews[0]
                                                .Pembayarans[0].status !==
                                                "Lunas"
                                        }
                                    >
                                        Lihat Perbaikan
                                    </Button>
                                )}
                            {komplain.PerbaikanNews &&
                                komplain.PerbaikanNews.length > 0 &&
                                (komplain.PerbaikanNews[0].Pembayarans
                                    .length === 0 ||
                                    komplain.PerbaikanNews[0].Pembayarans[0]
                                        .status !== "Lunas") && (
                                    <Button
                                        component={Link}
                                        to={`/pembayaran/${komplain.PerbaikanNews[0].id}`}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Pembayaran
                                    </Button>
                                )}
                        </Box>

                        <Modal
                            open={open}
                            onClose={handleCloseModal}
                            closeAfterTransition
                            className={classes.modalContainer}
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                style: {
                                    backgroundColor: "rgba(0, 0, 0, 0.02)", // Update the background color here
                                },
                            }}
                        >
                            <Fade in={open}>
                                <Box className={classes.modalContent}>
                                    <Typography variant="body1" gutterBottom>
                                        Apa anda yakin ingin membatalkan
                                        antrian?
                                    </Typography>
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                        mt={2}
                                    >
                                        <Button
                                            variant="outlined"
                                            onClick={handleCloseModal}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleDeleteKomplain}
                                            style={{
                                                marginLeft: 8,
                                                backgroundColor: "#f44336",
                                            }}
                                        >
                                            Batalkan Antrian
                                        </Button>
                                    </Box>
                                </Box>
                            </Fade>
                        </Modal>
                        <Snackbar
                            open={successAlert}
                            autoHideDuration={6000}
                            onClose={handleAlertClose}
                        >
                            <Alert
                                onClose={handleAlertClose}
                                severity="success"
                                variant="filled"
                                sx={{
                                    color: "#FFF",
                                    backgroundColor: "#4CAF50",
                                }}
                            >
                                Antrian berhasil dibatalkan!
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            open={errorAlert}
                            autoHideDuration={6000}
                            onClose={handleAlertClose}
                        >
                            <Alert
                                onClose={handleAlertClose}
                                severity="error"
                                variant="filled"
                                sx={{
                                    color: "#FFF",
                                    backgroundColor: "#f44336",
                                }}
                            >
                                Terjadi kesalahan saat membatalkan antrian.
                            </Alert>
                        </Snackbar>
                    </Box>
                ))
            )}
        </div>
    );
}

export default DataBooking;
