import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import TextField from "../components/TextField";
import Snackbar from "../components/Snackbar";
import Button from "../components/Button";
import imgTempat from "../../assets/imgFirstPage.jpg";

function ProductCTA() {
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container component="section" sx={{ mt: 10, display: "flex" }}>
            <Grid container>
                <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            bgcolor: "warning.main",
                            py: 8,
                            px: 3,
                        }}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ maxWidth: 400 }}
                        >
                            <Typography
                                variant="h2"
                                component="h2"
                                gutterBottom
                            >
                                Alamat
                            </Typography>
                            <Typography variant="body1">
                                Mall Mangga2 Lt.5 Block C59-60 Jakarta, Daerah
                                Khusus Ibukota Jakarta 10730
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 3 }}>
                                Jam Buka:
                                <br />
                                Senin - Minggu: 10.00 - 18.00
                                <br />
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: { md: "block", xs: "none" },
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: -67,
                            left: -67,
                            right: 0,
                            bottom: 0,
                            width: "100%",
                            background:
                                "url(/static/themes/onepirate/productCTAImageDots.png)",
                        }}
                    />
                    <Box
                        component="img"
                        src={imgTempat}
                        sx={{
                            position: "absolute",
                            top: -28,
                            left: -28,
                            right: 0,
                            bottom: 0,
                            width: "100%",
                            maxWidth: 600,
                        }}
                    />
                </Grid>
            </Grid>
            <Snackbar
                open={open}
                closeFunc={handleClose}
                message="We will send you our best offers, once a week."
            />
        </Container>
    );
}

export default ProductCTA;
