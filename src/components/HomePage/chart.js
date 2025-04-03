import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

export default function StackedBarChart() {
  const [dashboardData, setDashboardData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/TenderingSPVDashboard?sfile_id=1`);
        setDashboardData(transformData(response.data));
      } catch (err) {
        console.error("Error fetching API:", err);
      }
    };
    fetchDashboardData();
  }, []);

  // Transform API Data for Stacked Chart
  const transformData = (data) => {
    if (!data) return [];

    const sumMW = (list, type) =>
      list ? list.filter(item => item.Type === type).reduce((sum, item) => sum + (parseFloat(item.MW) || 0), 0) : 0;

    return [
      {
        category: "LOA",
        Cluster: sumMW(data.spv_LoaLists, "Total LOA"),
        OpenTender: sumMW(data.spv_projectLoaLists, "Total LOA"),
      },
      {
        category: "PBG",
        Cluster: sumMW(data.spv_pbgLists, "Total PBG"),
        OpenTender: sumMW(data.spv_projectpbgLists, "Total PBG LOA Base"),
      },
      {
        category: "PPA",
        Cluster: sumMW(data.spv_ppaLists, "Total PPA"),
        OpenTender: sumMW(data.spv_projectppaLists, "LOA Base PPA"),
      },
      {
        category: "IA",
        Cluster: sumMW(data.spv_iaLists, "Total IA"),
        OpenTender: sumMW(data.spv_projectiaLists, "LOA Base IA"),
      },
    ];
  };

  return (
    <Card sx={{ padding: 2, boxShadow: 3 , marginBottom:2}}>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Stacked Bar Chart - LOA, PBG, PPA, IA (Cluster vs. Open Tender)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData} margin={{ top: 20, right: 30, left: 50, bottom: 10 }}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Cluster" stackId="a" fill="#103783" barSize={100} />
            <Bar dataKey="OpenTender" stackId="a" fill="#2a9d8f"  barSize={100} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
