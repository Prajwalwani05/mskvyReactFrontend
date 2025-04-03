import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Typography } from "@mui/material";
import Loader from "../Common/Loader/loader";

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
    // border: "1px solid #000",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.action.white,
}));

export default function CustomizedTables() {
  const [dashboardData, setDashboardData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      const finalUrl = `${apiUrl}/api/TenderingSPVDashboard?sfile_id=1`;
      console.log("Fetching from API:", finalUrl);

      try {
        const response = await axios.get(finalUrl);
        console.log("Response received:", response.data);
        setDashboardData(transformData(response.data));
      } catch (err) {
        console.error("Error fetching API:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const transformData = (data) => {
    if (!data) return [];
  
    // Function to sum MW values from a given list
    const sumMW = (list) => {
      return list ? list.reduce((sum, item) => sum + (parseFloat(item.MW) || 0), 0) : 0;
    };
  
    // Extracting MW values from spv_LoaLists, spv_pbgLists, spv_ppaLists, and spv_iaLists
    const totalLOACluster = sumMW(data.spv_LoaLists?.filter(item => item.Type === "Total LOA"));
    const totalLOAOpenTender = sumMW(data.spv_projectLoaLists?.filter(item => item.Type === "Total LOA")); 
    const totalPBGCLuster = sumMW(data.spv_pbgLists?.filter(item => item.Type === "Total PBG"));
    const totalPBGOpenTender = sumMW(data.spv_projectpbgLists?.filter(item => item.Type === "Total PBG LOA Base")); 
    const totalPPACLuster = sumMW(data.spv_ppaLists?.filter(item => item.Type === "Total PPA"));
    const totalPPAOpenTender = sumMW(data.spv_projectppaLists?.filter(item => item.Type === "LOA Base PPA")); 
    const totalIACLuster = sumMW(data.spv_iaLists?.filter(item => item.Type === "Total IA"));
    const totalIAOpenTender = sumMW(data.spv_projectiaLists?.filter(item => item.Type === "LOA Base IA")); 

    const signedLOACluster = sumMW(data.spv_LoaLists?.filter(item => item.Type === "Signed"));
    const signedPBGCluster = sumMW(data.spv_pbgLists?.filter(item => item.Type === "Received"));
    const signedPPACluster = sumMW(data.spv_ppaLists?.filter(item => item.Type === "Signed"));; // Assuming same value
    const signedIACluster = sumMW(data.spv_iaLists?.filter(item => item.Type === "Signed"));

    const signedLOAOpenTender = sumMW(data.spv_projectLoaLists?.filter(item => item.Type === "Signed"));
    const signedPBGOpenTender = sumMW(data.spv_projectpbgLists?.filter(item => item.Type === "Received"));
    const signedPPAOpenTender = sumMW(data.spv_projectppaLists?.filter(item => item.Type === "Signed")); // Assuming same value
    const signedIAOpenTender = sumMW(data.spv_projectiaLists?.filter(item => item.Type === "Signed")); 
  
    const pendingLOACluster = sumMW(data.spv_LoaLists?.filter(item => item.Type === "Panding"));
    const pendingPBGCluster = sumMW(data.spv_pbgLists?.filter(item => item.Type === "Panding"));
    const pendingPPACluster = sumMW(data.spv_ppaLists?.filter(item => item.Type === "Panding"));
    const pendingIACluster = sumMW(data.spv_iaLists?.filter(item => item.Type === "Panding"));
  
    const pendingLOAOpenTender = sumMW(data.spv_projectLoaLists?.filter(item => item.Type === "Panding"));
    const pendingPBGOpenTender = sumMW(data.spv_projectpbgLists?.filter(item => item.Type === "Panding"));
    const pendingPPAOpenTender = sumMW(data.spv_projectppaLists?.filter(item => item.Type === "Panding"));
    const pendingIAOpenTender = sumMW(data.spv_projectiaLists?.filter(item => item.Type === "Panding"));
  
    // Creating the final table structure
    const result = [
      { category: "Total", approach: "Cluster Approach", LOA: totalLOACluster, PBG: totalPBGCLuster, PPA: totalPPACLuster, IA: totalIACLuster },
      { category: "Total", approach: "Open Tender Approach", LOA: totalLOAOpenTender, PBG: totalPBGOpenTender, PPA: totalPPAOpenTender, IA: totalIAOpenTender },
      { category: "Total", approach: "Total", LOA: totalLOACluster + totalLOAOpenTender, PBG: totalPBGCLuster + totalPBGOpenTender, PPA: totalPPACLuster + totalPPAOpenTender, IA: totalIACLuster + totalIAOpenTender },
  
      { category: "Signed (LOA, PPA & IA) / Received (PBG)", approach: "Cluster Approach", LOA: signedLOACluster, PBG: signedPBGCluster, PPA: signedPPACluster, IA: signedIACluster },
      { category: "Signed (LOA, PPA & IA) / Received (PBG)", approach: "Open Tender Approach", LOA: signedLOAOpenTender, PBG: signedPBGOpenTender, PPA: signedPPAOpenTender, IA: signedIAOpenTender },
      { category: "Signed (LOA, PPA & IA) / Received (PBG)", approach: "Total", LOA: signedLOACluster + signedLOAOpenTender, PBG: signedPBGCluster + signedPBGOpenTender, PPA: signedPPACluster + signedPPAOpenTender, IA: signedIACluster + signedIAOpenTender },
  
      { category: "Pending", approach: "Cluster Approach", LOA: pendingLOACluster, PBG: pendingPBGCluster, PPA: pendingPPACluster, IA: pendingIACluster },
      { category: "Pending", approach: "Open Tender Approach", LOA: pendingLOAOpenTender, PBG: pendingPBGOpenTender, PPA: pendingPPAOpenTender, IA: pendingIAOpenTender },
      { category: "Pending", approach: "Total", LOA: pendingLOACluster + pendingLOAOpenTender, PBG: pendingPBGCluster + pendingPBGOpenTender, PPA: pendingPPACluster + pendingPPAOpenTender, IA: pendingIACluster + pendingIAOpenTender }
    ];
  
    return result;
  };
  

  if (loading) return <Loader />;
  if (error) return <Typography align="center" color="error">{`Error: ${error}`}</Typography>;
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: "350px" }}  rowSpan={3}>Category</StyledTableCell>
            <StyledTableCell>Approach</StyledTableCell>
            <StyledTableCell align="right"><strong>LOA (in MW)</strong></StyledTableCell>
            <StyledTableCell align="right"><strong>PBG (in MW)</strong></StyledTableCell>
            <StyledTableCell align="right"><strong>PPA (in MW)</strong></StyledTableCell>
            <StyledTableCell align="right"><strong>IA (in MW)</strong></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboardData.map((row, index) => (
            <StyledTableRow  key={index}>
              {index % 3 === 0 && (
                  <StyledTableCell rowSpan={3} component="th" scope="row">
                    <strong>
                     {row.category}   
                     </strong>
                  </StyledTableCell>
                )}
              <StyledTableCell><strong>{row.approach}</strong></StyledTableCell>
              <StyledTableCell align="right"><strong>{row.LOA}</strong></StyledTableCell>
              <StyledTableCell align="right"><strong>{row.PBG}</strong></StyledTableCell>
              <StyledTableCell align="right"><strong>{row.PPA}</strong></StyledTableCell>
              <StyledTableCell align="right"><strong>{row.IA}</strong></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
