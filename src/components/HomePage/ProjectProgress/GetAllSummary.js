import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import Loader from "../../Common/Loader/loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CryptoJS from "crypto-js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F9F9FA",
    color: "#6c757d",
    fontWeight: "600 !important",
    fontSize: 13,
    borderBottom: "1px solid #ced4da",
    borderTop: "1px solid #ced4da",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,

    //   border: "1px solid #ced4da",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.white,
}));
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const GetAllSummary = () => {
  // Ensure default value to avoid undefined errors
  const location = useLocation();
  const { data } = location.state || { Model: [] };
  // const [projectExecutionSummary, setProjectExecutionSummary] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  console.log(data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (!data || !data.Model) {
    return <Loader />; // Show loader if data is missing
  }

  // const handleBidderDetails = (ppaNo, infoType) => {
  //   navigate(`/bidderDetails/${ppaNo}/${infoType}`);
  // };

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
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "10px",
          alignItems: "center",
          padding: "0 10px",
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
        <h2 style={{ margin: "15px 0" }}>
          SPV Lists - Project Progress Monitoring Dashboard
        </h2>
      </div>

      <Box sx={{ width: "100%" }} mt={1} p={1}>
        <Box px={1.6}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                display: "none", // Hide the indicator
              },
              // marginTop: "15px",
              backgroundColor: 'transparent',
              // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "10px",
              border:'1px solid rgb(226, 226, 226)',
              padding: "2px",
              minHeight:'38px'
            }}
          >
            <Tab
              sx={{padding:'0 !important',minHeight:'35px', fontSize: "15px", fontWeight: "600", transition: "background-color 0.3s ease",
                margin: "0", marginRight: "2px", backgroundColor: value === 0 ? "#1f363d" : "transparent",
                "&:hover": {
                  backgroundColor: "#ced4da", // Hover effect
                  color: '#6c757d'
                },
                borderRadius: "8px",  color: value === 0 ? "#FFF !important": "#c5c3c6"}}
              label="Cluster Approach"
              {...a11yProps(0)}
              
            />
            <Tab
              sx={{ padding:'0 !important', minHeight:'35px', fontSize: "15px", fontWeight: "600" , transition: "background-color 0.3s ease",
                margin: "0",
                marginRight: "2px", backgroundColor: value === 1 ? "#1f363d" : "transparent",
                "&:hover": {
                  backgroundColor:"#ced4da",
                  color: '#6c757d'
                },
                borderRadius: "8px", color: value === 1 ? "#FFF !important": "#c5c3c6"}}
              label="Open Tender Approach"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box sx={{ width: "100%" }}>
            <TableContainer
              sx={{ maxHeight: 520, border: "1px solid #ced4da" }}
            >
              <Table
                sx={{ minWidth: 700 }}
                stickyHeader
                size="small"
                aria-label="sticky table"
              >
                <TableHead
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#F9F9FA",
                    zIndex: 2,
                  }}
                >
                  <TableRow>
                    <StyledTableCell colSpan={3}></StyledTableCell>
                    <StyledTableCell
                      style={{ textAlign: "center" }}
                      colSpan={2}
                    >
                      Contracted Capacity
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ textAlign: "center" }}
                      colSpan={2}
                    >
                      Commissioned Till Date
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>PPA Reference No.</StyledTableCell>
                    <StyledTableCell>SPV Name</StyledTableCell>
                    <StyledTableCell>Bidder Name</StyledTableCell>
                    <StyledTableCell>No. of Substations</StyledTableCell>
                    <StyledTableCell>Solar Capacity (MW)</StyledTableCell>
                    <StyledTableCell>No. of Substations</StyledTableCell>
                    <StyledTableCell>Solar Capacity (MW)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.Model?._progressStatusCluster ? (
                    (data?.Model?._progressStatusCluster || []).map(
                      (element, index) => {
                        const strBidder = element.PPA_Reference_No;
                        const infoType = element.infoType;
                        const bidderName = element.NameOfSelectedBidderCompany;
                        const secretKey = "9096609945";

                        // Convert data into a JSON string
                        const dataToEncrypt = JSON.stringify({
                          strBidder,
                          infoType,
                          bidderName
                        });

                        // Encrypt the JSON string
                        const encryptedData = CryptoJS.AES.encrypt(
                          dataToEncrypt,
                          secretKey
                        ).toString();

                        // Encode to make it URL-safe
                        const encodedData = encodeURIComponent(encryptedData);

                        // Construct the final URL
                        const finalURL = `/bidderDetails?data=${encodedData}`;

                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell
                              sx={{
                                minWidth: "220px",
                                color: "blue",
                                cursor: "pointer",
                              }}>
                              <Link to={finalURL}>
                                {element.PPA_Reference_No}
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.SPV_Name}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.NameOfSelectedBidderCompany}
                            </StyledTableCell>
                            <StyledTableCell>{element.SsNo}</StyledTableCell>
                            <StyledTableCell>
                              {element.AggregateCapacityMW}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.Commissioned_SS}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.Commissioned_Capacity}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      }
                    )
                  ) : (
                    <Loader />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Box sx={{ width: "100%" }}>
            <TableContainer
              sx={{ maxHeight: 520, border: "1px solid #ced4da" }}
            >
              <Table
                sx={{ minWidth: 700 }}
                stickyHeader
                size="small"
                aria-label="sticky table"
              >
                <TableHead
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#F9F9FA",
                    zIndex: 2,
                  }}
                >
                  <TableRow>
                    <StyledTableCell colSpan={3}></StyledTableCell>
                    <StyledTableCell
                      style={{ textAlign: "center" }}
                      colSpan={2}
                    >
                      Contracted Capacity
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ textAlign: "center" }}
                      colSpan={2}
                    >
                      Commissioned Till Date
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>PPA Reference No.</StyledTableCell>
                    <StyledTableCell>SPV Name</StyledTableCell>
                    <StyledTableCell>Bidder Name</StyledTableCell>
                    <StyledTableCell>No. of Substations</StyledTableCell>
                    <StyledTableCell>Solar Capacity (MW)</StyledTableCell>
                    <StyledTableCell>No. of Substations</StyledTableCell>
                    <StyledTableCell>Solar Capacity (MW)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.Model?._progressStatusOpenTender ? (
                    (data?.Model?._progressStatusOpenTender || []).map(
                      (element, index) => {
                        const strBidder = element.PPA_Reference_No;
                        const infoType = element.infoType;
                        const secretKey = "9096609945";

                        // Convert data into a JSON string
                        const dataToEncrypt = JSON.stringify({
                          strBidder,
                          infoType,
                        });

                        // Encrypt the JSON string
                        const encryptedData = CryptoJS.AES.encrypt(
                          dataToEncrypt,
                          secretKey
                        ).toString();

                        // Encode to make it URL-safe
                        const encodedData = encodeURIComponent(encryptedData);

                        // Construct the final URL
                        const finalURL = `/bidderDetails?data=${encodedData}`;

                        return  (
                          <StyledTableRow key={index}>
                            <StyledTableCell
                              sx={{
                                minWidth: "220px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                            >
                               <Link to={finalURL}>
                                {element.PPA_Reference_No}
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell>{element.SPV_Name}</StyledTableCell>
                            <StyledTableCell>
                              {element.NameOfSelectedBidderCompany}
                            </StyledTableCell>
                            <StyledTableCell>{element.SsNo}</StyledTableCell>
                            <StyledTableCell>
                              {element.AggregateCapacityMW}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.Commissioned_SS}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.Commissioned_Capacity}
                            </StyledTableCell>
                          </StyledTableRow>
                        )
                      }
                    )
                  ) : (
                    <Loader />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CustomTabPanel>
        <Box width="100%" display="flex" justifyContent="flex-end" gap="5px">
          <Button
            variant="contained"
            style={{ backgroundColor: "#069465" }}
            size="medium"
            type="submit"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GetAllSummary;
