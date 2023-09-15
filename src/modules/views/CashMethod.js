import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CashMethod({ id }) {
    const [loading, setLoading] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const navigate = useNavigate();

    const handleCash = () => {
        setLoading(true);

        const token = Cookies.get("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const requestBody = {
            idPerbaikan: id,
            metodePembayaran: "cash",
        };
        axios
            .post("http://127.0.0.1:3000/pembayaran/", requestBody, { headers })
            .then((res) => {
                console.log(res);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
                setSuccessAlert(true);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleSuccessAlertClose = () => {
        setSuccessAlert(false);
        navigate("/perbaikanku"); // Navigate to "/perbaikanku" after success alert is closed
    };

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#4F46E5",
                    "&:hover": {
                        backgroundColor: "#3C359A",
                    },
                    width: "100%",
                }}
                onClick={handleCash}
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    "Bayar Cash"
                )}
            </Button>

            <Snackbar
                open={successAlert}
                autoHideDuration={3000}
                onClose={handleSuccessAlertClose}
            >
                <Alert variant="filled" severity="success">
                    Pembayaran Berhasil
                </Alert>
            </Snackbar>
        </>
    );
}

export default CashMethod;
