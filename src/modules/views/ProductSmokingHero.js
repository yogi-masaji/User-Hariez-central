import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";

function ProductSmokingHero() {
    const whatsappNumber = "6281313006700";
    return (
        <Container
            component="section"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 9,
                marginTop: 15,
            }}
        >
            <Button
                sx={{
                    border: "4px solid currentColor",
                    borderRadius: 0,
                    height: "auto",
                    py: 2,
                    px: 5,
                }}
            >
                <Typography sx={{ typography: { sm: "h4", xs: "h6" } }}>
                    <Link href={`https://wa.me/${whatsappNumber}`}>
                        Contact us on WhatsApp{" "}
                        <WhatsAppIcon
                            sx={{
                                fontSize: { sm: "3rem", xs: "2rem" },
                                color: "#075e54",
                                ml: 1,
                            }}
                        />
                    </Link>
                </Typography>
            </Button>
            <Typography variant="subtitle1" sx={{ my: 3 }}>
                We are here to help. Get in touch!
            </Typography>
            <Box
                component="img"
                src="/static/themes/onepirate/producBuoy.svg"
                alt="buoy"
                sx={{ width: 60 }}
            />
        </Container>
    );
}

export default ProductSmokingHero;
