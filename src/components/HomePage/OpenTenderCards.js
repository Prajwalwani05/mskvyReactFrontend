import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Loader from "../Common/Loader/loader";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  boxShadow: theme.shadows[3],
}));

const Header = styled(Typography)(({ theme, color }) => ({
  backgroundColor: color,
  color: "#fff",
  textAlign: "center",
  padding: theme.spacing(1),
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  fontWeight: "bold",
}));

const DataCard = ({ title, color, data }) => {
  return (
    <StyledCard>
      <Header variant="h6" color={color}>
        {title}
      </Header>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Typography fontSize={'12px'} align="center" fontWeight="bold">
              Status
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontSize={'12px'} align="center" fontWeight="bold">
              Total Count
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontSize={'12px'} align="center" fontWeight="bold">
              Solar Capacity (MW)
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <Grid container spacing={2} key={index} alignItems="center" sx={{ mt: 1 }}>
              <Grid item xs={4}>
                <Typography  fontSize={'12px'} align="left" sx={{ pl: 2 }}>
                  {item.Type}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography  fontSize={'12px'} align="center">{item.Total}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography  fontSize={'12px'} align="center">{item.MW}</Typography>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography align="center" sx={{ mt: 2 }}>
            No Data Available
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default function DashboardOpenTender({dashboardData}) {
  // const [dashboardData, setDashboardData] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  
  
  // if (loading) return <Loader />;
  if (error) return <Typography align="center" color="error">{`Error: ${error}`}</Typography>;

  return (
    <Grid container spacing={2}>
      {/* LOA Data */}
      <Grid item xs={12} sm={8} md={6}>
        <DataCard title="Total LOA" color="#64b5f6" data={dashboardData?.spv_projectLoaLists || []} />
      </Grid>
      {/* PBG Data */}
      <Grid item xs={12} sm={8} md={6}>
        <DataCard title="Total PBG" color="#ff9800" data={dashboardData?.spv_projectpbgLists || []} />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4}>
        <DataCard title="Total SSPA" color='maroon' data={dashboardData?.spv_sspaLists || []} />
      </Grid> */}
      <Grid item xs={12} sm={8} md={6}>
        <DataCard title="Total PPA" color="darkgreen" data={dashboardData?.spv_projectppaLists || []} />
      </Grid>
      <Grid item xs={12} sm={8} md={6}>
        <DataCard title="Total IA" color='#023e8a' data={dashboardData?.spv_projectiaLists || []} />
      </Grid>
      <Grid item xs={12} sm={8} md={6}>
        <DataCard title="Sub-Lease (Govt. Land)" color="#7209b7" data={dashboardData?.spv_projectsub_LeaseLists || []} />
      </Grid>
    </Grid>
  );
}
