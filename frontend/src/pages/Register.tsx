import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const cookies = document.cookie;

      // Optionally, parse the cookie to extract user data
      const userCookie = cookies
        .split("; ")
        .find((row) => row.startsWith("user_id="));
      if (userCookie) {
        const response = await fetch("/api/user");
        if (response.status === 200) {
          navigate("/",);
        }
      }
    };

    fetchData();
  }, []);

  const handleRegister = async () => {
    // grab name, email and password and validate it in the backend
    // if 200 OK then navigate to the home page
    // if not show an error message on the screen
    const response = await fetch("http://localhost:8000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

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
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid2 container spacing={2}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </Grid2>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid2 container justifyContent="flex-end">
                <Link to="/login">Already have an account? Login</Link>
            </Grid2>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;