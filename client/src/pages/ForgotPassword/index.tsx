import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Footer from "../../components/Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const bodyData = {
        email: email,
      };
      const result: any = await axios.post(
        "http://localhost:5000/auth/forgot-password",
        bodyData
      );
      alert(result?.data?.message);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };
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
            backgroundColor: "whitesmoke",
            padding: 5,
            borderRadius: "1rem",
          }}
        >
          <Typography component="h1" variant="h5">
            Forgot Password
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              <b>Send Email</b>
            </Button>
          </Box>
        </Box>
        <Footer sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
