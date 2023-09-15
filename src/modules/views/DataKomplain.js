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
    Card,
} from "@mui/material";
import Cookies from "js-cookie";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import "moment/locale/id";
import noDataImg from "./../../assets/noData.png";
import { Search as SearchIcon } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
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
        boxShadow: theme.shadows[4],
        [theme.breakpoints.down("sm")]: {
            width: "90%",
        },
    },
}));

function DataKomplain() {
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
                "http://127.0.0.1:3000/komplain/komplaindetails/user",
                { headers }
            );

            setDataKomplain(response.data);
            setFilteredData(response.data);
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
            komplain.PerbaikanNew.kodePerbaikan
                .toLowerCase()
                .includes(searchValue.toLowerCase())
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
                `http://127.0.0.1:3000/komplain/${selectedKomplain.id}`,
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
                <Typography>
                    <strong>Garansi 1 Minggu</strong>
                    <br />
                    Kami hanya menerima komplain jika garansi masih aktif.
                    Jaminan kualitas kami memastikan perbaikan yang memuaskan.
                    Jika ada masalah selama garansi berlaku, jangan ragu untuk
                    menghubungi kami.
                </Typography>
            </Box>
            <TextField
                label="Search Kode Perbaikan"
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
                            Kode Perbaikan:{" "}
                            {komplain.PerbaikanNew.kodePerbaikan}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Tanggal Perbaikan :</strong>{" "}
                            {moment(komplain.createdAt)
                                .locale("id")
                                .format("DD MMMM YYYY")}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Kendala:</strong>{" "}
                            {komplain.PerbaikanNew.kendala}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Perangkat:</strong>{" "}
                            {komplain.PerbaikanNew.perangkat}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Status:</strong>{" "}
                            {komplain.PerbaikanNew.status}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Teknisi:</strong>{" "}
                            {komplain.PerbaikanNew.teknisi?.nama || "Unknown"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Komplain:</strong> {komplain.komplain}
                        </Typography>
                        {/* Render additional information as needed */}
                        <Divider sx={{ mt: 3, mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            <strong>Total:</strong>{" "}
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(komplain.PerbaikanNew.biaya)}
                        </Typography>
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleOpenModal(komplain)}
                            >
                                Batalkan Komplain
                            </Button>
                        </Box>
                        <Modal
                            open={open}
                            onClose={handleCloseModal}
                            closeAfterTransition
                            className={classes.modalContainer}
                        >
                            <Fade in={open}>
                                <Box className={classes.modalContent}>
                                    <Typography variant="body1" gutterBottom>
                                        Apa anda yakin ingin membatalkan
                                        komplain?
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
                                            Batalkan Komplain
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
                                Komplain berhasil dibatalkan!
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
                                Terjadi kesalahan saat membatalkan komplain.
                            </Alert>
                        </Snackbar>
                    </Box>
                ))
            )}
        </div>
    );
}

export default DataKomplain;
