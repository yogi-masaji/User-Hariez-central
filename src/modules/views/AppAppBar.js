import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import logoBlack from "../../assets/logoBlack.png";
import JadwalAntrianModal from "./JadwalAntrianModal";
const rightLink = {
    fontSize: 16,
    color: "common.white",
    ml: 3,
};
const useStyles = makeStyles((theme) => ({
    jadwalAntrianModal: {
        display: "block",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

function AppAppBar() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const token = Cookies.get("token");
    const navigate = useNavigate();
    const classes = useStyles();
    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
        document.documentElement.style.overflowX = "hidden";
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        document.documentElement.style.overflowX = "auto";
    };

    const handleLogout = () => {
        setLoading(true); // Set loading state to true
        setTimeout(() => {
            Cookies.remove("token");
            Cookies.remove("data");
            navigate("/");
            setLoading(false); // Set loading state to false
            window.location.reload(); // Refresh the page
        }, 2000);
    };

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }} />
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        href="/"
                    >
                        <img
                            src={logoBlack}
                            alt="hariez central service"
                            style={{ height: "48px", verticalAlign: "middle" }}
                        />
                    </Link>
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        {/* Render burger menu on mobile */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            sx={{ display: { md: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* Render "Call to Action" button */}
                        <div className={classes.jadwalAntrianModal}>
                            <JadwalAntrianModal />
                        </div>

                        {/* Render "Sign In", "Sign Up", and "Logout" links */}
                        {!token && (
                            <>
                                <Link
                                    color="inherit"
                                    variant="h6"
                                    underline="none"
                                    href="/sign-in"
                                    sx={{
                                        ...rightLink,
                                        display: { xs: "none", md: "block" },
                                    }}
                                >
                                    {"Sign In"}
                                </Link>
                                <Link
                                    variant="h6"
                                    underline="none"
                                    href="/sign-up"
                                    sx={{
                                        ...rightLink,
                                        color: "#FFA500",
                                        display: { xs: "none", md: "block" },
                                    }}
                                >
                                    {"Sign Up"}
                                </Link>
                            </>
                        )}
                        {token && (
                            <>
                                <Link
                                    color="inherit"
                                    variant="h6"
                                    underline="none"
                                    href="/perbaikanku"
                                    sx={{
                                        ...rightLink,
                                        display: { xs: "none", md: "block" },
                                    }}
                                >
                                    {"My Orders"}
                                </Link>
                                <Link
                                    color="inherit"
                                    variant="h6"
                                    underline="none"
                                    href="/profile"
                                    sx={{
                                        ...rightLink,
                                        display: { xs: "none", md: "block" },
                                    }}
                                >
                                    {"Profile"}
                                </Link>
                                {loading ? (
                                    <CircularProgress
                                        size={24}
                                        sx={{ color: "common.white", ml: 2 }}
                                    />
                                ) : (
                                    <Link
                                        color="inherit"
                                        variant="h6"
                                        underline="none"
                                        onClick={handleLogout}
                                        sx={{
                                            ...rightLink,
                                            display: {
                                                xs: "none",
                                                md: "block",
                                            },
                                            cursor: "pointer",
                                        }}
                                    >
                                        {"Logout"}
                                    </Link>
                                )}
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
            {/* Render the drawer (burger menu) */}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    sx: {
                        width: 250, // Adjust the width of the drawer
                    },
                }}
                sx={{
                    display: { md: "none" },
                }}
            >
                <List>
                    <JadwalAntrianModal />
                    {!token && (
                        <>
                            <ListItem
                                button
                                component={Link}
                                href="/sign-in"
                                onClick={handleDrawerClose}
                            >
                                <ListItemText primary="Sign In" />
                            </ListItem>
                            <ListItem
                                button
                                component={Link}
                                href="/sign-up"
                                onClick={handleDrawerClose}
                            >
                                <ListItemText primary="Sign Up" />
                            </ListItem>
                        </>
                    )}
                    {token && (
                        <>
                            <ListItem
                                button
                                component={Link}
                                href="/pesananku"
                                onClick={handleDrawerClose}
                            >
                                <ListItemText primary="My Orders" />
                            </ListItem>
                            <ListItem
                                button
                                component={Link}
                                href="/profile"
                                onClick={handleDrawerClose}
                            >
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem button>
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    <ListItemText
                                        primary="Logout"
                                        onClick={handleLogout}
                                    />
                                )}
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>
        </div>
    );
}

export default AppAppBar;
