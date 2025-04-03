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
import MultiplePieCharts from "./Charts";

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

const SystemStrengthening = () => {
  // Ensure default value to avoid undefined errors
  const [SystemStrengtheningData, setSystemStrengtheningData] = useState({
    systemStrengtheningLists: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/api/SystemStrengtheningData?sfile_id=1`)
      .then((response) => {
        if (response.status === 200) {
          console.log("SystemStrengtheningData>>>", response.data);
          setSystemStrengtheningData(
            response.data || { systemStrengtheningLists: [] }
          );
          setTotalItems((response.data?.systemStrengtheningLists || []).length);
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
      {SystemStrengtheningData?.systemStrengtheningLists?.length > 0 ? (
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
              Summary Of Substations Identified For Strengthening
            </h2>
            {/* <button className="download-table-xls-button">Add +</button> */}
          </div>
          <Box>
            <MultiplePieCharts graphs={SystemStrengtheningData.Graphs} />
          </Box>
          <Box p={1} pt={2}>
            <Box sx={{ width: "100%" }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 700 }}
                  stickyHeader
                  size="small"
                  aria-label="sticky table"
                >
                  <TableHead>
                    <StyledTableCell
                      style={{ backgroundColor: "#F9F9FA" }}
                    ></StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#F9F9FA" }}>
                      Completed
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#F9F9FA" }}>
                      In Progress
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#F9F9FA" }}>
                      Yet to Start
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#F9F9FA" }}>
                      Not Applicable(NA)
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "#F9F9FA" }}>
                      Total Count
                    </StyledTableCell>
                  </TableHead>
                  <TableBody>
                    {SystemStrengtheningData?.Graphs?.map((ele) => {
                      return (
                        <StyledTableRow>
                          <StyledTableCell>{ele.MSKVY_Type}</StyledTableCell>
                          <StyledTableCell>{ele.Completed}</StyledTableCell>
                          <StyledTableCell>{ele.In_Progress}</StyledTableCell>
                          <StyledTableCell>{ele.Yet_To_Start}</StyledTableCell>
                          <StyledTableCell>{ele.Not_Req}</StyledTableCell>
                          <StyledTableCell>
                            {ele.ALL_Total_Count}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
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
                      <StyledTableCell>S/S Count(As per LOA)</StyledTableCell>
                      <StyledTableCell>
                        Solar Capacity(MW)(As per LOA)
                      </StyledTableCell>
                      <StyledTableCell>
                        S/S Count(Strengthening Req.)
                      </StyledTableCell>
                      <StyledTableCell>
                        Solar Capacity(MW)(Strengthening Req.)
                      </StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>View</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {SystemStrengtheningData?.systemStrengtheningLists.map(
                      (element, index) => {
                        const spvNames =
                          SystemStrengtheningData?.systemStrengtheningLists
                            ?.map((ele) => ({
                              name: ele.SPVName,
                              clusterNo: ele.CLUSTER_NO,
                              clusterId: ele.clusterSummeryID,
                            }))
                            .filter((ele) => ele.name);
                            sessionStorage.setItem('spvList', JSON.stringify(spvNames));
                        const summaryId = element.clusterSummeryID;
                        const ReferenceNo = element.CLUSTER_NO;
                        const approachType = element.Approach_Type;
                        const spvName = element.SPVName;
                        const Issplit = element.IsSplit;
                        const sfile_id = 1;
                        const secretKey = "9096609945";

                        // Convert data into a JSON string
                        const dataToEncrypt = JSON.stringify({
                          summaryId,
                          ReferenceNo,
                          approachType,
                          Issplit,
                          spvName,
                          sfile_id,
                        });

                        // Encrypt the JSON string
                        const encryptedData = CryptoJS.AES.encrypt(
                          dataToEncrypt,
                          secretKey
                        ).toString();

                        // Encode to make it URL-safe
                        const encodedData = encodeURIComponent(encryptedData);

                        // Construct the final URL
                        const finalURL = `/SystemStrengtheningSS?data=${encodedData}`;

                        // console.log("Final Encrypted URL:", finalURL);

                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>{element.SPVName}</StyledTableCell>
                            <StyledTableCell>
                              {element.Name_Of_Selected_Bidder}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.SS_Count}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.SOLAR_CAPACITY_MW}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.SS_Count_System_strengthening}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.System_strengthening_SOLAR_CAPACITY_MW}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{
                                textAlign: "center",
                                padding: "auto",
                                cursor:'pointer'
                              }}
                            >
                              <Box
                               title={
                                element.Status === "In_Progress"
                                  ? "In Progress"
                                  : element.Status === "Completed"
                                  ? "Completed"
                                  : element.Status === "Yet_To_Start"
                                  ? "Yet To Start"
                                  : ""
                              }
                                sx={{
                                  borderRadius: "20px",
                                  backgroundColor:
                                    element.Status === "Completed"
                                      ? "#34d39933"
                                      : element.Status === "In_Progress"
                                      ? "#fbbf2433"
                                      : element.Status === "Yet_To_Start"
                                      ? "#fb718533"
                                      : "#dee2e6",

                                  color:
                                    element.Status === "Completed"
                                      ? "#10b981"
                                      : element.Status === "In_Progress"
                                      ? "#f59e0b"
                                      : element.Status === "Yet_To_Start"
                                      ? "#f43f5e"
                                      : "#495057",
                                  padding: "5px 10px",
                                  fontSize: "12px",
                                  width: "fit-content",
                                  fontWeight: "bolder !important",
                                }}
                              >
                                {element.Status === "In_Progress"
                                  ? "P"
                                  : element.Status === "Completed"
                                  ? "C"
                                  : element.Status === "Yet_To_Start"
                                  ? "Y"
                                  : ""}
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

export default SystemStrengthening;
