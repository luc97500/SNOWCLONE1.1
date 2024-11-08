import React, { useState, useRef } from "react";
import { Button, TextField, Checkbox, Grid, Box, Typography, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import logi from "../asset/login-passcode.png";
import s from "../asset/s.jpg";
import { Link , useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";

const theme = createTheme();

export const SignUp = () => {
    const navigate = useNavigate();

    const [reminder, setReminder] = useState(false)

    const [formField, setFormField] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
    });

    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onChangeInput = (e) => {
        setFormField(formFields => ({
            ...formFields,
            [e.target.name]: e.target.value
        }));
    }

    const validatePhone = (value) => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(value);
    };

    const validateEmail = (value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    };

    const handleSubmit =  async (event) => {
        event.preventDefault();

        if (formField.name === '') {
            toast.error("Please Add User Name");
            nameRef.current.focus();
            return;
        }
        else if (formField.phone === '') {
            toast.error("Please Add Phone Number");
            phoneRef.current.focus();
            return;
        }

        else if (!validatePhone(formField.phone)) {
            toast.error('Phone number must be 10 digits.');
            phoneRef.current.focus();
            return;
        }

        else if (formField.email === '') {
            toast.error("Please Add Email");
            emailRef.current.focus();
            return;
        }

        else if (!validateEmail(formField.email)) {
            toast.error('Invalid email address.');
            emailRef.current.focus();
            return;
        }


        else if (formField.password === '') {
            toast.error("Please Set Password");
            passwordRef.current.focus();
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/signup', formField); 

        if(response?.status == 201){
            Swal.fire({
                title: `GREAT USER : ${response.data.user.name} REGISTERED !`,
                text: "PLEASE LOGIN AGAIN!",
                icon: "success",
            })
            localStorage.setItem('UserName', response.data.user.name);
            
        if(reminder){
            localStorage.setItem('email', response.data.user.email);
            setReminder(false)
        }else{
            localStorage.removeItem('email');
        }

        localStorage.setItem('token', response.data.token);
        navigate("/");
        }
        } catch (error) {
            Swal.fire({
                title: `OOPS ! : ${error?.response?.data.msg} !`,
                text: "PLEASE SIGNUP AGAIN!",
                icon: "error",
            })
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer
                style={{ justifyContent: "center", display: "flex", top: "20px" }}
            />
            <Box 
                sx={{
                    backgroundImage: `url(${s})`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register Your Account
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Username"
                                name="name"
                                inputRef={nameRef}
                                value={formField.name}
                                onChange={onChangeInput}
                                error={formField.name === ""}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                inputProps={{ maxLength: 10 }} 
                                inputRef={phoneRef}
                                value={formField.phone}
                                label="Phone"
                                type="tel"
                                id="phone"
                                onChange={onChangeInput}
                                error={formField.phone === "" || !validatePhone(formField.phone)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                inputRef={emailRef}
                                value={formField.email}
                                label="Email"
                                type="email"
                                id="email"
                                onChange={onChangeInput}
                                error={formField.email === ""}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                inputRef={passwordRef}
                                value={formField.password}
                                label="Password"
                                type="password"
                                id="password"
                                onChange={onChangeInput}
                                error={formField.password === ""}
                            />
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" onChange={(e)=> setReminder(true)}/>}
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
                                Register
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item sx={{ color: "blue" }}>
                                    <Link to="/" variant="body2">
                                        {"Back To Login Page"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
