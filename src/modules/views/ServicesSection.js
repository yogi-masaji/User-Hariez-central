import React from "react";
import {
    Typography,
    Grid,
    Box,
    Container,
    Card,
    CardContent,
} from "@mui/material";
import imgLaptop from "../../assets/laptop.svg";
import imgPc from "../../assets/pc.svg";
import imgMaintenance from "../../assets/maintenance.svg";
export default function ServicesSection() {
    return (
        <Container>
            <Grid container mt={10} mb={5}>
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <Typography
                        sx={{
                            typography: { sm: "h4", xs: "h3" },
                            textAlign: { sm: "center", xs: "center" },
                        }}
                    >
                        Our Services
                    </Typography>
                    <Box
                        sx={{
                            width: "10%",
                            height: 2,
                            backgroundColor: "#ffa500",
                            my: 2,
                            mx: "auto", // Add this line to center align the line
                        }}
                    />
                </Box>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            "&:hover": {
                                backgroundImage:
                                    "linear-gradient(to bottom, #ffe0a6, rgba(255, 165, 0, 0))",
                                cursor: "pointer",
                            },
                            boxShadow:
                                "-1px 0px 12px 6px rgba(201,197,201,0.51)",
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    bgcolor: "#D4B068",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                    width: 80,
                                    height: 80,
                                    margin: "0 auto",
                                }}
                            >
                                <img
                                    src={imgLaptop}
                                    alt={imgLaptop}
                                    width="50"
                                    height="50"
                                    style={{ display: "block" }}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    textAlign: "center",
                                    mt: 2,
                                }}
                                gutterBottom
                            >
                                Laptop Repair
                            </Typography>
                            <Typography
                                variant="h5"
                                component="div"
                                align="center"
                            >
                                Solusi Terbaik untuk Laptop Anda
                            </Typography>
                            <Typography
                                sx={{ mb: 1.5 }}
                                color="text.secondary"
                                align="center"
                            ></Typography>
                            <Typography variant="body2" align="center">
                                Kami ahli dalam perbaikan laptop dengan kualitas
                                terbaik. Dari kerusakan perangkat keras hingga
                                perbaikan perangkat lunak, tim kami siap
                                membantu memulihkan kinerja laptop Anda.
                                Dapatkan layanan perbaikan yang cepat dan handal
                                untuk memastikan laptop Anda kembali berjalan
                                dengan sempurna.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            "&:hover": {
                                backgroundImage:
                                    "linear-gradient(to bottom, #ffe0a6, rgba(255, 165, 0, 0))",
                                cursor: "pointer",
                            },
                            boxShadow:
                                "-1px 0px 12px 6px rgba(201,197,201,0.51)",
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    bgcolor: "#D4B068",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                    width: 80,
                                    height: 80,
                                    margin: "0 auto",
                                }}
                            >
                                <img
                                    src={imgPc}
                                    alt={imgPc}
                                    width="50"
                                    height="50"
                                    style={{ display: "block" }}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    textAlign: "center",
                                    mt: 2,
                                }}
                                gutterBottom
                            >
                                PC Repair
                            </Typography>
                            <Typography
                                variant="h5"
                                component="div"
                                align="center"
                            >
                                Solusi Terbaik untuk perbaikan PC Anda
                            </Typography>
                            <Typography
                                sx={{ mb: 1.5 }}
                                color="text.secondary"
                                align="center"
                            ></Typography>
                            <Typography variant="body2" align="center">
                                Apapun masalah yang terjadi pada PC Anda, tim
                                teknisi kami hadir untuk memberikan solusi
                                terbaik. Dari perbaikan sistem operasi hingga
                                penggantian komponen. Dapatkan PC Anda kembali
                                berfungsi seperti baru dengan bantuan kami.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            "&:hover": {
                                backgroundImage:
                                    "linear-gradient(to bottom, #ffe0a6, rgba(255, 165, 0, 0))",
                                cursor: "pointer",
                            },
                            boxShadow:
                                "-1px 0px 12px 6px rgba(201,197,201,0.51)",
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    bgcolor: "#D4B068",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                    width: 80,
                                    height: 80,
                                    margin: "0 auto",
                                }}
                            >
                                <img
                                    src={imgMaintenance}
                                    alt={imgMaintenance}
                                    width="50"
                                    height="50"
                                    style={{ display: "block" }}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    textAlign: "center",
                                    mt: 2,
                                }}
                                gutterBottom
                            >
                                Device Maintenance
                            </Typography>
                            <Typography
                                variant="h5"
                                component="div"
                                align="center"
                            >
                                Jaga Perangkat Anda dalam Kondisi Terbaik
                            </Typography>
                            <Typography
                                sx={{ mb: 1.5 }}
                                color="text.secondary"
                                align="center"
                            ></Typography>
                            <Typography variant="body2" align="center">
                                Perangkat elektronik Anda membutuhkan perawatan
                                agar tetap berfungsi dengan baik. Dengan layanan
                                perawatan perangkat kami, kami akan
                                membersihkan, memeriksa, dan melakukan perawatan
                                rutin untuk menjaga perangkat Anda dalam kondisi
                                terbaik.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
