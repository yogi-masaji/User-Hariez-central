import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import { styled } from "@mui/system";
import { CssBaseline } from "@mui/material";
import Home from "./Home";
import Privacy from "./Privacy";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Terms from "./Terms";
import PesananKu from "./PesananComponent";
import PerbaikanDetail from "./PerbaikanDetail";
import PerbaikanDetailNoAuth from "./PerbaikanDetailNoAuth";
import Profiles from "./Profiles";
import NotFound from "./NotFound";
import PembayaranPage from "./PembayaranPage";

const PoppinsCssBaseline = styled(CssBaseline)`
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");

    body {
        font-family: "Poppins", sans-serif;
    }
`;

export default function App() {
    const token = Cookies.get("token");

    return (
        <Router>
            <PoppinsCssBaseline />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                {token ? (
                    <>
                        <Route path="/perbaikanku" element={<PesananKu />} />
                        <Route
                            path="/perbaikanku/:id"
                            element={<PerbaikanDetail />}
                        />
                        <Route path="/profile" element={<Profiles />} />
                        <Route
                            path="/pembayaran/:id"
                            element={<PembayaranPage />}
                        />
                    </>
                ) : (
                    <Route path="/*" element={<Navigate to="/sign-in" />} />
                )}
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                    path="/perbaikan/status/:id"
                    element={<PerbaikanDetailNoAuth />}
                />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
