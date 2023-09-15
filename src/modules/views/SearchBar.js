import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    InputAdornment,
    Typography,
    TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        setErrorMessage(""); // Clear the error message when the search term changes
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            setLoading(true); // Set loading state to true
            // Add a 1-second delay before executing the search
            setTimeout(() => {
                axios
                    .get(
                        `http://127.0.0.1:3000/detail/kodePerbaikan/${searchTerm}`
                    )
                    .then((response) => {
                        const data = response.data;
                        if (data && data["Data Perbaikan"]) {
                            const perbaikanId = data["Data Perbaikan"].id;
                            navigate(`/perbaikan/status/${perbaikanId}`);
                        } else {
                            setErrorMessage("Data perbaikan not found");
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                        setErrorMessage(error.response.data.message);
                    })
                    .finally(() => {
                        setLoading(false); // Set loading state back to false
                    });
            }, 2000); // 2-second delay
        } else {
            setErrorMessage("Masukkan kode perbaikan anda");
        }
    };

    useEffect(() => {
        // Check if the document object is available
        if (typeof document !== "undefined") {
            // Access the document object here
        }
    }, []);

    return typeof document !== "undefined" ? (
        <Container maxWidth="md" sx={{ mt: 20, mb: 20 }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Cek Status Perbaikan
                    </Typography>
                    <TextField
                        id="search"
                        type="search"
                        label="Masukkan kode perbaikan"
                        value={searchTerm}
                        onChange={handleChange}
                        fullWidth
                        error={!!errorMessage}
                        helperText={errorMessage}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {loading ? (
                                        <CircularProgress
                                            size={24}
                                            color="primary"
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "36px",
                                                height: "36px",
                                                borderRadius: "50%",
                                                backgroundColor: "black",
                                            }}
                                        >
                                            <SearchIcon
                                                onClick={handleSearch}
                                                style={{
                                                    cursor: "pointer",
                                                    color: "white",
                                                }}
                                            />
                                        </div>
                                    )}
                                </InputAdornment>
                            ),
                            sx: {
                                "& input": {
                                    borderRadius: "40px",
                                },
                            },
                        }}
                        sx={{
                            bgcolor: "background.paper",
                            "& .MuiInputBase-root": {
                                borderRadius: "40px",
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    ) : null;
}
