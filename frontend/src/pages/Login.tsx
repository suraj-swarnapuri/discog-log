import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid2,
} from "@mui/material";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const cookies = document.cookie;

      // Optionally, parse the cookie to extract user data
      const userCookie = cookies
        .split("; ")
        .find((row) => row.startsWith("user_id="));
      if (userCookie) {
        navigate("/",);
      }
    };

    fetchData();
  }, []);

  const handleLogin = async () => {
   // grab email and password and validate it in the backend
   // if 200 OK then navigate to the home page
   // if not show an error message on the screen
   const response = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.status === 200) {
      console.log("User registered successfully");
      navigate("/",);
    } else {
      console.log("User registration failed");
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid2 container justifyContent={"flex-end"}>
              <Link to="/register">Don't have an account? Register</Link>
            </Grid2>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
