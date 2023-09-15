import React from "react";
import { Typography, Grid, Container, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import LaptopImage from "../../assets/LandingPage.png";
import JadwalAntrianModal from "./JadwalAntrianModal";

const useStyles = makeStyles((theme) => ({
    image: {
        maxWidth: "100%",
        height: "auto",
        display: "block",
        margin: "0 auto", // Centers the image horizontally
    },
}));

export default function FirstSection() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Container>
            <Grid container spacing={5} alignItems="center" mt={2} mb={5}>
                <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
                    <Typography
                        sx={{
                            typography: { sm: "h2", xs: "h3" },
                            textAlign: { sm: "left", xs: "center" },
                        }}
                    >
                        Welcome to Hariez Central Service
                    </Typography>

                    <Typography variant="body1" paragraph mt={3}>
                        Apakah laptop Anda membutuhkan perbaikan? Jangan
                        khawatir! Di Hariez Central Service, kami spesialis
                        dalam perbaikan laptop yang ahli untuk mengembalikan
                        kinerja perangkat Anda. Tim teknisi terampil kami
                        berdedikasi untuk menyediakan solusi cepat dan handal
                        untuk semua masalah laptop Anda.
                    </Typography>
                    <div style={{ marginTop: "20px" }}>
                        <JadwalAntrianModal />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
                    <img
                        src={LaptopImage}
                        alt="Laptop"
                        className={classes.image}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
