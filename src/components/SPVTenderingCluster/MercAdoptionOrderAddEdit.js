// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import Grid from '@mui/material/Unstable_Grid2';
// import { Box, Button, Divider, styled, TextField, Typography } from '@mui/material';
// import CryptoJS from "crypto-js";

// const LetterOfIntentAddEdit = () => {
//     // Ensure default value to avoid undefined errors
//     const [letterOfIntentData, setLetterOfIntentData] = useState({ latterOfIntents: [] });
//     const apiUrl = process.env.REACT_APP_API_URL;
//     const [data, setData] = useState({
//         districtName: '',
//         clusterName: '',
//         spvName: '',
//         rfsNumber: ''
//     });

//     const encryptedQueryString = window.location.search;
//     console.log(encryptedQueryString)
//     const secretKey = "9096609945";
//     const encryptedData = encryptedQueryString.substring(6); // Remove '?data='
//     // const decryptedData = AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
//     const decodedData = decodeURIComponent(encryptedData);
//   //   try {
//   //     const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
//   //     const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

//   //     if (!decryptedData) {
//   //         throw new Error("Decryption returned empty string");
//   //     }

//   //     console.log("Decrypted Data:", decryptedData);
//   //     decryptedObject = JSON.parse(decryptedData); // Parse as JSON
//   // } catch (error) {
//   //     console.error("Error decrypting data:", error.message);
//   // }

//     useEffect(() => {
//         fetchData();
//     }, []);
//     const fetchData = () => {
//       let decryptedObject = {};
//       try {
//           const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
//           const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

//           if (!decryptedData) {
//               throw new Error("Decryption returned empty string");
//           }

//           console.log("Decrypted Data:", decryptedData);
//           decryptedObject = JSON.parse(decryptedData); // Parse as JSON

//       } catch (error) {
//           console.error("Error decrypting data:", error.message);
//           return;
//       }

//       axios.get(`${apiUrl}/api/LetterOfIndentAddEdit?v_loiID=${decryptedObject.v_loiID}&sfile_id=1&DistCode=${decryptedObject.DistCode}`)
//           .then((response) => {
//               if (response.status === 200) {
//                   console.log("LetterOfIntentAddEdit>>>", response.data);
//                   setLetterOfIntentData(response.data || {});
//               } else {
//                   throw new Error("Network response was not ok");
//               }
//           })
//           .catch((error) => {
//               console.log(error);
//           });
//   };

//     useEffect(() => {
//         if (letterOfIntentData && letterOfIntentData.sPVNameLists) {
//             // Capitalize the first letter
//             const foundDistrict = letterOfIntentData.sPVNameLists.find(
//                 (spv) => spv.DIST_CODE.toString() === letterOfIntentData.District_Name
//             );
//             setData(prevState => ({
//                 ...prevState,
//                 districtName: (foundDistrict ? foundDistrict.DIST_NAME : ""),
//                 clusterName: (foundDistrict ? foundDistrict.ClusterName : ""),
//                 spvName:(foundDistrict ? foundDistrict.SPVName : ""),
//                 rfsNumber:(foundDistrict ? foundDistrict.RFSNumber : ""),

//             }));
//       }
//     }, [letterOfIntentData]);

//     const FormGrid = styled(Grid)(() => ({
//         display: 'flex',
//         flexDirection: 'column',
//       }));
//     const handleSubmit = () => {
//         alert('hello')
//     }
//     return (
//         <Box sx={{backgroundColor:'#FFF', margin:'10px', borderRadius:'16px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 14px", marginBottom: "5px" }}>
//                         <h2 style={{ margin: "15px 0" }}>Letter Of Intent Details</h2>
//                         {/* <button className="download-table-xls-button">Add +</button> */}
//                     </div>
//         <Box p={2}>
//       {Object.keys(letterOfIntentData).length > 0 ? (
//               <Grid container spacing={3} justifyContent="flex-start">
//               <Grid item xs={12} md={12}>
//                 <form onSubmit={handleSubmit}>
//                   <Grid container spacing={2}>
//                   <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="LOI Ref No."
//                         name="LOI Ref No."
//                         value={letterOfIntentData.LOI_Reference_No}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Name of Selected Bidder"
//                         name="Name of Selected Bidder"
//                         value={letterOfIntentData.name_of_the_Selected_Bidder_Company}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     {/* <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Address of SPD"
//                         name="Address of SPD"
//                         value={letterOfIntentData.address_of_the_Selected_Bidder}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid> */}

