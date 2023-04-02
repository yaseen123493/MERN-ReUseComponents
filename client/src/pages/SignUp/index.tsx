import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

export default function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5000/auth/signup",
        data
      );

      console.log(result?.data?.msg);
    } catch (err: any) {
      console.log(err?.response?.data?.msg);
    }
  };

  const Token = Cookies.get("TOKEN");

  useEffect(() => {
    if (Token !== undefined) {
      navigate("/", { replace: true });
    }
  }, [Token]);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
              backgroundColor: "whitesmoke",
              padding: 5,
              borderRadius: "1rem",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autoComplete="given-name"
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={data.firstName}
                  onChange={(e) => {
                    setData((prevData: any) => {
                      return { ...prevData, firstName: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={data.lastName}
                  onChange={(e) => {
                    setData((prevData: any) => {
                      return { ...prevData, lastName: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => {
                    setData((prevData: any) => {
                      return { ...prevData, email: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={data.password}
                  onChange={(e) => {
                    setData((prevData: any) => {
                      return { ...prevData, password: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={data.confirmPassword}
                  onChange={(e) => {
                    setData((prevData: any) => {
                      return { ...prevData, confirmPassword: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="number"
                  id="number"
                  autoComplete="phone-Number"
                  value={data.phone}
                  onChange={(e) => {
                    setData((prevData: any) => {
                      return { ...prevData, phone: e.target.value };
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/signIn"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
