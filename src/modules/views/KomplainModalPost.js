import React, { useState } from "react";
import {
    Button,
    Modal,
    Box,
    Typography,
    TextField,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

function KomplainModalPost({ idPerbaikan }) {
    const [open, setOpen] = useState(false);
    const [komplainText, setKomplainText] = useState("");
    const [loading, setLoading] = useState(false);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSuccessAlertOpen(false);
        setErrorAlertOpen(false);
    };

    const handleKomplain = async () => {
        try {
            setLoading(true);
            const token = Cookies.get("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const requestBody = {
                idPerbaikan: idPerbaikan,
                komplain: komplainText,
            };

            const response = await axios.post(
                "http://127.0.0.1:3000/komplain",
                requestBody,
                { headers }
            );

            setKomplainText("");
            setLoading(false);
            setSuccessAlertOpen(true);
            setTimeout(() => {
                handleClose();
                handleSnackbarClose();
            }, 2000);
        } catch (error) {
            console.error("Error posting komplain:", error);
            setLoading(false);
            setErrorAlertOpen(true);
        }
    };

    const isDisabled = komplainText.trim() === "";

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: 10 }}
                onClick={handleOpen}
            >
                Komplain
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 400,
                        borderRadius: 4,
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        align="center"
                        gutterBottom
                    >
                        Komplain
                    </Typography>
                    <TextField
                        label="Komplain"
                        multiline
                        rows={4}
                        fullWidth
                        value={komplainText}
                        onChange={(e) => setKomplainText(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Button onClick={handleClose} sx={{ marginRight: 2 }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleKomplain}
                            variant="contained"
                            color="primary"
                            disabled={isDisabled || loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Post"
                            )}
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Snackbar
                open={successAlertOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ color: "#FFF", backgroundColor: "#4CAF50" }}
                >
                    Komplain posted successfully
                </Alert>
            </Snackbar>

            <Snackbar
                open={errorAlertOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="error"
                    variant="filled"
                    sx={{ color: "#FFF", backgroundColor: "#f44336" }}
                >
                    Error posting komplain
                </Alert>
            </Snackbar>
        </>
    );
}

export default KomplainModalPost;
