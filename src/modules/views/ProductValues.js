import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";

// Animations on scroll
import { AnimationOnScroll } from "react-animation-on-scroll";
import Fade from "react-reveal/Fade";
const item = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    px: 5,
};

function ProductValues() {
    return (
        <Box
            mt={10}
            component="section"
            sx={{
                display: "flex",
                overflow: "hidden",
                bgcolor: "secondary.light",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Typography
                sx={{
                    typography: { sm: "h4", xs: "h3" },
                    textAlign: { sm: "center", xs: "center" },
                    mt: 10,
                }}
            >
                Why choose us?
            </Typography>
            <Box
                sx={{
                    width: "10%",
                    height: 2,
                    backgroundColor: "#ffa500",
                    my: 2,
                    mx: "auto",
                }}
            />
            <Container
                sx={{ mt: 15, mb: 30, display: "flex", position: "relative" }}
            >
                <Box
                    component="img"
                    src="/static/themes/onepirate/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{
                        pointerEvents: "none",
                        position: "absolute",
                        top: -180,
                    }}
                />
                <Fade left cascade>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box
                                    component="img"
                                    src="/static/themes/onepirate/productValues1.svg"
                                    alt="suitcase"
                                    sx={{ height: 55 }}
                                />
                                <Typography variant="h6" sx={{ my: 5 }}>
                                    Pengalaman dan Keahlian
                                </Typography>
                                <Typography variant="h5">
                                    {
                                        " teknisi kami memiliki pengetahuan dan keahlian untuk menangani berbagai masalah laptop. Mulai dari perbaikan perangkat keras hingga perbaikan perangkat lunak."
                                    }
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box
                                    component="img"
                                    src="/static/themes/onepirate/productValues2.svg"
                                    alt="graph"
                                    sx={{ height: 55 }}
                                />
                                <Typography variant="h6" sx={{ my: 5 }}>
                                    Layanan Cepat dan Efisien
                                </Typography>
                                <Typography variant="h5">
                                    {
                                        "kami mengutamakan layanan yang cepat tanpa mengorbankan kualitas. Tim kami bekerja dengan tekun untuk mendiagnosis dan memperbaiki laptop Anda secepat mungkin, sehingga Anda dapat kembali melakukan hal-hal yang paling penting."
                                    }
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box
                                    component="img"
                                    src="/static/themes/onepirate/productValues3.svg"
                                    alt="clock"
                                    sx={{ height: 55 }}
                                />
                                <Typography variant="h6" sx={{ my: 5 }}>
                                    Harga Transparan
                                </Typography>
                                <Typography variant="h5">
                                    {
                                        "Kami memberikan harga yang jelas dan transparan untuk semua layanan kami. Tidak ada biaya tersembunyi atau kejutan. Anda akan menerima penawaran rinci sebelum kami memulai perbaikan apa pun, sehingga Anda dapat membuat keputusan yang tepat."
                                    }
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Fade>
            </Container>
        </Box>
    );
}

export default ProductValues;
