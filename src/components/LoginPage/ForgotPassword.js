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


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", emailId: "" });
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

    if (!user.username || !user.emailId) {
      setError("Please fill all required fields!");
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        LOGIN_ID: user.username,
        EMAIL_ID: user.emailId,
      };

      const response = await axios.post(`${apiUrl}/api/auth/forgot-password`, requestData);

      if (response.status === 200) {
        setSuccess("Password Changed successful!");
       
          setModal({
            open: true,
            title: "Password Changed Successfully!",
            message: "Your password has been reset. Please check your email for confirmation.",
            img: <CheckCircle sx={{fontSize:'35px !important', color:'green'}} />,
          });
          setTimeout(() => {
            navigate('/changePassword');
          }, 3000);
      } else {
        setError(response.data || "Invalid credentials!");
      }
    } catch (err) {
      setError("Password change failed. Please try again.");
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
            <Typography variant="h4" gutterBottom>
              Forgot Password
            </Typography>
            <Typography mb={2} variant="body2" color={'gray'}>Enter your registered email, and we'll send the reset password to your registered email ID.!</Typography>
            <form onSubmit={handleForgotPassword}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <FormLabel>Login ID</FormLabel>
                  <TextField
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter your login ID"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel>Mail ID</FormLabel>
                  <TextField
                    type="text"
                    name="emailId"
                    value={user.emailId}
                    onChange={handleChange}
                    required
                    placeholder="Enter your Mail ID"
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
                    variant="text"
                    color="primary"
                    size="small"
                    onClick={() => navigate(-1)}
                    >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="large"
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

export default ForgotPassword;
