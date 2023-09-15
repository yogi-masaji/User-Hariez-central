import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography, Tab, Tabs } from "@mui/material";
import withRoot from "./modules/withRoot";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import DataPerbaikan from "./modules/views/DataPerbaikan";
import DataKomplain from "./modules/views/DataKomplain";
import DataBooking from "./modules/views/DataBooking";

function TabPanel({ value, index, children }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function PesananKu() {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <>
            <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
                <AppAppBar />
                <Container>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mt={5}
                        mb={5}
                    >
                        <Typography variant="h4" gutterBottom>
                            Perbaikan
                        </Typography>
                    </Stack>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="Perbaikan Tabs"
                        sx={{
                            bgcolor: "white",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Tab label="Riwayat perbaikan" value={0} />
                        <Tab label="Booking" value={1} />
                        <Tab label="Komplain" value={2} />
                    </Tabs>
                    <TabPanel value={activeTab} index={0}>
                        <DataPerbaikan />
                    </TabPanel>
                    <TabPanel value={activeTab} index={1}>
                        <DataBooking />
                    </TabPanel>
                    <TabPanel value={activeTab} index={2}>
                        <DataKomplain />
                    </TabPanel>
                </Container>
            </div>
        </>
    );
}

export default withRoot(PesananKu);
