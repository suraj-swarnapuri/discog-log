import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";

interface User {
  Name: string;
  // Add other user properties if needed
}

const Home = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/user");
      if (!response.ok) {
        navigate("/login");
        return;
      }
      const data = await response.json();
      setUserData(data);
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data and navigate to login page
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUserData(null);
    navigate("/login");
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userData ? `Welcome, ${userData.Name}` : "Loading..."}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <Button variant="contained" color="primary" sx={{ mb: 2 }}>
            RegisterDiscog
          </Button>
          <Button variant="contained" color="secondary">
            RegisterSpotify
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Home;