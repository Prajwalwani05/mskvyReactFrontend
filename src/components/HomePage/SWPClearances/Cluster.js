import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import EditIcon from "@mui/icons-material/Edit";
import ViewCompactRoundedIcon from '@mui/icons-material/ViewCompactRounded';
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import {
  Box,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loader from "../../Common/Loader/loader";
import PieChartWithPaddingAngle from "./Charts";

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

const Cluster = () => {
  // Ensure default value to avoid undefined errors
  const [clusterSWPClearanceSummaryData, setClusterSWPClearanceSummaryData] =
    useState({ ClearanceSummaries: [] });
  //   const [totalItems, setTotalItems] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/api/ClusterSWPClearanceSummaryData?sfile_id=1`)
      .then((response) => {
        if (response.status === 200) {
          console.log("ClusterSWPClearanceSummaryData>>>", response.data);
          setClusterSWPClearanceSummaryData(
            response.data || { ClearanceSummaries: [] }
          );
          setTotalItems((response.data?.ClearanceSummaries || []).length);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // // Ensure clusterSummaryData.clusterSummaries is not undefined
  // const totalPages = Math.ceil(
  //   (clusterSWPClearanceSummaryData?.ClearanceSummaries?.length || 0) /
  //     itemsPerPage
  // );
  const chartData =
    clusterSWPClearanceSummaryData?.SummarySubstations?.map((ele) => ({
      label: ele.legendText || "Unknown", // Provide a fallback label if needed
      value: ele.y || 0, // Ensure there's a numeric value
    })) || [];
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems =
  //     clusterSWPClearanceSummaryData?.ClearanceSummaries?.slice(
  //       indexOfFirstItem,
  //       indexOfLastItem
  //     ) || [];

  //   // Pagination Handlers
  //   const goToNextPage = () => {
  //     if (currentPage < totalPages) {
  //       setCurrentPage((prevPage) => prevPage + 1);
  //     }
  //   };

  //   const goToPreviousPage = () => {
  //     if (currentPage > 1) {
  //       setCurrentPage((prevPage) => prevPage - 1);
  //     }
  //   };

  return (
    <>
      {clusterSWPClearanceSummaryData?.ClearanceSummaries?.length > 0 ? (
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
              SWP Clearance Summary (Cluster Approach)
            </h2>
            {/* <button className="download-table-xls-button">Add +</button> */}
          </div>
          <Box>
            <PieChartWithPaddingAngle
              chartData={chartData}
              chartName={"Cluster Status"}
            />
          </Box>
          <Box p={1} py={2}>
            <Box sx={{ width: "100%" }}>
              <TableContainer sx={{ maxHeight: 620 }}>
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
                      <StyledTableCell>District Name</StyledTableCell>
                      <StyledTableCell>Project Code</StyledTableCell>
                      <StyledTableCell>LOA Reference No.</StyledTableCell>
                      <StyledTableCell>PPA Reference No.</StyledTableCell>
                      <StyledTableCell>Solar Capacity (MW)</StyledTableCell>
                      <StyledTableCell>No. Of Substation</StyledTableCell>
                      <StyledTableCell style={{ width: "100px" }}>
                        Status
                      </StyledTableCell>
                      <StyledTableCell>View</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clusterSWPClearanceSummaryData?.ClearanceSummaries.map(
                      (element, index) => {
                        const spvNames =
                          clusterSWPClearanceSummaryData?.ClearanceSummaries.map(
                            (ele) => ({
                              name: ele.SPVName,
                              projectCode: ele.PROJECT_CODE,
                            })
                          ).filter((ele) => ele.name);
                        const projectCode = element.PROJECT_CODE;
                        const sfile_id = "1";
                        const approachType = "Cluster";
                        const spvName = element.SPVName;
                        const spvList = spvNames;
                        const secretKey = "9096609945";

                        // Convert data into a JSON string
                        const dataToEncrypt = JSON.stringify({
                          projectCode,
                          sfile_id,
                          approachType,
                          spvName,
                          spvList,
                        });

                        // Encrypt the JSON string
                        const encryptedData = CryptoJS.AES.encrypt(
                          dataToEncrypt,
                          secretKey
                        ).toString();

                        // Encode to make it URL-safe
                        const encodedData = encodeURIComponent(encryptedData);

                        // Construct the final URL
                        const finalURL = `/SWPSubStationsClearanceSummaryData?data=${encodedData}`;

                        // console.log("Final Encrypted URL:", finalURL);

                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>{element.SPVName}</StyledTableCell>
                            <StyledTableCell>
                              {element.name_of_the_Selected_Bidder_Company}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.DistrictName}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.PROJECT_CODE}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.LOA_Reference_No}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.PPA_Reference_No}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.Aggregate_Capacity_MW}
                            </StyledTableCell>
                            <StyledTableCell>{element.SS_No}</StyledTableCell>
                            <StyledTableCell
                              sx={{
                                textAlign: "center",
                                padding: "auto",
                                cursor:'pointer'
                              }}
                            >
                              <Box
                                sx={{
                                  borderRadius: "20px",
                                  backgroundColor:
                                    element.SS_No === element.SS_Comp_count
                                      ? "#34d39933"
                                      : element.SS_No >= element.SS_InProg_count
                                      ? "#fbbf2433"
                                      : element.SS_InProg_count === "0"
                                      ? "#fb718533"
                                      : "#dee2e6",

                                  color:
                                    element.SS_No === element.SS_Comp_count
                                      ? "#10b981"
                                      : element.SS_No >= element.SS_InProg_count
                                      ? "#f59e0b"
                                      : element.SS_InProg_count === "0"
                                      ? "#f43f5e"
                                      : "#495057",
                                  padding: "5px 10px",
                                  fontSize: "12px",
                                  width: "fit-content",
                                  fontWeight: "bolder !important",
                                }}
                              >
                                {element.SS_No === element.SS_Comp_count
                                  ? "C"
                                  : element.SS_No >= element.SS_InProg_count
                                  ? "P"
                                  : element.SS_InProg_count === "0"
                                  ? "Y"
                                  : "Miss Match"}
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell style={{ textAlign: "center" }}>
                              <Link title="view" to={finalURL}>
                              <ViewCompactRoundedIcon  className="EditViewIcon" />
                              </Link>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            {/* <div className="pagination">
              <GoChevronLeft
                className="paginationArrows"
                onClick={goToPreviousPage}
              />
              <span className="paginationPage">{currentPage}</span>
              <GoChevronRight
                className="paginationArrows"
                onClick={goToNextPage}
              />
            </div> */}
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Cluster;
