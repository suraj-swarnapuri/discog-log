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

  const handleDiscog = async () => {
    const registerDiscog = async () => {
      const response = await fetch("/api/discog/register",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        console.log("Failed to register Discog");
        return;
      }else{
        console.log("Discog registered successfully");
      }

    };

    const authDiscog = async () => {
      const response = await fetch("/api/discog/auth");
      if (!response.ok) {
        console.log("Failed to authenticate Discog");
        return;
      }
      const data = await response.json();
      return data["url"];
    }

    registerDiscog();
    let url = await authDiscog();
    if (url) {
      window.open(url);
    }
//    window.open("www.google.com", "_blank");

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
          <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleDiscog}>
            Register Discog
          </Button>
          <Button variant="contained" color="secondary">
            Register Spotify
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Home;