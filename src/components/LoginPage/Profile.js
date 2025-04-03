import {
  Box,
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import profilePic from "../../images/3dMan.jpg";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
  console.log(sessionData);
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const fetchData = () => {
    axios
      .get(`${apiUrl}/api/UserProfile`, {
        params: { LoginID: "mskvy.admin" },
      })
      .then((response) => {
        setData(response.data);
        console.log("Fetched Data:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        margin: "10px",
        //  padding:'5px',
        borderRadius: "5px",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
        // boxShadow:
        //   "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
      pb={1}
    >
      <Box
        sx={{
          position: "relative",
          backgroundImage: " linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
          width: "100%",
          height: "200px",
        }}
      >
        <Box
          sx={{
            width: "150px",
            height: "150px", // Ensure height matches width for a perfect circle
            borderRadius: "50%",
            position: "absolute",
            bottom: "-70px",
            left: "10px",
            overflow: "hidden", // Prevents image from spilling out
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid white",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        >
          <img
            src={profilePic}
            alt="profileIcon"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensures the image covers the entire circle
            }}
          />
        </Box>
      </Box>
      <Box mx={4} display={"flex"} gap={2} justifyContent={"space-evenly"}>
        <Box
          p={2}
          mt={12}
          mb={2}
          flexGrow={1}
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            borderRadius: "8px",
          }}
        >
          <Box display={"flex"} mb={1} justifyContent={"space-between"}>
            <Typography variant="body2">Login ID:</Typography>
            <FormControl>
              <TextField
                type="text"
                name="LOGIN_ID"
                value={data.LOGIN_ID || ""}
                // onChange={handleChange}
                required
                placeholder="Enter your Login ID"
                variant="standard"
                // disabled
              />
            </FormControl>
            {/* <Typography variant="body2">{data?.LOGIN_ID || ''}</Typography> */}
          </Box>
          <Divider />
          <Box mt={1} display={"flex"} mb={1} justifyContent={"space-between"}>
            <Typography variant="body2">Login Name:</Typography>
            <FormControl>
              <TextField
                type="text"
                name="LOGIN_NAME"
                value={data.LOGIN_NAME || ""}
                // onChange={handleChange}
                required
                placeholder="Enter your Login Name"
                variant="standard"
                // disabled
              />
            </FormControl>
            {/* <TextField variant="body2" value={data.LOGIN_NAME} /> */}
          </Box>
          <Divider />
          <Box mt={1} display={"flex"} mb={1} justifyContent={"space-between"}>
            <Typography variant="body2">Address Line 1:</Typography>
            <FormControl>
              <TextField
                type="text"
                name="ADDRESS_LINE_1"
                value={data.ADDRESS_LINE_1 || ""}
                onChange={handleChange}
                required
                placeholder="Enter your Address Line 1"
                variant="standard"
              />
            </FormControl>
            {/* <Typography variant="body2">{data?.ADDRESS_LINE_1 || ''}</Typography> */}
          </Box>
          <Divider />
          <Box mt={1} display={"flex"} mb={1} justifyContent={"space-between"}>
            <Typography variant="body2">Address Line 2:</Typography>
            <FormControl>
              <TextField
                type="text"
                name="ADDRESS_LINE_2"
                value={data.ADDRESS_LINE_2 || ""}
                onChange={handleChange}
                required
                placeholder="Enter your Address Line 2"
                variant="standard"
              />
            </FormControl>
          </Box>
          <Divider />
          <Box mt={1} display={"flex"} mb={1} justifyContent={"space-between"}>
            <Typography variant="body2">Address Line 3:</Typography>
            <FormControl>
              <TextField
                type="text"
                name="ADDRESS_LINE_3"
                value={data.ADDRESS_LINE_3 || ""}
                onChange={handleChange}
                required
                placeholder="Enter your Address Line 3"
                variant="standard"
              />
            </FormControl>
          </Box>
        </Box>
        <Box
          p={2}
          mt={12}
          mb={2}
          flexGrow={1}
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            borderRadius: "8px",
          }}
        >
          <Box mt={1} display={"flex"} mb={1} justifyContent={"space-between"}>
            <Typography variant="body2">Mobile Number:</Typography>
            <FormControl>
              <TextField
                type="text"
                name="MOBILE_NUMBER"
                value={data.MOBILE_NUMBER || ""}
                onChange={handleChange}
                required
                placeholder="Enter your Mobile Number"
                variant="standard"
              />
            </FormControl>
          </Box>
          <Divider />
          <Box mt={1} display={"flex"} mb={1} justifyContent={"space-between"}>
            <Typography variant="body2">Aadhar Number:</Typography>
            <FormControl>
              <TextField
                type="text"
                name="AADHAR_NUMBER"
                value={data.AADHAR_NUMBER || ""}
                onChange={handleChange}
                required
                placeholder="Enter your Aadhar Number"
                variant="standard"
              />
            </FormControl>
          </Box>
          <Divider />
          <Box mt={1} display={"flex"} mb={1} justifyContent={"space-between"}>
            <Typography variant="body2">Pan Number:</Typography>
            <FormControl>
              <TextField
                type="text"
                name="PAN_NUMBER"
                value={data.PAN_NUMBER || ""}
                onChange={handleChange}
                required
                placeholder="Enter your Pan Number"
                variant="standard"
              />
            </FormControl>
          </Box>
          <Divider />
          <Box mt={1} display={"flex"} mb={1} justifyContent={"space-between"}>
            <Typography variant="body2">Email-Id:</Typography>
            <FormControl>
              <TextField
                type="text"
                name="EMAIL_ID"
                value={data.EMAIL_ID || ""}
                onChange={handleChange}
                required
                placeholder="Enter your Email-Id"
                variant="standard"
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box
        px={2}
        width="100%"
        display="flex"
        justifyContent="flex-end"
        gap="5px"
      >
        <Button
          variant="contained"
          color="primary"
          size="medium"
          type="submit"
        >
          UPDATE
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
