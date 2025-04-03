import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader/loader";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Card,
  Stack,
} from "@mui/material";
import bgimg from "./solarimg.jpg";
import TransitionsModal from "./Modal";
import { CheckCircle } from "@mui/icons-material";


const ChangePassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    action: null,
    img: "",
  });

  useEffect(() => {
    console.log("API URL:", apiUrl);
  }, [apiUrl]);

  // **Handle Input Change**
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user.oldPassword || !user.newPassword || !user.confirmPassword) {
      setError("Please fill all required fields!");
      return;
    }
    if(user.newPassword !== user.confirmPassword){
        setError("Passwords do not match. Please try again");
        return;  
    }
    setLoading(true);
    try {
      const requestData = {
        oldPassword: user.oldPassword,
        newPassword: user.confirmPassword,
      };

      const response = await axios.post(`${apiUrl}/api/UpdatePassword`, requestData);

      if (response.status === 200) {
        setSuccess("Password Updated successful!");
       
          setModal({
            open: true,
            title: "Password Updated Successfully!",
            message: "Your password has been Updated.",
            img: <CheckCircle sx={{fontSize:'35px !important', color:'green'}} />,
          });
          setTimeout(() => {
            navigate('/');
          }, 3000);
      } else {
        setError(response.data || "Invalid credentials!");
      }
    } catch (err) {
      setError("Password updating failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            backgroundImage: `url(${bgimg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Card sx={{ p: 4, maxWidth: 400, width: "100%", boxShadow: 3 }}>
            <Typography variant="h4" mb={1} gutterBottom>
              Change Password
            </Typography>
            <form onSubmit={handleForgotPassword}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <FormLabel>Old Password</FormLabel>
                  <TextField
                    type="text"
                    name="oldPassword"
                    value={user.oldPassword}
                    onChange={handleChange}
                    required
                    placeholder="Enter your Old Password"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel>New Password</FormLabel>
                  <TextField
                    type="password"
                    name="newPassword"
                    value={user.newPassword}
                    onChange={handleChange}
                    required
                    placeholder="Enter your New Password"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel>Confirm New Password</FormLabel>
                  <TextField
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm New Password"
                    variant="outlined"
                  />
                </FormControl>
                <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexGrow={1}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    >
                    Submit
                  </Button>
                </Box>
              </Stack>
            </form>
          </Card>
          <TransitionsModal
          open={modal.open}
          onClose={() => setModal({ ...modal, open: false })}
          title={modal.title}
          message={modal.message}
          action={modal.action}
          img={modal.img}
        />
        </Box>
      )}
    </>
  );
};

export default ChangePassword;
