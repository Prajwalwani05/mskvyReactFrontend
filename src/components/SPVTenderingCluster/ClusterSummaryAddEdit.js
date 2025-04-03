import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Divider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader/loader";

const ClusterSummaryAddEdit = () => {
  // Ensure default value to avoid undefined errors
  const { clusterSummaryData, setClusterSummaryData } = useContext(
    DataContext
  ) || { clusterSummaryData: [] };
  const apiUrl = process.env.REACT_APP_API_URL;
  const [districtName, setDistrictName] = useState("");
  const [clusterName, setClusterName] = useState("");
  const [spvName, setSpvName] = useState("");
  const [rfsNumber, setRfsNumber] = useState("");
  const encryptedQueryString = window.location.search;
  const navigate = useNavigate();
  console.log(encryptedQueryString);
  const secretKey = "9096609945";
  const encryptedData = encryptedQueryString.substring(6);
  const decodedData = decodeURIComponent(encryptedData);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    let decryptedObject = {};
    try {
      const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedData) {
        throw new Error("Decryption returned empty string");
      }

      console.log("Decrypted Data:", decryptedData);
      decryptedObject = JSON.parse(decryptedData); // Parse as JSON
    } catch (error) {
      console.error("Error decrypting data:", error.message);
      return;
    }

    axios
      .get(
        `${apiUrl}/api/ClusterSummaryAddEdit?v_clusterSummeryID=${decryptedObject.v_clusterSummeryID}&sfile_id=1&str_action=view`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("ClusterSummaryData>>>", response.data);
          setClusterSummaryData(response.data || {});
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fetchData = () => {
  //   axios.get(`${apiUrl}/api/ClusterSummaryAddEdit?v_clusterSummeryID=${decryptedObject.v_clusterSummeryID}&sfile_id=1&str_action=view`)
  //   .then((response) => {
  //             if (response.status === 200) {
  //                 console.log("ClusterSummaryData>>>", response.data);
  //                 setClusterSummaryData(response.data || {});

  //             } else {
  //                 throw new Error("Network response was not ok");
  //             }
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         });
  // };
  // if (clusterSummaryData && clusterSummaryData.sPVNameLists) {
  //     const mainDistrictName = clusterSummaryData.sPVNameLists.find(spv => spv.DIST_CODE.toString() === clusterSummaryData.District_Name);
  //     setDistrictName(mainDistrictName);
  // } else {
  //     console.error("sPVNameLists is undefined");
  // }
  useEffect(() => {
    if (clusterSummaryData && clusterSummaryData.sPVNameLists) {
      // Capitalize the first letter
      const foundDistrict = clusterSummaryData.sPVNameLists.find(
        (spv) => spv.DIST_CODE.toString() === clusterSummaryData.District_Name
      );

      setDistrictName(foundDistrict ? foundDistrict.DIST_NAME : "");
      setClusterName(foundDistrict ? foundDistrict.ClusterName : "");
      setSpvName(foundDistrict ? foundDistrict.SPVName : "");
      setRfsNumber(foundDistrict ? foundDistrict.RFSNumber : "");
    }
  }, [clusterSummaryData]);

  const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Check which state to update
    setClusterSummaryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    alert("hello");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        margin: "10px",
        borderRadius: "5px",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
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
        <h2 style={{ margin: "15px 0" }}>Cluster Summary List</h2>
        {/* <button className="download-table-xls-button">Add +</button> */}
      </div>
      <Box p={2}>
        {Object.keys(clusterSummaryData).length > 0 ? (
          <Grid container spacing={3} justifyContent="flex-start">
            <Grid item xs={12} md={12}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <FormGrid item xs={12} sm={3}>
                    <TextField
                      label="District Name"
                      name="firstName"
                      value={districtName}
                      // onChange={handleChange}
                      size="medium"
                    />
                  </FormGrid>
                  <FormGrid item xs={12} sm={3}>
                    <TextField
                      label="Cluster Name"
                      name="lastName"
                      value={clusterName}
                      // onChange={handleChange}
                      size="medium"
                    />
                  </FormGrid>
                  <FormGrid item xs={12} sm={3}>
                    <TextField
                      label="Bid Submission Date"
                      name="Bid Submission Date"
                      // type="date"
                      value={clusterSummaryData.Bid_Submission_Date}
                      // onChange={handleChange}
                      size="medium"
                    />
                  </FormGrid>
                  <FormGrid item xs={12} sm={3}>
                    <TextField
                      label="SPV Name"
                      name="SPV Name"
                      value={spvName}
                      // onChange={handleChange}
                      size="medium"
                    />
                  </FormGrid>
                  <FormGrid item xs={12} sm={3}>
                    <TextField
                      label="Name of Selected Bidder"
                      name="name_of_the_Selected_Bidder_Company"
                      value={
                        clusterSummaryData.name_of_the_Selected_Bidder_Company
                      }
                      onChange={handleChange}
                      size="medium"
                    />
                  </FormGrid>
                  <FormGrid item xs={12} sm={3}>
                    <TextField
                      label="Address of SPD"
                      name="Address of SPD"
                      value={clusterSummaryData.address_of_the_Selected_Bidder}
                      // onChange={handleChange}
                      size="medium"
                    />
                  </FormGrid>
                  <FormGrid item xs={12} sm={3}>
                    <TextField
                      label="Scheduled LOI Issuance Date"
                      name="Scheduled LOI Issuance Date"
                      value={clusterSummaryData.Scheduled_LOI_Issuance_Date}
                      // onChange={handleChange}
                      size="medium"
                    />
                  </FormGrid>
                  <FormGrid item xs={12} sm={3}>
                    <TextField
                      label="Actual LOI Issuance Date"
                      name="Actual LOI Issuance Date"
                      value={clusterSummaryData.Actual_LOI_Issuance_Date}
                      // onChange={handleChange}
                      size="medium"
                    />
                  </FormGrid>
                </Grid>

                <Box mt={2}>
                  <Divider
                    sx={{ color: "grey" }}
                    flexItem
                    orientation="horizontal"
                  />
                  <Typography
                    variant="body2"
                    fontWeight="800"
                    fontFamily="inherit"
                    marginTop={"10px"}
                  >
                    RFS Details
                  </Typography>
                  <Grid container spacing={2} mt={2}>
                    <FormGrid item xs={12} sm={3}>
                      <TextField
                        label="RFS Number"
                        name="RFS Number"
                        value={rfsNumber}
                        // onChange={handleChange}
                        size="medium"
                      />
                    </FormGrid>
                    <FormGrid item xs={12} sm={3}>
                      <TextField
                        label="Date of RFS"
                        name="Date of RFS"
                        value={clusterSummaryData.Date_OF_RFS}
                        // onChange={handleChange}
                        size="medium"
                      />
                    </FormGrid>
                  </Grid>
                </Box>

                <Box mt={2}>
                  <Divider
                    sx={{ color: "grey" }}
                    flexItem
                    orientation="horizontal"
                  />
                  <Typography
                    variant="body2"
                    fontWeight="800"
                    fontFamily="inherit"
                    marginTop={"10px"}
                  >
                    Bid Evaluation Details
                  </Typography>
                  <Grid container spacing={2} mt={2}>
                    <FormGrid item xs={12} sm={3}>
                      <TextField
                        label="Method"
                        name="Method"
                        value={clusterSummaryData.IsE_Reverse_Or_DirectAward}
                        // onChange={handleChange}
                        size="medium"
                      />
                    </FormGrid>
                    <FormGrid item xs={12} sm={3}>
                      <TextField
                        label="Approved Tariff (Rs/kWh)"
                        name="Approved Tariff (Rs/kWh)"
                        value={clusterSummaryData.tariff_discovered}
                        // onChange={handleChange}
                        size="medium"
                      />
                    </FormGrid>
                  </Grid>
                </Box>

                <Box my={2}>
                  <Divider
                    sx={{ color: "grey" }}
                    flexItem
                    orientation="horizontal"
                  />
                  <Typography
                    variant="body2"
                    fontWeight="800"
                    fontFamily="inherit"
                    marginTop={"10px"}
                  >
                    Approval Details
                  </Typography>
                  <Grid container spacing={2} mt={2}>
                    <FormGrid item xs={12} sm={3}>
                      <TextField
                        label="Status"
                        name="Status"
                        value={clusterSummaryData.Status}
                        // onChange={handleChange}
                        size="medium"
                      />
                    </FormGrid>
                    <FormGrid item xs={12} sm={3}>
                      <TextField
                        label="Comments"
                        name="Comments"
                        value={clusterSummaryData.Comments}
                        // onChange={handleChange}
                        size="medium"
                      />
                    </FormGrid>
                  </Grid>
                </Box>
                <Divider
                  sx={{ color: "grey" }}
                  flexItem
                  orientation="horizontal"
                />
                {/* Submit Button */}
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
                    type="submit"
                    style={{color:'#069465'}}
                    onClick={() => navigate("/clusterSummary")}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    // color="primary"
                    style={{backgroundColor:'#069465'}}
                    size="medium"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        ) : (
          <Loader />

        )}
      </Box>
    </Box>
  );
};

export default ClusterSummaryAddEdit;
