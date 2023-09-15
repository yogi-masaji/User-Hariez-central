import {
    Container,
    Grid,
    Box,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import React from "react";
import imgLaptop from "../../assets/laptop.svg";
import testimoni1 from "../../assets/testimoni1.png";
import testimoni2 from "../../assets/testimoni2.png";
import testimoni3 from "../../assets/testimoni3.png";
import imgPc from "../../assets/pc.svg";
import imgMaintenance from "../../assets/maintenance.svg";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

function Testimoni() {
    return (
        <Container sx={{ marginBottom: 15 }}>
            <Grid container mt={10} mb={5}>
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <Typography
                        sx={{
                            typography: { sm: "h4", xs: "h3" },
                            textAlign: { sm: "center", xs: "center" },
                        }}
                    >
                        Testimony
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
                    <Typography
                        sx={{
                            textAlign: { sm: "center", xs: "center" },
                        }}
                        variant="body1"
                    >
                        What people say about us on Google
                    </Typography>
                </Box>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            backgroundColor: "#171b25",
                            color: "#fff",
                            boxShadow:
                                "-1px 0px 12px 6px rgba(201, 197, 201, 0.51)",
                            transition: "box-shadow 0.3s ease",
                            "&:hover": {
                                boxShadow:
                                    "-14px -13px 0px -1px rgba(255, 165, 0, 0.75)",
                            },
                        }}
                    >
                        <CardContent>
                            <Grid
                                container
                                direction="column"
                                alignItems="left"
                                mb={3}
                            >
                                <Grid item>
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                </Grid>
                                {/* Image */}
                            </Grid>
                            {/* Review Text */}
                            <Typography variant="body2" align="left">
                                ROG divonis ganti mesin di service center, harga
                                selanggit pula, ketemu jurangan satu ini ROG ane
                                sehat kembali tanpa harus ganti mesin,
                                penangananya pro banget,,, humble banget pula
                                juragan satu ini, masalah harga ama jurangan
                                satu ga diragukan lagi merakyat pastinya..
                                Recomended banget pokoke...!!!!
                            </Typography>
                            <Grid
                                item
                                container
                                justifyContent="left"
                                alignItems="center"
                                spacing={1}
                                mt={3}
                            >
                                <Grid item>
                                    <img src={testimoni1} alt={testimoni1} />
                                </Grid>

                                <Grid item>
                                    <Typography
                                        sx={{ mt: 1.5, color: "#fff" }}
                                        variant="h6"
                                        align="center"
                                    >
                                        Ideco Design
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            backgroundColor: "#171b25",
                            color: "#fff",
                            boxShadow:
                                "-1px 0px 12px 6px rgba(201, 197, 201, 0.51)",
                            transition: "box-shadow 0.3s ease",
                            "&:hover": {
                                boxShadow:
                                    "-14px -13px 0px -1px rgba(255, 165, 0, 0.75)",
                            },
                        }}
                    >
                        <CardContent>
                            <Grid
                                container
                                direction="column"
                                alignItems="left"
                                mb={3}
                            >
                                <Grid item>
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                </Grid>
                                {/* Image */}
                            </Grid>
                            {/* Review Text */}
                            <Typography variant="body2" align="left">
                                Mantap servicenya. Kesini benerin baut yg udah
                                bener2 ngeloss di laptop bisa dibenerin.
                                Pegawainya ramah semua dan diajarin juga untuk
                                perawatan kedepannya. Top 👍👍
                            </Typography>
                            <Grid
                                item
                                container
                                justifyContent="left"
                                alignItems="center"
                                spacing={1}
                                mt={3}
                            >
                                <Grid item>
                                    <img src={testimoni2} alt={testimoni2} />
                                </Grid>

                                <Grid item>
                                    <Typography
                                        sx={{ mt: 1.5, color: "#fff" }}
                                        variant="h6"
                                        align="center"
                                    >
                                        Izzan Nuruddin
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card
                        sx={{
                            backgroundColor: "#171b25",
                            color: "#fff",
                            boxShadow:
                                "-1px 0px 12px 6px rgba(201, 197, 201, 0.51)",
                            transition: "box-shadow 0.3s ease",
                            "&:hover": {
                                boxShadow:
                                    "-14px -13px 0px -1px rgba(255, 165, 0, 0.75)",
                            },
                        }}
                    >
                        <CardContent>
                            <Grid
                                container
                                direction="column"
                                alignItems="left"
                                mb={3}
                            >
                                <Grid item>
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                    <StarRateIcon sx={{ color: "#D4B068" }} />
                                </Grid>
                                {/* Image */}
                            </Grid>
                            {/* Review Text */}
                            <Typography variant="body2" align="left">
                                Pelayanannya sangat ramah sekali ke pelanggan
                                kualitas service sangat bagus sekali recomed
                                buat yg mau service laptop👍
                            </Typography>
                            <Grid
                                item
                                container
                                justifyContent="left"
                                alignItems="center"
                                spacing={1}
                                mt={3}
                            >
                                <Grid item>
                                    <img src={testimoni3} alt={testimoni3} />
                                </Grid>

                                <Grid item>
                                    <Typography
                                        sx={{ mt: 1.5, color: "#fff" }}
                                        variant="h6"
                                        align="center"
                                    >
                                        Sinta Listiani
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Testimoni;
