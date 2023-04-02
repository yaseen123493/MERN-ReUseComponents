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

export default function SignIn() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/auth/login", data);
      Cookies.set("TOKEN", result?.data?.token);
      localStorage.setItem("LoginId", result?.data?.user?.email);
      navigate("/");
    } catch (error: any) {
      console.log(error?.response?.data?.msg);
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
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "whitesmoke",
              padding: 5,
              borderRadius: "1rem",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
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
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={data.email}
                onChange={(e) => {
                  setData((prevData: any) => {
                    return { ...prevData, email: e.target.value };
                  });
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.password}
                onChange={(e) => {
                  setData((prevData: any) => {
                    return { ...prevData, password: e.target.value };
                  });
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                <b>Sign In</b>
              </Button>
              <Grid container>
                <Grid item xs={6} md={6}>
                  <Link
                    to="/forgot-password"
                    style={{
                      textDecoration: "none",
                      color: "#000",
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Link
                    to="/signUp"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Footer sx={{ mt: 8, mb: 4 }} />
        </Container>
      </>
    </>
  );
}
