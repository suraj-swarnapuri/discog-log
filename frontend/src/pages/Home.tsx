import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  // Access the state object
  const userData = location.state?.user;
  console.log(userData);

  return (
    <div>
      <h2>Home Page</h2>
      {userData ? (
        <div>
          <p>Name: {userData.Name}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Home;