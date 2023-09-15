import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
// @mui
import { Stack, IconButton, TextField, Checkbox, Alert, Typography, FormHelperText, Modal } from "@mui/material";
import { green } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LoadingButton } from "@mui/lab";
// components
import withRoot from "./modules/withRoot";

// ----------------------------------------------------------------------

function SignIn() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/sign-in", { replace: true });
      }, 2000);
    }
  }, [isSuccess, navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    
    const fields = [
      { value: nama, message: "Please enter name" },
      { value: email, message: "Please enter email" },
      { value: nomorTelepon, message: "Please enter phone number" },
      { value: password, message: "Please enter password" },
    ];

    for (const field of fields) {
      if (!field.value) {
        setIsError(true);
        setErrorMessage(field.message);
        return;
      }
    }

    if (password.length < 8) {
      setIsError(true);
      setErrorMessage("Password should be at least 8 characters long.");
      return;
    }
    setIsLoading(true);

    if (!/\S+@\S+\.\S+/.test(email)) {
      setIsError(true);
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    axios
      .post("http://127.0.0.1:3000/user/signup", {
        nama,
        email,
        password,
        nomorTelepon,
      })
      .then((response) => {
        console.log(response.data);
        setIsSuccess(true);
        setIsError(false);
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsSuccess(false);
        setIsLoading(false);
        if (error.response?.data?.message === "wrong email/password") {
          setErrorMessage(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };
  const handleCloseModal = () => {
    setIsSuccess(false);
    navigate("/sign-in", { replace: true });
  };
  const handleNomorTeleponChange = (e) => {
    setNomorTelepon(e.target.value.replace(/\D/g, ""));
    if (isError) {
      setIsError(false);
      setErrorMessage("");
    }
  };
  const handleNamaChange = (e) => {
    setNama(e.target.value);
    if (isError) {
      setIsError(false);
      setErrorMessage("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (isError) {
      setIsError(false);
      setErrorMessage("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (isError) {
      setIsError(false);
      setErrorMessage("");
    }
  };

  return (
    <>
      <AppAppBar />
      <AppForm>
        <Stack spacing={3} sx={{ my: 5 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <TextField
            name="nama"
            label="Nama"
            value={nama}
            onChange={handleNamaChange}
          />
          <TextField
            name="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            name="nomor telepon"
            label="Nomor Telepon"
            value={nomorTelepon}
            onChange={handleNomorTeleponChange}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />

          {isError && (
            <Alert
              severity="error"
              onClose={() => setIsError(false)}
              sx={{
                backgroundColor: "#f44336", // Custom background color
                color: "#ffffff", // Custom text color
                borderRadius: "8px", // Custom border radius
                marginTop: "16px", // Custom margin top
              }}
            >
              {errorMessage}
            </Alert>
          )}

          <Typography>
            Already have an account?
            <Link to="/sign-in">Sign in</Link>
          </Typography>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleClick}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Sign Up..." : "Sign Up"}
        </LoadingButton>
      </AppForm>
      <Modal open={isSuccess} onClose={handleCloseModal}>
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "90%",
      width: 400,
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#ffffff",
      borderRadius: 8,
    }}
  >
    <AccountCircleIcon sx={{ fontSize: 64, color: green[500], mb: 2 }} />
    <Typography variant="h6" gutterBottom sx={{ color: green[500], mb: 2 }}>
      Account Created
    </Typography>
    <Typography variant="body1">
      Your account has been successfully created. You will be redirected to the sign-in page in a moment.
    </Typography>
  </div>
</Modal>
      <AppFooter />
    </>
  );
}

export default withRoot(SignIn);
