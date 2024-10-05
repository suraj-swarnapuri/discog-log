import React, { useEffect, useState } from "react";

const Home = () => {
  interface User {
    Name: string;
  }

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUserData(data);
    };

    fetchData();
  }, []);

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