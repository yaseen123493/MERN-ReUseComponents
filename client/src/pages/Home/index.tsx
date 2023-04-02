import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";

export default function Home() {
  const [data, setData] = useState<any>(null);

  const getUserDetails = async () => {
    try {
      const token = Cookies.get("TOKEN");
      const bodyData = {
        email: localStorage.getItem("LoginId"),
      };
      const result = await axios.post("http://localhost:5000/user", bodyData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });
      setData(result?.data?.user);
    } catch (error) {}
  };

  useEffect(() => {
    console.log("hello world!");
  }, []);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Typography color={"primary"} variant="h4">
          Welcome Home! -{" "}
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              getUserDetails();
            }}
          >
            get user details
          </Button>
        </Typography>
        {!!data && (
          <>
            <hr />
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={700}>
                Name
              </Typography>
              <Typography variant="body2">
                {" "}
                {data?.firstName + " " + data?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={700}>
                Phone
              </Typography>
              <Typography variant="body2">{data?.phone}</Typography>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
}
