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
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';

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
const ProjectCFA = () => {
    const [projectCFA, setProjectCFA] = useState([]);
    const [loading, setLoading] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/SPVListForAdminDashboard`, {
        params: {
            sfile_Id: 1,
        },
      });

      if (response.status === 200) {
        setProjectCFA(response.data);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjectData = projectCFA?.Model?.sPVListforAdminDashboardLists?.filter((item) => {
      return item.ApproachType === "Project";
  }) || [];
  const filteredClusterData = projectCFA?.Model?.sPVListforAdminDashboardLists?.filter((item) => {
    return item.ApproachType === "Cluster";
}) || [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {projectCFA?.Model?.sPVListforAdminDashboardLists?.length > 0 ? (
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
              Project Monitoring Milestones Dashboard
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
                  backgroundColor: "#F9F9FA",
                  // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  borderRadius: "10px",
                  border: "1px solid rgb(226, 226, 226)",
                  padding: "2px",
                  minHeight: "38px",
                }}
              >
                <Tab
                  sx={{
                    padding: "0 !important",
                    minHeight: "35px",
                    fontSize: "15px",
                    fontWeight: "600",
                    transition: "background-color 0.3s ease",
                    margin: "0",
                    marginRight: "2px",
                    backgroundColor: value === 0 ? "#1f363d" : "transparent",
                    "&:hover": {
                      backgroundColor: "#ced4da", // Hover effect
                      color: "#6c757d",
                    },
                    borderRadius: "8px",
                    color: value === 0 ? "#FFF !important" : "#c5c3c6",
                  }}
                  label="Cluster Approach"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{
                    padding: "0 !important",
                    minHeight: "35px",
                    fontSize: "15px",
                    fontWeight: "600",
                    transition: "background-color 0.3s ease",
                    margin: "0",
                    marginRight: "2px",
                    backgroundColor: value === 1 ? "#1f363d" : "transparent",
                    "&:hover": {
                      backgroundColor: "#ced4da",
                      color: "#6c757d",
                    },
                    borderRadius: "8px",
                    color: value === 1 ? "#FFF !important" : "#c5c3c6",
                  }}
                  label="Open Tender Approach"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box sx={{ width: "100%" }}>
                <TableContainer
                  sx={{ maxHeight: 560, border: "1px solid #ced4da" }}
                >
                  <Table
                    sx={{ minWidth: 700 }}
                    stickyHeader
                    size="small"
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Sr. No.</StyledTableCell>
                        <StyledTableCell>SPV Name</StyledTableCell>
                        <StyledTableCell>Name of Selected Bidder</StyledTableCell>
                        <StyledTableCell>PPA Reference No</StyledTableCell>
                        <StyledTableCell>LOA Reference No</StyledTableCell>
                        <StyledTableCell>Solar Capacity (MW)</StyledTableCell>
                        <StyledTableCell>District Name</StyledTableCell>
                        <StyledTableCell>Approach Type</StyledTableCell>
                        <StyledTableCell>View</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredClusterData ? (
                        (filteredClusterData || []).map(
                          (element, index) => {
                            const PPA_Referance_No = element.PPA_Reference_No;
                            const sfile_Id = 1;
                            const secretKey = "9096609945";

                            // Convert data into a JSON string
                            const dataToEncrypt = JSON.stringify({
                              PPA_Referance_No,
                              sfile_Id,
                            });

                            // Encrypt the JSON string
                            const encryptedData = CryptoJS.AES.encrypt(
                              dataToEncrypt,
                              secretKey
                            ).toString();

                            // Encode to make it URL-safe
                            const encodedData =
                              encodeURIComponent(encryptedData);

                            // Construct the final URL
                            const finalURL = `/dashboard?data=${encodedData}`;

                            return (
                              <StyledTableRow key={index}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>
                                  {element.SPVName}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.Name_of_Selected_Bidder}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.PPA_Reference_No}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.LOA_Reference_No}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.Solar_Capacity}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.DistrictName}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.ApproachType}
                                </StyledTableCell>
                                <StyledTableCell style={{ textAlign: "center" }}>
                              <Link title="Dashboard" to={finalURL}>
                                <DashboardCustomizeRoundedIcon className="EditViewIcon" />
                              </Link>
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
                  sx={{ maxHeight: 560, border: "1px solid #ced4da" }}
                >
                  <Table
                    sx={{ minWidth: 700 }}
                    stickyHeader
                    size="small"
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                      <StyledTableCell>Sr. No.</StyledTableCell>
                        <StyledTableCell>SPV Name</StyledTableCell>
                        <StyledTableCell>Name of Selected Bidder</StyledTableCell>
                        <StyledTableCell>PPA Reference No</StyledTableCell>
                        <StyledTableCell>LOA Reference No</StyledTableCell>
                        <StyledTableCell>Solar Capacity (MW)</StyledTableCell>
                        <StyledTableCell>District Name</StyledTableCell>
                        <StyledTableCell>Approach Type</StyledTableCell>
                        <StyledTableCell>View</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredProjectData ? (
                        (filteredProjectData || []).map(
                          (element, index) => {
                            const PPA_Referance_No = element.PPA_Reference_No;
                            const sfile_Id = 1;
                            const secretKey = "9096609945";

                            // Convert data into a JSON string
                            const dataToEncrypt = JSON.stringify({
                              PPA_Referance_No,
                              sfile_Id,
                            });

                            // Encrypt the JSON string
                            const encryptedData = CryptoJS.AES.encrypt(
                              dataToEncrypt,
                              secretKey
                            ).toString();

                            // Encode to make it URL-safe
                            const encodedData =
                              encodeURIComponent(encryptedData);

                            // Construct the final URL
                            const finalURL = `/dashboard?data=${encodedData}`;

                            return (
                                <StyledTableRow key={index}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>
                                  {element.SPVName}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.Name_of_Selected_Bidder}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.PPA_Reference_No}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.LOA_Reference_No}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.Solar_Capacity}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.DistrictName}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {element.ApproachType}
                                </StyledTableCell>
                                <StyledTableCell style={{ textAlign: "center" }}>
                              <Link title="Dashboard" to={finalURL}>
                                <DashboardCustomizeRoundedIcon className="EditViewIcon" />
                              </Link>
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
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProjectCFA;
