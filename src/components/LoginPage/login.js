import React, { useEffect, useRef, useState } from "react";
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
  Select,
  MenuItem,
  Card,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import bgimg from "./solarimg.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { jwtDecode } from 'jwt-decode';

const OTPInput = ({ length = 6 }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Only allow single digit input
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    // Move focus to previous input on backspace
    if (value === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // Move focus to previous input on backspace if current input is empty
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {otp.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          style={{
            width: "40px",
            height: "40px",
            margin: " 0px 5px",
            textAlign: "center",
            fontSize: "18px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      ))}
    </div>
  );
};

const Login = ({token, setToken}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", otp: "" });
  const [userType, setUserType] = useState("mskvyUser"); // Default: MSKVY User
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [time, setTime] = useState(30);
  const [otpDisabled, setOtpDisabled] = useState(false);
  const [logedInUser, setLogedInUser] = useState([]);

  useEffect(() => {
    if (otpSent && time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
  
      return () => clearInterval(timer);
    } else if (time === 0) {
      setOtpDisabled(true); // Disable OTP input when timer reaches 0
    }
  }, [time, otpSent]);

  const formatTime = (seconds) => {
    return `00:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    console.log("API URL:", apiUrl);
  }, [apiUrl]);

  // **Handle Input Change**
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // ✅ Request OTP: Store full model
  const requestOTP = async (e, act) => {
    if (e && e.preventDefault) e.preventDefault(); // Prevent default form submission

    if (!user.username) {
      setError("Enter your Login ID to receive OTP!");
      return;
    }
    setOtpLoading(true);
    try {
      let requestData = {
        LOGIN_ID: user.username,
        UserType: userType,
        PASSWORD: user.password || "",
        OTP: "",
        action: act,
      };

      const response = await axios.post(`${apiUrl}/api/login`, requestData);

      if (response.status === 200 && response.data.Status === "OTP Sent") {
        setOtpSent(true);
        setOtpDisabled(false);
        setTime(30);
        setOtpLoading(false);
        console.log("✅ Full Data:", response.data);
        console.log("✅ Full Model Data:", response.data.Model);
        if (response.data.Model) {
          setUser((prev) => ({
            ...prev,
            ...response.data.Model, // ✅ Store full model
            otp: response.data.Model.tempOTP, // ✅ Keep OTP for auto-fill
          }));
        } else {
          setError("OTP Sent, but model data is missing.");
        }
      } else {
        setError(response.data.Status || "Failed to send OTP");
      }
    } catch (err) {
      setLoading(false);
      setError("Server error. Try again later.");
    }
  };

  // ✅ Login Request: Store user session properly
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user.username || (!user.password && !otpSent)) {
      setError("Please fill all required fields!");
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        LOGIN_ID: user.username,
        UserType: userType,
        PASSWORD: user.password || undefined,
        OTP: otpSent ? user.otp : undefined,
        action: "login",
      };

      const response = await axios.post(`${apiUrl}/api/login`, requestData);

      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.Token);
        setToken(response.data.token); 
        
        const decodedUserData = jwtDecode(response.data.Token); // Decode the JWT token
        setLogedInUser(decodedUserData);
        console.log(decodedUserData);
        
        setSuccess("Login successful!");
        console.log("✅ Full Model Data:", response.data.Model);

        if (response.data.Model) {
          setUser((prev) => ({
            ...prev,
            ...response.data.Model, // ✅ Store full model after login
          }));

          sessionStorage.setItem("user", JSON.stringify(response.data.Model)); // ✅ Store full model in session
        }
        if (response.data.SessionData) {
          setSessionData((prev) => ({
            ...prev,
            ...response.data.SessionData, // ✅ Store full model after login
          }));

          sessionStorage.setItem(
            "sessionData",
            JSON.stringify(response.data.SessionData)
          ); // ✅ Store full model in session
        }
        console.log(response.data.RedirectTo);
        if (response.data.RedirectTo === "Login") {
          setTimeout(() => {
            navigate("/");
          }, 200);
        } else if (response.data.RedirectTo === "Dashboard") {
          setTimeout(() => {
            navigate("/home");
          }, 200);
        } else {
          setTimeout(() => {
            navigate("/milestoneSPVDashboard");
          }, 200);
        }
      } else {
        setError(response.data.Status || "Invalid credentials!");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
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
              Sign in
            </Typography>
            <form onSubmit={handleLogin}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <FormLabel>User Type</FormLabel>
                  <Select
                    value={userType}
                    onChange={(e) => {
                      setUserType(e.target.value);
                      setOtpSent(false); // Reset OTP field on user type change
                    }}
                    required
                    disabled={
                      (userType === "spvUser" || userType === "msedclUser") &&
                      otpSent
                    }
                  >
                    <MenuItem value="mskvyUser">MSKVY 2.0 User</MenuItem>
                    <MenuItem value="spvUser">SPV User</MenuItem>
                    <MenuItem value="msedclUser">MSEDCL User</MenuItem>
                    {/* <MenuItem value="otherUser">Other User</MenuItem> */}
                  </Select>
                </FormControl>

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
                    disabled={
                      (userType === "spvUser" || userType === "msedclUser") &&
                      otpSent
                    }
                  />
                </FormControl>

                {/* Password Field (For MSKVY Users) */}
                {(userType === "mskvyUser" || userType === "spvUser") && (
                  <FormControl fullWidth>
                    <FormLabel>Password</FormLabel>
                    <TextField
                      type={showPassword ? "text" : "password"}
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      required
                      placeholder="Enter your password"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}

                {/* OTP Request & Input (For SPV & MSEDCL Users) */}
                {(userType === "spvUser" || userType === "msedclUser") &&
                  !otpSent && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => requestOTP(e ,"OTP")}
                    >
                      Get OTP
                    </Button>
                  )}

                {!otpLoading &&
                  (userType === "spvUser" || userType === "msedclUser") &&
                  otpSent && (
                    <>
                      {time !== 0 && (
                        <Typography
                          variant="body2"
                          color={"gray"}
                          textAlign={"center"}
                        >
                          Please Enter this OTP
                          <Typography
                            color={"#0466c8"}
                            sx={{ fontWeight: "600 !important" }}
                          >
                            {user.otp}
                          </Typography>
                        </Typography>
                      )}
                      <OTPInput length={6} />
                      {time !== 0 ? (
                        <Typography variant="body2" textAlign={"center"}>
                          Resend OTP in: {formatTime(time)}
                        </Typography>
                      ) : (
                        <Button
                          size="small"
                          onClick={(e) => requestOTP(e , "ResendOTP")}
                        >
                          Resend OTP
                        </Button>
                      )}
                    </>
                  )}

                {!(time === 0 && otpSent) && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={
                      (userType === "spvUser" || userType === "msedclUser") &&
                      !otpSent
                    }
                  >
                    Continue
                  </Button>
                )}
                 <Button
                 sx={{marginTop:'8px !important'}}
                    variant="text"
                    color="primary"
                    onClick={()=> navigate('/forgotPassword')}
                    >
                    Forget Password ?
                  </Button>
                {error && <Typography color="error">{error}</Typography>}
                {success && (
                  <Typography color="success.main">{success}</Typography>
                )}
              </Stack>
            </form>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Login;
