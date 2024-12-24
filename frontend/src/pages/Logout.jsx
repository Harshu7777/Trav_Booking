export const logoutUser = async (navigate) => {
    try {
      const response = await fetch("http://localhost:4000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (response.ok) {
        localStorage.removeItem("userToken");
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  import React from "react";
  import { useNavigate } from "react-router-dom";
  import { Button } from "@mui/material";
  
  const Logout = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logoutUser(navigate);
    };
  
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{
          color: "white",
          backgroundColor: "red",
          "&:hover": { backgroundColor: "darkred" },
        }}
      >
        Logout
      </Button>
    );
  };
  
  export default Logout;
  