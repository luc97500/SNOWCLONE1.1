import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  TextField,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import logi from "../asset/login-passcode.png";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";

const theme = createTheme();

export const LoginPge = () => {
  const navigate = useNavigate();

  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onChangeInput = (e) => {
    setFormField((formFields) => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formField.email === "") {
      toast.error("Please Enter Email");
      emailRef.current.focus();
      return;
    } else if (!validateEmail(formField.email)) {
      toast.error("Invalid Email");
      emailRef.current.focus();
      return;
    } else if (formField.password === "") {
      toast.error("Please Enter Password");
      passwordRef.current.focus();
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signin",
        formField
      );
      if (response.status === 201) {
        Swal.fire({
          title: `Hurry!`,
          text: "User Login Successfully !",
          icon: "success",
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("UserName", response.data.user.name);
        localStorage.setItem("email", response.data.user.email);

        if (reminder) {
          localStorage.setItem("email", response.data.user.email);
          setReminder(false);
        } else {
          localStorage.removeItem("email");
        }
        navigate("/home");
      }
    } catch (error) {
      console.error("API Request Error: ", error); // More detailed logging
      if (error.response) {
        Swal.fire({
          title: `OOPS ! : ${error.response?.data?.msg} !`,
          text: "PLEASE LOGIN AGAIN!",
          icon: "error",
        });
      } else if (error.request) {
        // Request was made but no response received
        Swal.fire({
          title: "Network Error",
          text: "Please check your internet connection.",
          icon: "error",
        });
      } else {
        // Something happened in setting up the request
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred.",
          icon: "error",
        });
      }
    }
  };

  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setFormField((prevFields) => ({
        ...prevFields,
        email: savedEmail,
      }));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        style={{ justifyContent: "center", display: "flex", top: "20px" }}
      />

      <Box
        sx={{
          backgroundImage: `url(${logi})`, // Use the imported image
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          position: "relative",
          padding: 4,
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: 4,
              borderRadius: 3,
              boxShadow: 4,
              position: "relative",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login Here
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                inputRef={emailRef}
                name="email"
                value={formField.email}
                onChange={onChangeInput}
                error={formField.email === ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formField.password}
                id="password"
                onChange={onChangeInput}
                inputRef={passwordRef}
                error={formField.password === ""}
              />
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Link to="/signup" variant="body2">
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        onChange={(e) => setReminder(true)}
                      />
                    }
                    label="Remember Me"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#f50057" }}
              >
                Login
              </Button>
              <Grid container justifyContent="center">
                <Grid item sx={{ color: "blue" }}>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          padding: 1,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
        }}
      ></Box>
    </ThemeProvider>
  );
};

// export default LoginPge;