//                   </Grid>
//                   <Box mt={2}>
//                   <Divider sx={{color:'grey'}} flexItem orientation='horizontal'/>
//                   <Typography variant='body2' fontWeight='800' fontFamily='inherit' marginTop={'10px'}>Project Capacity Details</Typography>
//                   <Grid container spacing={2} mt={2}>
//                   <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Base Capacity"
//                         name="Base Capacity"
//                         value={letterOfIntentData.Base_Capacity_MW}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Green Shoe Capacity (MW)"
//                         name="Green Shoe Capacity (MW)"
//                         value={letterOfIntentData.Green_shoe_Capacity_MW}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Aggregate Capacity (MW)"
//                         name="Aggregate Capacity (MW)"
//                         value={letterOfIntentData.Aggregate_Capacity_MW}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Base CFA Capacity (MW)"
//                         name="Base CFA Capacity (MW)"
//                         value={letterOfIntentData.CFA_Capacity_MW}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Green shoe CFA Capacity (MW)"
//                         name="Green shoe CFA Capacity (MW)"
//                         value={letterOfIntentData.Green_Show_CFA_Capacity_MW}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Aggregate CFA Capacity (MW)"
//                         name="Aggregate CFA Capacity (MW)"
//                         value={letterOfIntentData.Aggregate_CFA_Capacity_MW}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     </Grid>
//                     </Box>

//                   <Box mt={2}>
//                   <Divider sx={{color:'grey'}} flexItem orientation='horizontal'/>
//                   <Typography variant='body2' fontWeight='800' fontFamily='inherit' marginTop={'10px'}>RFS Details</Typography>
//                   <Grid container spacing={2} mt={2}>
//                   <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="RFS Number"
//                         name="RFS Number"
//                         value={data.rfsNumber}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Date of RFS"
//                         name="Date of RFS"
//                         value={letterOfIntentData.Date_OF_RFS}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="District Name"
//                         name="District Name"
//                         value={data.districtName}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Place"
//                         name="lastName"
//                         value={data.clusterName}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12}sm={3}>
//                       <TextField
//                         label="Bid Submission Date"
//                         name="Bid Submission Date"
//                         // type="date"
//                         value={letterOfIntentData.Bid_Submission_Date}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="SPV Name"
//                         name="SPV Name"
//                         value={data.spvName}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                   </Grid>
//                   </Box>

//                   <Box mt={2}>
//                   <Divider sx={{color:'grey'}} flexItem orientation='horizontal'/>
//                   <Typography variant='body2' fontWeight='800' fontFamily='inherit' marginTop={'10px'}>Bid Evaluation Details</Typography>
//                   <Grid container spacing={2} mt={2}>
//                   <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Method"
//                         name="Method"
//                         value={letterOfIntentData.IsE_Reverse_Or_DirectAward}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Approved Tariff (Rs/kWh)"
//                         name="Approved Tariff (Rs/kWh)"
//                         value={letterOfIntentData.tariff_discovered}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                   </Grid>
//                   </Box>

