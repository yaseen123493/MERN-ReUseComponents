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
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const param = useParams();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const bodyData = {
        password: password,
        confirmPassword: confirmPassword,
      };
      const result = await axios.post(
        `http://localhost:5000/auth/reset-password/${param.token}`,
        bodyData
      );
      alert(result?.data?.message);
      navigate("/signIn");
    } catch (error: any) {
      alert(error?.response?.data?.message);
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
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              required
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              <b>Update</b>
            </Button>
          </Box>
        </Box>
        <Footer sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
