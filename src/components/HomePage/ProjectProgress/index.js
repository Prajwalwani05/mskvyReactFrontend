import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Loader from "../../Common/Loader/loader";
import BasicBars from "./BarChart";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Link, useNavigate } from "react-router-dom";

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

const ProjectProgress = () => {
  // Ensure default value to avoid undefined errors
  const [projectExecutionSummary, setProjectExecutionSummary] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/api/projectExecutionSummary`)
      .then((response) => {
        if (response.status === 200) {
          console.log("projectExecutionSummary>>>", response.data);
          setProjectExecutionSummary(response.data);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const allClusterSum = projectExecutionSummary?.Model?._progressStatusCluster?.reduce(
    (sum, ele) => sum + ele.SsNo, 
    0
  );  
  const allOpenTenderSum = projectExecutionSummary?.Model?._progressStatusOpenTender?.reduce(
    (sum, ele) => sum + ele.SsNo, 
    0
  ); 
  const allClusterCommisioned = projectExecutionSummary?.Model?._progressStatusCluster?.reduce(
    (sum, ele) => sum + ele.Commissioned_SS, 
    0
  );  
  const allOpenTenderCommisioned = projectExecutionSummary?.Model?._progressStatusOpenTender?.reduce(
    (sum, ele) => sum + ele.Commissioned_SS, 
    0
  ); 
  const allClusterCapacity = projectExecutionSummary?.Model?._progressStatusCluster?.reduce(
    (sum, ele) => sum + ele.AggregateCapacityMW, 
    0
  );  
  const allOpenTenderCapacity = projectExecutionSummary?.Model?._progressStatusOpenTender?.reduce(
    (sum, ele) => sum + ele.AggregateCapacityMW, 
    0
  ); 
  const allClusterSSCapacity = projectExecutionSummary?.Model?._progressStatusCluster?.reduce(
    (sum, ele) => sum + ele.Commissioned_Capacity, 
    0
  );  
  const allOpenTenderSSCapacity = projectExecutionSummary?.Model?._progressStatusOpenTender?.reduce(
    (sum, ele) => sum + ele.Commissioned_Capacity, 
    0
  ); 

  const handleViewDetails = (data) => {
    navigate(`/GetAllSummary`, { state: { data } });
  }
 
  return (
    <>
      {projectExecutionSummary?.Model?._projectExecution?.length > 0 ? (
        <Box
          sx={{
            backgroundColor: "#FFF",
            margin: "10px",
            //  padding:'5px',
            borderRadius: "5px",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
              // overflowX:'auto'
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
            {/* <button className="download-table-xls-button">Add +</button> */}
          </div>
          {/* <Box>
            <MultiplePieCharts graphs={SystemStrengtheningData.Graphs} />
          </Box> */}
          <Box display={"flex"}>
            <Box flex={1} p={1} pt={2}>
              <Box sx={{ width: "100%" }}>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 650 }}
                    stickyHeader
                    size="small"
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <StyledTableCell>Particulars</StyledTableCell>
                      <StyledTableCell>No. Of Substation</StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {projectExecutionSummary?.Model?._projectExecution.map(
                        (ele) => {
                          return (
                            <>
                              <StyledTableRow>
                                <StyledTableCell>
                                  Total No. Of AG Substations
                                </StyledTableCell>
                                <StyledTableCell>{ele.SsNo}</StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                <StyledTableCell>
                                  LOA Issued Capacity
                                </StyledTableCell>
                                <StyledTableCell>
                                  {allClusterSum + allOpenTenderSum}
                                </StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                <StyledTableCell>
                                  Commissioned Till Date
                                </StyledTableCell>
                                <StyledTableCell >
                                {/* style={{color:'blue', cursor:'pointer', textDecoration:'underline'}} */}
                                  {/* <Link to={'/commissionedSS'}>
                                  {allClusterCommisioned + allOpenTenderCommisioned}
                                  </Link> */}
                                  {allClusterCommisioned + allOpenTenderCommisioned}
                                </StyledTableCell>
                              </StyledTableRow>
                            </>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
            <Box p={1} pt={2}>
              <Box sx={{ width: "100%" }}>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 650 }}
                    stickyHeader
                    size="small"
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <StyledTableCell>Particulars</StyledTableCell>
                      <StyledTableCell>No. Of Substation</StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {projectExecutionSummary?.Model?._projectExecution.map(
                        (ele) => {
                          return (
                            <>
                              <StyledTableRow>
                                <StyledTableCell>
                                  Total AG Substations Capacity
                                </StyledTableCell>
                                <StyledTableCell>
                                  {ele.AggregateCapacityMW}
                                </StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                <StyledTableCell>
                                  LOA Issued Capacity
                                </StyledTableCell>
                                <StyledTableCell>
                                  {allClusterCapacity + allOpenTenderCapacity}
                                </StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                <StyledTableCell>
                                  Commissioned Till Date
                                </StyledTableCell>
                                <StyledTableCell >
                                       {/* <Link to={'/commissionedSS'}>
                                        {allClusterSSCapacity + allOpenTenderSSCapacity}
                                       </Link> */}
                                       {allClusterSSCapacity + allOpenTenderSSCapacity}
                                </StyledTableCell>
                              </StyledTableRow>
                            </>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} pr={2}>
            <Button variant="contained" size="medium" style={{ backgroundColor: "#069465" }} onClick={()=>handleViewDetails(projectExecutionSummary)}>View Details</Button>
          </Box>
          <Divider flexItem orientation="horizontal" style={{marginTop:'10px'}}/>
          <Box p={2} display={'flex'}>
            <Box flex={1}>
                <Typography variant="h6" textAlign={'center'}>Substations</Typography>
            <BasicBars data1={projectExecutionSummary?.Model?._projectExecution[0]?.SsNo || 0}  data2 = {allClusterSum + allOpenTenderSum} data3 = {allClusterCommisioned + allOpenTenderCommisioned}/>
            </Box>
            <Box>
            <Typography variant="h6" textAlign={'center'}>Solar Capacity(MW)</Typography>
            <BasicBars data1={projectExecutionSummary?.Model?._projectExecution[0]?.AggregateCapacityMW || 0}  data2 = {allClusterCapacity + allOpenTenderCapacity} data3 = {allClusterSSCapacity + allOpenTenderSSCapacity}/>
            </Box>
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProjectProgress;
