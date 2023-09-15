import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "../components/Button";
import Typography from "../components/Typography";
import BookingButton from "../views/BookingButton";
import imgPc from "../../assets/pc.svg";
import imgDiagnosa from "../../assets/diagnosa.svg";
import imgBooking from "../../assets/booking.svg";

// Animations on scroll
import Fade from "react-reveal/Fade";

const item = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    px: 5,
};

const number = {
    fontSize: 24,
    fontFamily: "default",
    color: "secondary.main",
    fontWeight: "medium",
};

const image = {
    height: 55,
    my: 4,
};

function ProductHowItWorks() {
    return (
        <Box
            component="section"
            sx={{
                display: "flex",
                bgcolor: "secondary.light",
                overflow: "hidden",
            }}
        >
            <Container
                sx={{
                    mt: 10,
                    mb: 15,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    component="img"
                    src="/static/themes/onepirate/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{
                        pointerEvents: "none",
                        position: "absolute",
                        top: -180,
                        opacity: 0.7,
                    }}
                />

                <Typography
                    variant="h4"
                    marked="center"
                    component="h2"
                    sx={{ mb: 5 }}
                >
                    How To Order
                </Typography>
                <Typography
                    variant="h6"
                    marked="center"
                    component="h2"
                    sx={{ mb: 14 }}
                >
                    Easy step for getting the services
                </Typography>
                <div>
                    <Fade left cascade>
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={4}>
                                <Box sx={item}>
                                    <Box sx={number}>1.</Box>
                                    <Box
                                        component="img"
                                        src={imgBooking}
                                        alt={imgBooking}
                                        sx={image}
                                    />
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        mb={2}
                                    >
                                        Booking
                                    </Typography>
                                    <Typography variant="body1" align="center">
                                        Dapatkan layanan kami dengan mudah
                                        melalui proses booking yang cepat. Isi
                                        formulir booking
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={item}>
                                    <Box sx={number}>2.</Box>
                                    <Box
                                        component="img"
                                        src={imgDiagnosa}
                                        alt={imgDiagnosa}
                                        sx={image}
                                    />
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        mb={2}
                                    >
                                        Diagnosa Masalah
                                    </Typography>
                                    <Typography variant="body1" align="center">
                                        Tim teknisi kami akan melakukan diagnosa
                                        menyeluruh terhadap laptop Anda. Kami
                                        berkomitmen untuk memberikan layanan
                                        konsultasi yang jelas dan membantu Anda
                                        memahami penyebab masalah serta opsi
                                        perbaikan yang tersedia.
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box sx={item}>
                                    <Box sx={number}>3.</Box>
                                    <Box
                                        component="img"
                                        src={imgPc}
                                        alt={imgPc}
                                        sx={image}
                                    />
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        mb={2}
                                    >
                                        Service
                                    </Typography>
                                    <Typography variant="body1" align="center">
                                        {
                                            "Tim kami akan memulai perbaikan atau layanan yang Anda butuhkan. Perangkat Anda akan dikembalikan dalam kondisi baik dan siap digunakan."
                                        }
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Fade>
                </div>
                <Box mt={5}>
                    <BookingButton />
                </Box>
            </Container>
        </Box>
    );
}

export default ProductHowItWorks;
