import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, TextField, Container, Box } from "@mui/material";

interface User {
  Name: string;
  // Add other user properties if needed
}

const Home = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [discogtoken, setDiscogToken] = useState("");
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

  const handleSubmit = async () => {
    // Handle form submission
    const response = await fetch("http://localhost:8000/api/discog/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ discogtoken }),
    });
    if (response.status === 200) {
      setDiscogToken("");
      setIsFormVisible(false);
      console.log("Form submitted successfully");
    } else {
      console.log("Form submission failed");
    }
  }

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
    console.log(url)
    if (url) {
      window.open(url);
      setIsFormVisible(true);
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
            {isFormVisible && (
            <Box sx={{ mt: 2 }}>
              <TextField label="Enter something" variant="outlined" sx={{ mb: 2 }} value={discogtoken} onChange={(e) => setDiscogToken(e.target.value)} />
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          )}
            
          <Button variant="contained" color="secondary">
            Register Spotify
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Home;