//                   <Box my={2}>
//                   <Divider sx={{color:'grey'}} flexItem orientation='horizontal'/>
//                   <Typography variant='body2' fontWeight='800' fontFamily='inherit' marginTop={'10px'}>Approval Details</Typography>
//                   <Grid container spacing={2} mt={2}>
//                   <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Scheduled LOI Issuance Date"
//                         name="Scheduled LOI Issuance Date"
//                         value={letterOfIntentData.Scheduled_LOI_Issuance_Date}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Actual LOI Issuance Date"
//                         name="Actual LOI Issuance Date"
//                         value={letterOfIntentData.Actual_LOI_Issuance_Date}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Place"
//                         name="Place"
//                         value={''}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                   <FormGrid item xs={12} sm={3}>
//                       <TextField
//                         label="Status"
//                         name="Status"
//                         value={letterOfIntentData.Status}
//                         // onChange={handleChange}
//                         size="medium"
//                       />
//                     </FormGrid>
//                   </Grid>
//                   </Box>
//                     <Divider sx={{color:'grey'}} flexItem orientation='horizontal'/>
//                     {/* Submit Button */}
//                     <Box display={'flex'} width={'100%'} justifyContent={'flex-end'} mt={2}>
//                     <Grid width={'100%'} container spacing={2} mt={2}>
//                     <FormGrid item xs={12} sm={2}>
//                       <Button variant="contained" color="primary" size='small' type="submit">
//                         Save
//                       </Button>
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={2}>
//                       <Button variant="contained" color="success" size='small' type="submit">
//                         E-Sign
//                       </Button>
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={2}>
//                       <Button variant="contained" color="success" size='small' type="submit">
//                         Preview LOI
//                       </Button>
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={2}>
//                       <Button variant="contained" color="success" size='small' type="submit">
//                         Download Sign LOI
//                       </Button>
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={2}>
//                       <Button variant="contained" color="success" size='small' type="submit">
//                         Send Mail
//                       </Button>
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={2}>
//                       <Button variant="contained" color="success" size='small' type="submit">
//                         View Substations
//                       </Button>
//                     </FormGrid>
//                     <FormGrid item xs={12} sm={2}>
//                       <Button variant="contained" color="error" size='small' type="submit">
//                         Back
//                       </Button>
//                     </FormGrid>
//                     </Grid>
//                     </Box>
//                 </form>
//               </Grid>
//             </Grid>
//         ) : (
//             <div>No Data</div>
//         )}
//         </Box>
//         </Box>
//     );
// };

// export default LetterOfIntentAddEdit;
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CryptoJS from "crypto-js";
import { useLocation, useNavigate } from "react-router-dom";
import PdfViewer from "./PdfViewer";
import Loader from "../Common/Loader/loader";
// import { Eye, Link } from "@phosphor-icons/react";

