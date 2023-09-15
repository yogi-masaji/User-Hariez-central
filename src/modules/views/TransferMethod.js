import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    Stack,
    Typography,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useNavigate } from "react-router-dom";
import ReactImageFileResizer from "react-image-file-resizer";

function TransferMethod({ id }) {
    const [loading, setLoading] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const styleImage = {
        width: "300px",
        height: "auto",
    };
    useEffect(() => {
        if (image) {
            setImagePreview(URL.createObjectURL(image));
        }

        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [image]);

    const handleCash = () => {
        setLoading(true);

        const token = Cookies.get("token");
        const headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };

        // Resize the image using ReactImageFileResizer
        ReactImageFileResizer.imageFileResizer(
            image,
            600, // New width
            600, // New height
            "JPEG", // Output format
            100, // Quality
            0, // Rotation
            (uri) => {
                const formData = new FormData();
                formData.append("idPerbaikan", id);
                formData.append("metodePembayaran", "transfer");
                formData.append("image", uri);

                axios
                    .post("http://127.0.0.1:3000/pembayaran/", formData, {
                        headers,
                    })
                    .then((res) => {
                        console.log(res);
                        setTimeout(() => {
                            setLoading(false);
                            // Navigate to "/perbaikanku" after success
                        }, 1000);
                        setSuccessAlert(true);
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                    });
            },
            "blob"
        );
    };

    const handleSuccessAlertClose = () => {
        setSuccessAlert(false);
        navigate("/perbaikanku"); // Navigate to "/perbaikanku" after success alert is closed
    };

    return (
        <>
            <Stack
                sx={{
                    backgroundColor: "#e8e8e8",
                    border: 2,
                    borderRadius: 2,
                    borderColor: "#D3DBE1",
                    p: 3,
                    mb: 3,
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <AccountBalanceIcon sx={{ marginRight: "8px" }} />
                    <Typography fontWeight={700}>Bank Transfer</Typography>
                </div>
                <Typography fontWeight={700}>BCA 2480210011</Typography>
                <Typography fontWeight={700}>Haries Priyanto</Typography>
            </Stack>

            <Stack
                sx={{
                    backgroundColor: "#e8e8e8",
                    border: 2,
                    borderRadius: 2,
                    borderColor: "#D3DBE1",
                    p: 3,
                    mb: 3,
                }}
            >
                <label htmlFor="upload-photo">
                    <input
                        style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <Button
                        color="secondary"
                        variant="contained"
                        component="span"
                        sx={{ mb: 3 }}
                    >
                        Upload Bukti Pembayaran
                    </Button>
                </label>
                {imagePreview && <img src={imagePreview} alt={imagePreview} />}
            </Stack>
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
                    "Bayar Transfer"
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

export default TransferMethod;
