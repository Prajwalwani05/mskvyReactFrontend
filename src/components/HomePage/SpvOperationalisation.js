import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomizedTables from "./TotalTable";
import LOACard from "./ClusterCards";
import Dashboard from "./ClusterCards";
import DashboardOpenTender from "./OpenTenderCards";
import DashboardCluster from "./ClusterCards";
import StackedBarChart from "./chart";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

const SpvOperationalisation = () => {
  const [value, setValue] = React.useState(0);
  const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchDashboardData = async () => {
      const finalUrl = `${apiUrl}/api/TenderingSPVDashboard?sfile_id=1`;
      console.log("Fetching from API:", finalUrl); // ✅ Log the final URL

      try {
        const response = await axios.get(finalUrl);
        console.log("Response received:", response.data);
        setDashboardData(response.data);
      } catch (err) {
        console.error("Error fetching API:", err); // ✅ Log error details
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

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
        <h2 style={{ margin: "15px 0" }}>SPV Operationalisation Dashboard</h2>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box px={1.6} pt={2}>
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
              label="Total Solar Project Under MSKVY 2.0"
              {...a11yProps(0)}
            />
            <Tab
             sx={{padding:'0 !important',minHeight:'35px', fontSize: "15px", fontWeight: "600", transition: "background-color 0.3s ease",
                margin: "0", marginRight: "2px", backgroundColor: value === 1 ? "#1f363d" : "transparent",
                "&:hover": {
                  backgroundColor: "#ced4da", // Hover effect
                  color: '#6c757d'
                },
                borderRadius: "8px",  color: value === 1 ? "#FFF !important": "#c5c3c6"}}
              label="Cluster Approach"
              {...a11yProps(1)}
            />
            <Tab
             sx={{padding:'0 !important',minHeight:'35px', fontSize: "15px", fontWeight: "600", transition: "background-color 0.3s ease",
                margin: "0", marginRight: "2px", backgroundColor: value === 2 ? "#1f363d" : "transparent",
                "&:hover": {
                  backgroundColor: "#ced4da", // Hover effect
                  color: '#6c757d'
                },
                borderRadius: "8px",  color: value === 2 ? "#FFF !important": "#c5c3c6"}}
              label="Open Tender Approach"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <StackedBarChart />
          <CustomizedTables />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <DashboardCluster dashboardData = {dashboardData}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <DashboardOpenTender dashboardData = {dashboardData}/>
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default SpvOperationalisation;
