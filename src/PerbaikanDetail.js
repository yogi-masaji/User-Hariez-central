import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import {
    Container,
    Stack,
    Typography,
    Grid,
    Box,
    Step,
    Stepper,
    StepLabel,
    StepIcon,
} from "@mui/material";
import { BuildCircle, CheckCircle } from "@mui/icons-material";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import { withStyles } from "@mui/styles";

const ActiveStepIcon = withStyles((theme) => ({
    root: {
        color: "#00FF00", // Green for active step
    },
}))(StepIcon);

const CompletedStepIcon = withStyles((theme) => ({
    root: {
        color: "#808080", // Grey for completed step
    },
}))(StepIcon);

function PerbaikanDetail() {
    const { id } = useParams();
    const [detailPerbaikan, setDetailPerbaikan] = useState(null);

    useEffect(() => {
        const getUserdetailPerbaikanDetail = async () => {
            try {
                const token = Cookies.get("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(
                    `http://127.0.0.1:3000/user/perbaikan/detail/${id}`,
                    { headers }
                );
                console.log(response.data["Data Perbaikan"]);
                setDetailPerbaikan(response.data["Data Perbaikan"]);
            } catch (error) {
                console.log(error);
            }
        };

        getUserdetailPerbaikanDetail();
    }, [id]);

    return (
        <div>
            <AppAppBar />
            {detailPerbaikan && (
                <Container sx={{ mt: 5 }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={5}
                    >
                        <Typography variant="h4" gutterBottom>
                            Detail Perbaikan
                        </Typography>
                    </Stack>
                    <Box
                        sx={{
                            p: 4,
                            bgcolor: "background.paper",
                            boxShadow: 1,
                            borderRadius: 2,
                            overflowX: "auto",
                        }}
                    >
                        {detailPerbaikan ? (
                            <div
                                style={{
                                    display: "block",
                                    overflowX: "auto",
                                    whiteSpace: "nowrap",
                                    flexWrap: "nowrap",
                                }}
                            >
                                <Grid
                                    container
                                    spacing={{ xs: 3, sm: 2 }}
                                    sx={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                    }}
                                >
                                    <Grid item xs={12} sm={4}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            Kode Perbaikan :
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            {detailPerbaikan.kodePerbaikan}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    spacing={{ xs: 3, sm: 2 }}
                                    sx={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                    }}
                                >
                                    <Grid item xs={12} sm={4}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            Pelanggan:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            {
                                                detailPerbaikan.Antrian?.User
                                                    ?.nama
                                            }
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    spacing={{ xs: 3, sm: 2 }}
                                    sx={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                    }}
                                >
                                    <Grid item xs={12} sm={4}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            Kendala :
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            {detailPerbaikan.kendala}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    spacing={{ xs: 3, sm: 2 }}
                                    sx={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                    }}
                                >
                                    <Grid item xs={12} sm={4}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            Perangkat :
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            {detailPerbaikan.perangkat}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    spacing={{ xs: 3, sm: 2 }}
                                    sx={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                    }}
                                >
                                    <Grid item xs={12} sm={4}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            Teknisi :
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            {detailPerbaikan.teknisi?.nama}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    spacing={{ xs: 3, sm: 2 }}
                                    sx={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                    }}
                                >
                                    <Grid item xs={12} sm={4}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            Tanggal Perbaikan :
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            {moment(
                                                detailPerbaikan.Antrian
                                                    ?.TanggalAntrian
                                            )
                                                .locale("id")
                                                .format("DD MMMM YYYY")}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    spacing={{ xs: 3, sm: 2 }}
                                    sx={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                    }}
                                >
                                    <Grid item xs={12} sm={4}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            Status :
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            {detailPerbaikan.status}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={{ xs: 3, sm: 2 }}
                                    sx={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                    }}
                                >
                                    <Grid item xs={12} sm={4}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            Biaya :
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(detailPerbaikan.biaya)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        ) : (
                            <Typography>Loading perbaikan data...</Typography>
                        )}
                    </Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mt={5}
                        mb={5}
                    >
                        <Typography variant="h4" gutterBottom>
                            Status Perbaikan
                        </Typography>
                    </Stack>
                    <Box
                        sx={{
                            p: 4,
                            bgcolor: "background.paper",
                            boxShadow: 1,
                            borderRadius: 2,
                        }}
                    >
                        {detailPerbaikan?.Statuses &&
                        detailPerbaikan.Statuses.length > 0 ? (
                            <Stepper orientation="vertical">
                                {detailPerbaikan.Statuses.map(
                                    (status, index) => (
                                        <Step
                                            key={index}
                                            active={
                                                index === 0 &&
                                                detailPerbaikan.status ===
                                                    "Option 1"
                                            } // Set the first step as active
                                            completed={index !== 0} // Set all other steps as completed
                                        >
                                            <StepLabel
                                                classes={{
                                                    completed: "completed",
                                                    active: "active",
                                                }}
                                                icon={
                                                    index === 0 ? (
                                                        <BuildCircle />
                                                    ) : (
                                                        <CheckCircle
                                                            style={{
                                                                color: "#00FF00",
                                                            }}
                                                        />
                                                    )
                                                }
                                            >
                                                <Typography
                                                    variant="h6"
                                                    component="h3"
                                                    className={
                                                        index === 0
                                                            ? "active"
                                                            : "completed"
                                                    }
                                                >
                                                    {status.status}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    component="p"
                                                    className={
                                                        index === 0
                                                            ? "active"
                                                            : "completed"
                                                    }
                                                >
                                                    {moment(status.createdAt)
                                                        .locale("id")
                                                        .format("DD MMMM YYYY")}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    component="p"
                                                    className={
                                                        index === 0
                                                            ? "active"
                                                            : "completed"
                                                    }
                                                >
                                                    {moment(status.createdAt)
                                                        .locale("id")
                                                        .format("HH:mm")}
                                                </Typography>
                                            </StepLabel>
                                        </Step>
                                    )
                                )}
                            </Stepper>
                        ) : (
                            <>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    mb={3}
                                >
                                    Belum ada status.
                                </Typography>
                            </>
                        )}
                    </Box>
                </Container>
            )}
        </div>
    );
}

export default withRoot(PerbaikanDetail);