const MercAdoptionOrderAddEdit = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");
  const [isViewMode, setIsViewMode] = useState(mode === "view");
  const [mercAdoptionOrderData, setMercAdoptionOrderData] = useState({});
  const [data, setData] = useState({
    districtName: "",
    clusterName: "",
    spvName: "",
    rfsNumber: "",
  });
  const [formData, setFormData] = useState({});
  const [openPdfViewer, setOpenPdfViewer] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  // To track the focused input
  const inputRef = useRef(null);

  const encryptedQueryString = window.location.search;
  const secretKey = "9096609945";
  const encryptedData = encryptedQueryString.substring(6);
  const decodedData = decodeURIComponent(encryptedData);
  const navigate = useNavigate();
  useEffect(() => {
    setIsViewMode(mode === "view");
  }, [mode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedData) throw new Error("Decryption failed");

        const decryptedObject = JSON.parse(decryptedData);
        console.log(decryptedData);
        const response = await axios.get(
          `${apiUrl}/api/MercAdoptionOrderAddEdit`,
          {
            params: {
              v_mercId: decryptedObject.v_mercId,
              sfile_id: 1,
              DistCode: decryptedObject.DistCode,
            },
          }
        );

        if (response.status === 200) {
          setMercAdoptionOrderData(response.data);
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
    if (mercAdoptionOrderData && mercAdoptionOrderData.sPVNameLists) {
      // Capitalize the first letter
      const foundDistrict = mercAdoptionOrderData.sPVNameLists.find(
        (spv) =>
          spv.DIST_CODE.toString() === mercAdoptionOrderData.District_Name
      );
      setData((prevState) => ({
        ...prevState,
        districtName: foundDistrict ? foundDistrict.DIST_NAME : "",
        clusterName: foundDistrict ? foundDistrict.ClusterName : "",
        spvName: foundDistrict ? foundDistrict.SPVName : "",
        rfsNumber: foundDistrict ? foundDistrict.RFSNumber : "",
      }));
    }
    if (mercAdoptionOrderData && Object.keys(formData).length === 0) {
      setFormData(mercAdoptionOrderData);
    }
  }, [mercAdoptionOrderData, formData]);

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
        `${apiUrl}/api/InsertUpdateMercAdoptionOrder`,
        formData
      );

      if (response.status === 200) {
        alert("Data saved successfully!");
        console.log(response.data);
      } else {
        alert("Failed to save data!");
      }
    } catch (error) {
      console.error("❌ Error:", error.message);
      alert("An error occurred while saving data.");
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
        <h2 style={{ margin: "15px 0" }}>MERC Adoption Order Details</h2>
      </div>
      <Box p={2}>
        {formData ? (
          <form onSubmit={handleSubmit}>
            {/* <Grid container spacing={3} mb={1}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="LOI Ref No."
                  name="LOI_Reference_No"
                  value={formData.LOI_Reference_No || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="Name of Selected Bidder"
                  name="Name_of_Selected_Bidder"
                  value={formData.Name_of_Selected_Bidder || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
            </Grid> */}

            {/* <Divider sx={{color:'grey'}} flexItem orientation='horizontal'/>
                   <Typography variant='h6' fontWeight='800' fontFamily='inherit' marginTop={'10px'} mb={2}>Project Capacity Details</Typography>
             <Grid container spacing={3} mb={1}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Base Capacity"
                  name="Base_Capacity_MW"
                  value={formData.Base_Capacity_MW || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Green Shoe Capacity (MW)"
                  name="Green_shoe_Capacity_MW"
                  value={formData.Green_shoe_Capacity_MW || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Aggregate Capacity (MW)"
                  name="Aggregate_Capacity_MW"
                  value={formData.Aggregate_Capacity_MW || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="CFA Capacity (MW)"
                  name="CFA_Capacity_MW"
                  value={formData.CFA_Capacity_MW || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Green shoe CFA Capacity (MW)"
                  name="Green_Show_CFA_Capacity_MW"
                  value={formData.Green_Show_CFA_Capacity_MW || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Aggregate CFA Capacity (MW)"
                  name="Aggregate_CFA_Capacity_MW"
                  value={formData.Aggregate_CFA_Capacity_MW || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
            </Grid> */}

            {/* <Divider sx={{color:'grey'}} flexItem orientation='horizontal'/>
                   <Typography variant='h6' fontWeight='800' fontFamily='inherit' marginTop={'10px'} mb={2}>RFS Details</Typography> */}
            <Grid container spacing={3} mb={1}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="District Name"
                  name="District_Name"
                  value={data.districtName || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Cluster Name"
                  name="Cluster_name"
                  value={data.clusterName || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="RFS Number"
                  name="RFS_Number"
                  value={data.rfsNumber || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Date of Petition Filing"
                  name="Date_of_petition_filing"
                  value={formData.Date_of_petition_filing || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="Date of Admission"
                  name="Date_Admissibility_Hearing"
                  value={formData.Date_Admissibility_Hearing || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Petition Case No."
                  name="Merc_Issuance_Case_No"
                  value={formData.Merc_Issuance_Case_No || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Date of Final Hearing"
                  name="Date_Final_Hearing"
                  value={formData.Date_Final_Hearing || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Date of Issuance of the order"
                  name="Date_Issuance_the_order"
                  value={formData.Date_Issuance_the_order || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Order Upload"
                  name="Order_Of_Issuance_Document"
                  value={formData.Order_Of_Issuance_Document || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
                {/* <Button 
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleViewPdf(formData.Order_Of_Issuance_Document)}
              >
                <Eye size={25} weight="bold" />
              </Button> */}
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Approved Tariff (Rs/KWh)"
                  name="Approved_Tariff"
                  value={formData.Approved_Tariff || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Comments"
                  name="Comments"
                  value={formData.Comments || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="medium" disabled>
                  <InputLabel
                    sx={{ backgroundColor: "#FFF", padding: "0 5px" }}
                  >
                    Status
                  </InputLabel>
                  <Select
                    name="status"
                    value={formData.Status || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
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
                color="info"
                size="medium"
                style={{color:'#069465'}}
                type="submit"
                onClick={() => navigate("/mercAdoptionOrder")}
              >
                Back
              </Button>
              <Button
                variant="contained"
                style={{backgroundColor:'#069465'}}
                size="medium"
                type="submit"
                disabled={isViewMode}
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
      <Dialog
        sx={{}}
        open={openPdfViewer}
        onClose={() => setOpenPdfViewer(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>View Document</DialogTitle>
        <DialogContent dividers>
          {pdfUrl ? (
            <PdfViewer pdfUrl={pdfUrl} />
          ) : (
            <Typography>No document found</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPdfViewer(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MercAdoptionOrderAddEdit;
