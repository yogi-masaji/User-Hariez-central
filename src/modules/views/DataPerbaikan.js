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
} from "@mui/material";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import moment from "moment";
import "moment/locale/id";
import noDataImg from "./../../assets/noData.png";
import { Search as SearchIcon } from "@mui/icons-material";
import KomplainModalPost from "./KomplainModalPost";

function DataPerbaikan() {
    const [dataPerbaikan, setDataPerbaikan] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const getUserPerbaikanData = async () => {
        try {
            const token = Cookies.get("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(
                "http://127.0.0.1:3000/user/perbaikan/detail/v1",
                { headers }
            );

            console.log(response.data["Data Perbaikan"]);
            setDataPerbaikan(response.data["Data Perbaikan"]);
            setFilteredData(response.data["Data Perbaikan"]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserPerbaikanData();
    }, []);

    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        const filteredResults = dataPerbaikan.filter((perbaikan) =>
            perbaikan.kodePerbaikan
                .toLowerCase()
                .includes(searchValue.toLowerCase())
        );
        setFilteredData(filteredResults);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (dataPerbaikan.length === 0) {
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
                <Typography>No data available.</Typography>
            </Box>
        );
    }

    return (
        <div>
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
                    <Typography>No search results available.</Typography>
                </Box>
            ) : (
                filteredData.map((perbaikan) => (
                    <Box
                        key={perbaikan.id}
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
                            Kode Perbaikan: {perbaikan.kodePerbaikan}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {moment(perbaikan.createdAt)
                                .locale("id")
                                .format("DD MMMM YYYY")}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Nama:</strong>
                            {perbaikan.Antrian?.User?.nama}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Kendala:</strong> {perbaikan.kendala}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Perangkat:</strong> {perbaikan.perangkat}
                        </Typography>
                        {perbaikan.Pembayarans.length === 0 ? (
                            // If Pembayarans array is empty, show custom status "Menunggu Pembayaran"
                            <Typography variant="body1" gutterBottom>
                                <strong>Status Pembayaran:</strong> Menunggu
                                Pembayaran
                            </Typography>
                        ) : (
                            // If Pembayarans array has values
                            <>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Status Pembayaran:</strong>{" "}
                                    <div
                                        style={{
                                            display: "inline-block",
                                            fontWeight: "700",
                                            backgroundColor:
                                                perbaikan.Pembayarans[0]
                                                    .status ===
                                                "Pembayaran Gagal"
                                                    ? "#ff0707"
                                                    : perbaikan.Pembayarans[0]
                                                          .status ===
                                                      "Pembayaran Ditolak"
                                                    ? "#ff0707"
                                                    : perbaikan.Pembayarans[0]
                                                          .status === "Lunas"
                                                    ? "#4CAF50"
                                                    : perbaikan.Pembayarans[0]
                                                          .status ===
                                                      "konfirmasi pembayaran"
                                                    ? "#2196F3"
                                                    : "",
                                            color:
                                                perbaikan.Pembayarans[0]
                                                    .status ===
                                                "Pembayaran Gagal"
                                                    ? "#ffffff"
                                                    : perbaikan.Pembayarans[0]
                                                          .status ===
                                                      "Pembayaran Ditolak"
                                                    ? "#fff"
                                                    : perbaikan.Pembayarans[0]
                                                          .status === "Lunas"
                                                    ? "#ffffff"
                                                    : perbaikan.Pembayarans[0]
                                                          .status ===
                                                      "konfirmasi pembayaran"
                                                    ? "#000000"
                                                    : "",
                                            borderRadius: "4px",
                                            padding: "5px 10px",
                                            fontSize: "12px",
                                            lineHeight: "1",
                                            textAlign: "center",
                                        }}
                                    >
                                        {perbaikan.Pembayarans[0].status}
                                    </div>
                                </Typography>

                                {/* Show perbaikan.status only when Pembayarans.status is "Lunas" */}
                                {perbaikan.Pembayarans[0].status ===
                                    "Lunas" && (
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Status Perbaikan:</strong>{" "}
                                        <div
                                            style={{
                                                display: "inline-block",
                                                fontWeight: "700",
                                                backgroundColor:
                                                    perbaikan.status ===
                                                    "Option 1"
                                                        ? "#ff9999"
                                                        : perbaikan.status ===
                                                          "Dalam Proses Diagnosa"
                                                        ? "#FFC107"
                                                        : perbaikan.status ===
                                                          "Selesai"
                                                        ? "#4CAF50"
                                                        : perbaikan.status ===
                                                          "Sedang diperbaiki"
                                                        ? "#2196F3"
                                                        : "",
                                                color:
                                                    perbaikan.status ===
                                                    "Option 1"
                                                        ? "#ffffff"
                                                        : perbaikan.status ===
                                                          "Dalam Proses Diagnosa"
                                                        ? "#000000"
                                                        : perbaikan.status ===
                                                          "Selesai"
                                                        ? "#ffffff"
                                                        : perbaikan.status ===
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
                                            {perbaikan.status}
                                        </div>
                                    </Typography>
                                )}
                            </>
                        )}

                        <Typography variant="body1" gutterBottom>
                            <strong>Teknisi:</strong> {perbaikan.teknisi.nama}
                        </Typography>
                        {/* Render additional information as needed */}
                        <Divider />
                        <Typography variant="h6" gutterBottom>
                            <strong>Total:</strong>{" "}
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(perbaikan.biaya)}
                        </Typography>
                        <Box display="flex" justifyContent="flex-end">
                            {perbaikan.Pembayarans.length > 0 &&
                            perbaikan.Pembayarans[0].status ===
                                "Lunas" ? null : (
                                <Button
                                    component={Link}
                                    to={`/pembayaran/${perbaikan.id}`}
                                    variant="contained"
                                    color="primary"
                                >
                                    Pembayaran
                                </Button>
                            )}

                            {perbaikan.Pembayarans.length > 0 &&
                                perbaikan.Pembayarans[0].status === "Lunas" && (
                                    <Button
                                        component={Link}
                                        to={`/perbaikanku/${perbaikan.id}`}
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginLeft: 1 }}
                                    >
                                        Lihat Detail
                                    </Button>
                                )}

                            {perbaikan.status === "Selesai" && (
                                <>
                                    <KomplainModalPost
                                        idPerbaikan={perbaikan.id}
                                    />
                                </>
                            )}
                        </Box>
                    </Box>
                ))
            )}
        </div>
    );
}

export default DataPerbaikan;
