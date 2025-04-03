import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader/loader";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import TransitionsModal from "../Modal";

const UserCreationEdit = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [UserCreationEditData, setUserCreationEditData] = useState({});
  const [formData, setFormData] = useState({});
  const [data, setData] = useState({});
const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    action: null,
    img: "",
  });
  // To track the focused input
  const inputRef = useRef(null);

  const encryptedQueryString = window.location.search;
  const secretKey = "9096609945";
  const encryptedData = encryptedQueryString.substring(6);
  const decodedData = decodeURIComponent(encryptedData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedData) throw new Error("Decryption failed");

        const decryptedObject = JSON.parse(decryptedData);
        console.log(decryptedData);
        const response = await axios.get(`${apiUrl}/api/UserCreationDataEdit`, {
          params: {
            LoginId: decryptedObject.LoginId,
          },
        });
        console.log("User Creation Data: ", response.data);

        if (response.status === 200) {
          setUserCreationEditData(response.data);
        } else {
          throw new Error("API request failed");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [apiUrl, decodedData]);

  // **Fix: Only update formData when letterOfIntentData is available and hasn't been set**
  useEffect(() => {
    if (UserCreationEditData && UserCreationEditData.userTypes) {
      // Capitalize the first letter
      const foundUserType = UserCreationEditData.userTypes.find(
        (user) =>
          user.UserTypeID.toString() === UserCreationEditData.APPLICANT_TYPE
      );
      setData((prevState) => ({
        ...prevState,
        UserType: foundUserType ? foundUserType.UserTypeName : "",
      }));
    }
    if (UserCreationEditData && Object.keys(formData).length === 0) {
      setFormData(UserCreationEditData);
    }
  }, [UserCreationEditData, formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Store the focused input before updating state
    inputRef.current = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Restore focus after state update
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    console.log(formData);
    try {
      const response = await axios.post(
        `${apiUrl}/api/InsertUpdateUserCreation`,
        formData
      );

      if (response.status === 200) {
        setModal({
          open: true,
          title: "Congrats !!",
          message: "Data saved successfully",
          img: <CheckCircleIcon fontSize="large"  color="success" />,
        })    
        console.log(response.data);
      } else {
        setModal({
          open: true,
          title: "Error",
          message: "Failed to save data!.",
          img: <WarningRoundedIcon fontSize="large"  color="warning" />,
        })
      }
    } catch (error) {
      console.error("❌ Error:", error.message);
      setModal({
        open: true,
        title: "Error",
        message: "Failed to save data!.",
        img: <WarningRoundedIcon fontSize="large"  color="warning" />,
      })
    }
  };

  // const handleViewPdf = (url) => {
  //     console.log(url)
  //     setPdfUrl(url);
  //     setOpenPdfViewer(true);
  //   };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        margin: "10px",
        borderRadius: "5px",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
        // boxShadow:
        //   "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "10px",
          alignItems: "center",
          padding: "0 14px",
          marginBottom: "5px",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.71 11.29-6-6A.996.996 0 1 0 13.3 6.7l4.29 4.29H4c-.55 0-1 .45-1 1s.45 1 1 1h13.59l-4.29 4.29a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l6-6a.996.996 0 0 0 0-1.41Z" fill="%23200020"></path></svg>')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "25px",
            height: "25px",
          }}
        ></Box>
        <h2 style={{ margin: "15px 0" }}>User Details</h2>
      </div>
      <Box p={2}>
        {formData ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} mb={1}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Login Id"
                  name="LOGIN_ID"
                  value={formData.LOGIN_ID || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Login Name"
                  name="LOGIN_NAME"
                  value={formData.LOGIN_NAME || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Password"
                  name="PASSWORD"
                  value={formData.PASSWORD || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="medium">
                  <InputLabel>User Type</InputLabel>
                  <Select
                    name="UserType"
                    value={data.UserType || ""}
                    onChange={handleChange}
                  >
                    {formData.userTypes &&
                      formData.userTypes.map((users) => (
                        <MenuItem
                          key={users.UserTypeID}
                          value={users.UserTypeName}
                        >
                          {users.UserTypeName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="User Name"
                  name="APPLICANT_NAME"
                  value={formData.APPLICANT_NAME || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="ADDRESS LINE 1"
                  name="ADDRESS_LINE_1"
                  value={formData.ADDRESS_LINE_1 || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="ADDRESS LINE 2"
                  name="ADDRESS_LINE_2"
                  value={formData.ADDRESS_LINE_2 || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="ADDRESS LINE 3"
                  name="ADDRESS_LINE_3"
                  value={formData.ADDRESS_LINE_3 || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Mobile No."
                  name="MOBILE_NUMBER"
                  value={formData.MOBILE_NUMBER || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Aadhar No."
                  name="AADHAR_NUMBER"
                  value={formData.AADHAR_NUMBER || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Pan No."
                  name="PAN_NUMBER"
                  value={formData.PAN_NUMBER || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Email Id"
                  name="EMAIL_ID"
                  value={formData.EMAIL_ID || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Status-CD"
                  name="STATUS_CD"
                  value={formData.STATUS_CD || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Pan Name"
                  name="PAN_NAME"
                  value={formData.PAN_NAME || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="DC-Auth Code"
                  name="DC_AUTH_CODE"
                  value={formData.DC_AUTH_CODE || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="District Code"
                  name="DIST_CODE"
                  value={formData.DIST_CODE || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box
              mt={2}
              width="100%"
              display="flex"
              justifyContent="flex-end"
              gap="5px"
            >
              <Button
                variant="text"
                // color="info"
                size="medium"
                style={{color:'#069465'}}
                type="submit"
                onClick={() => navigate("/userCreation")}
              >
                Back
              </Button>
              <Button
                variant="contained"
                style={{backgroundColor:'#069465'}}
                size="medium"
                type="submit"
              >
                Save
              </Button>
            </Box>
            {/* </Grid> */}
          </form>
        ) : (
          <Loader />
        )}
      </Box>
        <TransitionsModal
                open={modal.open}
                onClose={() => setModal({ ...modal, open: false })}
                title={modal.title}
                message={modal.message}
                action={modal.action}
                img={modal.img}
              />
    </Box>
  );
};

export default UserCreationEdit;
