import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  linearProgressClasses,
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
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${props.value}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

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
const MilestoneSPVDashboard = () => {
  const [dasboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
    try {
      const response = await axios.get(`${apiUrl}/api/DashboardSPV`, {
        params: {
          sfile_Id: 1,
          Summary_Id: sessionData.SummaryId,
          Reference_NO: sessionData.ReferenceNo,
          ApproachType: sessionData.ApproachType,
          Is_Split: sessionData.IsSplit,
        },
      });

      if (response.status === 200) {
        setDashboard(response.data);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredfirstCFA =
    dasboard?.Model?.milestoneSPVDataEntryGridLists?.filter((item) => {
      return item.MilestoneType === "1st CFA Instalment (30%)";
    }) || [];
  const filteredSecondCFA =
    dasboard?.Model?.milestoneSPVDataEntryGridLists?.filter((item) => {
      return item.MilestoneType === "2nd CFA Instalment (30%)";
    }) || [];
  const filteredThirdCFA =
    dasboard?.Model?.milestoneSPVDataEntryGridLists?.filter((item) => {
      return item.MilestoneType === "3rd CFA Instalment (40%)";
    }) || [];
  const filteredPPACFA =
    dasboard?.Model?.milestoneSPVDataEntryGridLists?.filter((item) => {
      return item.MilestoneType === "PPA Milestone";
    }) || [];
  const filteredIACFA =
    dasboard?.Model?.milestoneSPVDataEntryGridLists?.filter((item) => {
      return item.MilestoneType === "IA Milestone";
    }) || [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : dasboard?.Model?.milestoneSPVDataEntryGridLists?.length > 0 ? (
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
            <Box
              p={2}
              py={1}
              display={"flex"}
              gap={"10px"}
              alignItems={"stretch"}
              flexWrap={"wrap"}
            >
              {dasboard?.Model?.SPVDetails_By_Dashboard ? (
                <>
                  <Box
                    p={2}
                    flexGrow={1}
                    display="flex"
                    flexDirection="column"
                    sx={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                      borderRadius: "8px",
                      minHeight: "100%",
                    }}
                  >
                    <Box
                      display={"flex"}
                      flexWrap={"wrap"}
                      mb={1}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="body2">
                        Name of Successful Bidder:
                      </Typography>
                      <Typography variant="body2">
                        {dasboard.Model.SPVDetails_By_Dashboard
                          ?.Name_of_the_Selected_Bidder || "N/A"}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      mt={1}
                      display={"flex"}
                      flexWrap={"wrap"}
                      mb={1}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="body2">
                        Address of Successful Bidder:
                      </Typography>
                      <Typography variant="body2">
                        {dasboard.Model.SPVDetails_By_Dashboard
                          ?.address_of_the_Selected_Bidder || "N/A"}
                      </Typography>
                    </Box>
                    <Divider />

                    <Box
                      mt={1}
                      display={"flex"}
                      flexWrap={"wrap"}
                      mb={1}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="body2">Name of SPV:</Typography>
                      <Typography variant="body2">
                        {dasboard.Model.SPVDetails_By_Dashboard?.SPVName ||
                          "N/A"}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      mt={1}
                      display={"flex"}
                      flexWrap={"wrap"}
                      mb={1}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="body2">Address of SPV:</Typography>
                      <Typography variant="body2">
                        {dasboard.Model.SPVDetails_By_Dashboard?.SPV_Address ||
                          "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    p={2}
                    flexGrow={1}
                    display="flex"
                    flexDirection="column"
                    sx={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                      borderRadius: "8px",
                      minHeight: "100%",
                      // backgroundColor: "#f1faee",
                    }}
                  >
                    <Box
                      display={"flex"}
                      flexWrap={"wrap"}
                      mb={1}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="body2">Capacity:</Typography>
                      <Typography variant="body2">
                        {dasboard.Model.SPVDetails_By_Dashboard
                          ?.SolarCapacity || "N/A"}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      mt={1}
                      display={"flex"}
                      flexWrap={"wrap"}
                      mb={1}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="body2">RFS No.:</Typography>
                      <Typography variant="body2">
                        {dasboard.Model.SPVDetails_By_Dashboard
                          ?.Reference_No_Of_RfS || "N/A"}
                      </Typography>
                    </Box>
                    <Divider />

                    <Box
                      mt={1}
                      display={"flex"}
                      flexWrap={"wrap"}
                      mb={1}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="body2">Date of RFS:</Typography>
                      <Typography variant="body2">
                        {dasboard.Model.SPVDetails_By_Dashboard
                          ?.Date_of_Issuance_Rfs || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </>
              ) : (
                <Typography>No SPV Details Found</Typography>
              )}
            </Box>
            <Box
              p={2}
              pt={0}
              display={"flex"}
              gap={"10px"}
              alignItems={"stretch"}
              flexWrap={"wrap"}
            >
              <Box
                p={2}
                flexGrow={1}
                sx={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                  borderRadius: "8px",
                }}
              >
                <Box
                  mt={1}
                  display={"flex"}
                  flexWrap={"wrap"}
                  mb={1}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body2">
                    1st CFA Instalment (30%) :
                  </Typography>
                  <Box sx={{ width: "50%" }}>
                    <LinearProgressWithLabel
                      value={(dasboard?.Model?.firstMilestonePercentage).toFixed(
                        2
                      )}
                    />
                    {/* <LinearProgress variant="determinate" value={dasboard?.Model?.firstMilestonePercentage} /> */}
                  </Box>
                </Box>
                <Divider />
                <Box
                  mt={1}
                  display={"flex"}
                  flexWrap={"wrap"}
                  mb={1}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body2">
                    2nd CFA Instalment (30%) :
                  </Typography>
                  <Box sx={{ width: "50%" }}>
                    <LinearProgressWithLabel
                      value={(dasboard?.Model?.secondMilestonePercentage).toFixed(
                        2
                      )}
                    />
                    {/* <LinearProgress variant="determinate" value={dasboard?.Model?.firstMilestonePercentage} /> */}
                  </Box>
                </Box>
                <Divider />
                <Box
                  mt={1}
                  display={"flex"}
                  flexWrap={"wrap"}
                  mb={1}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body2">
                    3rd CFA Instalment (40%) :
                  </Typography>
                  <Box sx={{ width: "50%" }}>
                    <LinearProgressWithLabel
                      value={(dasboard?.Model?.thirdMilestonePercentage).toFixed(
                        2
                      )}
                    />
                    {/* <LinearProgress variant="determinate" value={dasboard?.Model?.firstMilestonePercentage} /> */}
                  </Box>
                </Box>
              </Box>
              <Box
                p={2}
                flexGrow={1}
                sx={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                  borderRadius: "8px",
                }}
              >
                <Box
                  mt={1}
                  display={"flex"}
                  flexWrap={"wrap"}
                  mb={1}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body2">PPA Milestone :</Typography>
                  <Box sx={{ width: "50%" }}>
                    <LinearProgressWithLabel
                      value={(dasboard?.Model?.ppaMilestonePercentage).toFixed(
                        2
                      )}
                    />
                    {/* <LinearProgress variant="determinate" value={dasboard?.Model?.firstMilestonePercentage} /> */}
                  </Box>
                </Box>
                <Divider />
                <Box
                  mt={1}
                  display={"flex"}
                  flexWrap={"wrap"}
                  mb={1}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body2">IA Milestone :</Typography>
                  <Box sx={{ width: "50%" }}>
                    <LinearProgressWithLabel
                      value={(dasboard?.Model?.iaMilestonePercentage).toFixed(
                        2
                      )}
                    />
                    {/* <LinearProgress variant="determinate" value={dasboard?.Model?.firstMilestonePercentage} /> */}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box px={1.6}  sx={{ width: "100%", overflowX: "auto" }}>
              <Tabs
               value={value}
               onChange={handleChange}
               aria-label="responsive tabs"
               variant="scrollable"
               scrollButtons="auto"
               allowScrollButtonsMobile
               sx={{
                 "& .MuiTabs-indicator": {
                   display: "none", // Hide indicator
                 },

                 backgroundColor: "#F9F9FA",
                 borderRadius: "10px",
                 border: "1px solid rgb(226, 226, 226)",
                 padding: { xs: "4px", sm: "6px", md: "8px" }, // Responsive padding
                 minHeight: { xs: "32px", sm: "36px", md: "38px" }, // Adjust height dynamically
                 width: "100%", // ✅ Ensures full width
                 display: "flex",
                 justifyContent: "center", // ✅ Centers content
               }}
              >
                <Tab
                  sx={{
                    padding: "3 !important",
                    minHeight: "35px",
                    fontSize: "13px",
                    fontWeight: "600",
                    transition: "background-color 0.3s ease",
                    margin: "0",
                    marginRight: "2px",
                    flex: 1,
                    minWidth: "fit-content" ,
                    backgroundColor: value === 0 ? "#1f363d" : "transparent",
                    "&:hover": {
                      backgroundColor: "#ced4da", // Hover effect
                      color: "#6c757d",
                    },
                    borderRadius: "8px",
                    color: value === 0 ? "#FFF !important" : "#c5c3c6",
                  }}
                  label="1st CFA Installment (30%)"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{
                    padding: "3 !important",
                    minHeight: "35px",
                    fontSize: "13px",
                    fontWeight: "600",
                    flex: 1,
                    minWidth: "fit-content" ,
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
                  label="2nd CFA Installment (30%)"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={{
                    padding: "3 !important",
                    minHeight: "35px",
                    fontSize: "13px",
                    fontWeight: "600",
                    flex: 1,
                    minWidth: "fit-content" ,
                    transition: "background-color 0.3s ease",
                    margin: "0",
                    marginRight: "2px",
                    backgroundColor: value === 2 ? "#1f363d" : "transparent",
                    "&:hover": {
                      backgroundColor: "#ced4da",
                      color: "#6c757d",
                    },
                    borderRadius: "8px",
                    color: value === 2 ? "#FFF !important" : "#c5c3c6",
                  }}
                  label="3rd CFA Installment (40%)"
                  {...a11yProps(2)}
                />
                <Tab
                  sx={{
                    padding: "3 !important",
                    minHeight: "35px",
                    fontSize: "13px",
                    fontWeight: "600",
                    transition: "background-color 0.3s ease",
                    margin: "0",
                    flex: 1,
                    minWidth: "fit-content" ,
                    marginRight: "2px",
                    backgroundColor: value === 3 ? "#1f363d" : "transparent",
                    "&:hover": {
                      backgroundColor: "#ced4da",
                      color: "#6c757d",
                    },
                    borderRadius: "8px",
                    color: value === 3 ? "#FFF !important" : "#c5c3c6",
                  }}
                  label="PPA Milestone"
                  {...a11yProps(3)}
                />
                <Tab
                  sx={{
                    padding: "3 !important",
                    minHeight: "35px",
                    fontSize: "13px",
                    fontWeight: "600",
                    transition: "background-color 0.3s ease",
                    margin: "0",
                    marginRight: "2px",
                    flex: 1,
                    minWidth: "fit-content" ,
                    backgroundColor: value === 4 ? "#1f363d" : "transparent",
                    "&:hover": {
                      backgroundColor: "#ced4da",
                      color: "#6c757d",
                    },
                    borderRadius: "8px",
                    color: value === 4 ? "#FFF !important" : "#c5c3c6",
                  }}
                  label="IA Milestone"
                  {...a11yProps(4)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box sx={{ width: "100%" }}>
                <TableContainer
                  sx={{ maxHeight: 350, border: "1px solid #ced4da" }}
                >
                  <Table
                    sx={{ minWidth: 700 }}
                    stickyHeader
                    size="medium"
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Sr. No.</StyledTableCell>
                        <StyledTableCell>Milestone</StyledTableCell>
                        <StyledTableCell>Milestone Level</StyledTableCell>
                        <StyledTableCell>SPV Status</StyledTableCell>
                        <StyledTableCell>Checker Status</StyledTableCell>
                        <StyledTableCell>Approver Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredfirstCFA ? (
                        (filteredfirstCFA || []).map((element, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell>{index + 1}</StyledTableCell>
                              <StyledTableCell>
                                {element.MilestoneName ===
                                  "Bay Allocation Letter received from MSEDCL" ||
                                element.MilestoneName ===
                                  "GST Invoices of Solar Modules, Inverters , Transformers" ||
                                element.MilestoneName ===
                                  "Decide and Procure Govt./ Private Land. Submit Land Details  to MSEDCL" ||
                                element.MilestoneName ===
                                  "Preliminary Civil Work completion (50%) (Includes Module Mounting Structure)" ? (
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={"finalURL"}
                                  >
                                    <Typography fontSize={"13px"}>
                                      {element.MilestoneName}
                                    </Typography>
                                  </Link>
                                ) : (
                                  <Typography fontSize={"13px"}>
                                    {element.MilestoneName}
                                  </Typography>
                                )}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.MilestoneLevel}
                              </StyledTableCell>
                              {element.MilestoneLevel_Id === "SS" ? (
                                <>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.SPV_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.MSEDCL_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.Final_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                </>
                              ) : element.MilestoneLevel_Id === "LL" ? (
                                <>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.SPV_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.MSEDCL_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.Final_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                </>
                              ) : (
                                <>
                                  <StyledTableCell>
                                    {element.SPV_Status || "-"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {element.MSEDCL_Status || "-"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {element.Final_Status || "-"}
                                  </StyledTableCell>
                                </>
                              )}
                            </StyledTableRow>
                          );
                        })
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
                  sx={{ maxHeight: 350, border: "1px solid #ced4da" }}
                >
                  <Table
                    sx={{ minWidth: 700 }}
                    stickyHeader
                    size="medium"
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Sr. No.</StyledTableCell>
                        <StyledTableCell>Milestone</StyledTableCell>
                        <StyledTableCell>Milestone Level</StyledTableCell>
                        <StyledTableCell>SPV Status</StyledTableCell>
                        <StyledTableCell>Checker Status</StyledTableCell>
                        <StyledTableCell>Approver Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredSecondCFA ? (
                        (filteredSecondCFA || []).map((element, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell>{index + 1}</StyledTableCell>
                              <StyledTableCell>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={"finalURL"}
                                >
                                  <Typography fontSize={"13px"}>
                                    {element.MilestoneName}
                                  </Typography>
                                </Link>
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.MilestoneLevel}
                              </StyledTableCell>
                              {element.MilestoneLevel_Id === "SS" ? (
                                <>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.SPV_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.MSEDCL_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.Final_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                </>
                              ) : element.MilestoneLevel_Id === "LL" ? (
                                <>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.SPV_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.MSEDCL_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.Final_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                </>
                              ) : (
                                <>
                                  <StyledTableCell>
                                    {element.SPV_Status || "-"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {element.MSEDCL_Status || "-"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {element.Final_Status || "-"}
                                  </StyledTableCell>
                                </>
                              )}
                            </StyledTableRow>
                          );
                        })
                      ) : (
                        <Loader />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
              <Box sx={{ width: "100%" }}>
                <TableContainer
                  sx={{ maxHeight: 350, border: "1px solid #ced4da" }}
                >
                  <Table
                    sx={{ minWidth: 700 }}
                    stickyHeader
                    size="medium"
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Sr. No.</StyledTableCell>
                        <StyledTableCell>Milestone</StyledTableCell>
                        <StyledTableCell>Milestone Level</StyledTableCell>
                        <StyledTableCell>SPV Status</StyledTableCell>
                        <StyledTableCell>Checker Status</StyledTableCell>
                        <StyledTableCell>Approver Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredThirdCFA ? (
                        (filteredThirdCFA || []).map((element, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell>{index + 1}</StyledTableCell>
                              <StyledTableCell>
                                {element.MilestoneName ===
                                "Submission of Project Completion Report" ? (
                                  <Typography fontSize={"13px"}>
                                    {element.MilestoneName}
                                  </Typography>
                                ) : (
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={"finalURL"}
                                  >
                                    <Typography fontSize={"13px"}>
                                      {element.MilestoneName}
                                    </Typography>
                                  </Link>
                                )}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.MilestoneLevel}
                              </StyledTableCell>
                              {element.MilestoneLevel_Id === "SS" ? (
                                <>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.SPV_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.MSEDCL_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.Final_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                </>
                              ) : element.MilestoneLevel_Id === "LL" ? (
                                <>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.SPV_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.MSEDCL_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.Final_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                </>
                              ) : (
                                <>
                                  <StyledTableCell>
                                    {element.SPV_Status || "-"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {element.MSEDCL_Status || "-"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {element.Final_Status || "-"}
                                  </StyledTableCell>
                                </>
                              )}
                            </StyledTableRow>
                          );
                        })
                      ) : (
                        <Loader />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
              <Box sx={{ width: "100%" }}>
                <TableContainer
                  sx={{ maxHeight: 350, border: "1px solid #ced4da" }}
                >
                  <Table
                    sx={{ minWidth: 700 }}
                    stickyHeader
                    size="medium"
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Sr. No.</StyledTableCell>
                        <StyledTableCell>Milestone</StyledTableCell>
                        <StyledTableCell>Milestone Level</StyledTableCell>
                        <StyledTableCell>SPV Status</StyledTableCell>
                        <StyledTableCell>Checker Status</StyledTableCell>
                        <StyledTableCell>Approver Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredPPACFA ? (
                        (filteredPPACFA || []).map((element, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell>{index + 1}</StyledTableCell>
                              <StyledTableCell>
                                {element.MilestoneName === "Declare CUF" ||
                                element.MilestoneName === "Insurance Cover" ||
                                element.MilestoneName === "Release of PBG" ? (
                                  <Typography fontSize={"13px"}>
                                    {element.MilestoneName}
                                  </Typography>
                                ) : (
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={"finalURL"}
                                  >
                                    <Typography fontSize={"13px"}>
                                      {element.MilestoneName}
                                    </Typography>
                                  </Link>
                                )}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.MilestoneLevel}
                              </StyledTableCell>
                              {element.MilestoneLevel_Id === "SS" ? (
                                <>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.SPV_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.MSEDCL_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.Final_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                </>
                              ) : element.MilestoneLevel_Id === "LL" ? (
                                <>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.SPV_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.MSEDCL_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.Final_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                </>
                              ) : (
                                <>
                                  <StyledTableCell>
                                    {element.SPV_Status || "-"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {element.MSEDCL_Status || "-"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {element.Final_Status || "-"}
                                  </StyledTableCell>
                                </>
                              )}
                            </StyledTableRow>
                          );
                        })
                      ) : (
                        <Loader />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={4}>
              <Box sx={{ width: "100%" }}>
                <TableContainer
                  sx={{ maxHeight: 350, border: "1px solid #ced4da" }}
                >
                  <Table
                    sx={{ minWidth: 700 }}
                    stickyHeader
                    size="medium"
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Sr. No.</StyledTableCell>
                        <StyledTableCell>Milestone</StyledTableCell>
                        <StyledTableCell>Milestone Level</StyledTableCell>
                        <StyledTableCell>SPV Status</StyledTableCell>
                        <StyledTableCell>Checker Status</StyledTableCell>
                        <StyledTableCell>Approver Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredIACFA ? (
                        (filteredIACFA || []).map((element, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell>{index + 1}</StyledTableCell>
                              <StyledTableCell>
                                {element.MilestoneName}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.MilestoneLevel}
                              </StyledTableCell>
                              {element.MilestoneLevel_Id === "SS" ? (
                                <>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.SPV_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.MSEDCL_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_SS_No_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_SS_No_Count !== 0
                                        ? element.Final_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                </>
                              ) : element.MilestoneLevel_Id === "LL" ? (
                                <>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.SPV_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.MSEDCL_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={{
                                      textAlign: "center",
                                      padding: "auto",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderRadius: "20px",
                                        backgroundColor: "#fbbf2433",
                                        color: "#f59e0b",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        width: "fit-content",
                                        fontWeight: "bolder !important",
                                      }}
                                    >
                                      {element.No_Of_Land_Count ===
                                        element.SPVStatus_Count &&
                                      element.No_Of_Land_Count !== 0
                                        ? element.Final_Status
                                        : "P"}
                                    </Box>
                                  </StyledTableCell>
                                </>
                              ) : (
                                <>
                                  <StyledTableCell>
                                    {element.SPV_Status || "-"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {element.MSEDCL_Status || "-"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {element.Final_Status || "-"}
                                  </StyledTableCell>
                                </>
                              )}
                            </StyledTableRow>
                          );
                        })
                      ) : (
                        <Loader />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CustomTabPanel>
            <Box
              // mt={2}
              width="100%"
              display="flex"
              justifyContent="flex-end"
              gap="5px"
            >
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MilestoneSPVDashboard;
