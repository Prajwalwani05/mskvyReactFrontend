import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import EditIcon from "@mui/icons-material/Edit";
import ViewCompactRoundedIcon from "@mui/icons-material/ViewCompactRounded";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
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
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.white,
}));

const ClusterSummary = () => {
  const { clusterSummaryData, setClusterSummaryData } = useContext(
    DataContext
  ) || { clusterSummaryData: { clusterSummaries: [] } };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/api/ClusterSummaryData?sfile_id=1`)
      .then((response) => {
        if (response.status === 200) {
          setClusterSummaryData(response.data || { clusterSummaries: [] });
          setTotalItems((response.data?.clusterSummaries || []).length);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Filter data based on search query
  const filteredData =
    clusterSummaryData?.clusterSummaries?.filter((element) => {
      return (
        element.District_Name.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        element.RFS_Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.SPVName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }) || [];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination Handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      {clusterSummaryData?.clusterSummaries?.length > 0 ? (
        <Box
          sx={{
            backgroundColor: "#FFF",
            margin: "10px",
            borderRadius: "8px",
            border: "4px solid #07beb8",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
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
              backgroundColor: "#07beb8",
            }}
          >
            <Box
              sx={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.71 11.29-6-6A.996.996 0 1 0 13.3 6.7l4.29 4.29H4c-.55 0-1 .45-1 1s.45 1 1 1h13.59l-4.29 4.29a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l6-6a.996.996 0 0 0 0-1.41Z" fill="%23FFFFFF"></path></svg>')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "25px",
                height: "25px",
              }}
            ></Box>
            <h2 style={{ margin: "15px 0", color: "#FFF" }}>
              Cluster Summary List
            </h2>
            {/* Add Search Input */}
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                marginLeft: "auto",
                color: "#FFF",
                marginRight: "10px",
                width: "200px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#FFF", // Outline color
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFF", // Hover outline color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FFF", // Focused outline color
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#FFF", // Text color
                },
                "& .MuiInputLabel-root": {
                  color: "#FFF", // Label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FFF", // Focused label color
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#FFF", // Placeholder text color
                },
              }}
            />
          </div>
          <Box p={1}>
            <Box sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 620 }}>
                <Table
                  sx={{ minWidth: 700 }}
                  stickyHeader
                  size="small"
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>District Name</StyledTableCell>
                      <StyledTableCell>Cluster Name</StyledTableCell>
                      <StyledTableCell>RFS Number</StyledTableCell>
                      <StyledTableCell>Date of RFS</StyledTableCell>
                      <StyledTableCell>Bid Submission Date</StyledTableCell>
                      <StyledTableCell>SPV Name</StyledTableCell>
                      <StyledTableCell>
                        Scheduled LOI Issuance Date
                      </StyledTableCell>  
                      <StyledTableCell>
                        Actual LOI Issuance Date
                      </StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>Action</StyledTableCell>
                      <StyledTableCell>View</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentItems.map((element, index) => {
                      const v_clusterSummeryID = element.clusterSummeryID;
                      const sfile_id = "1";
                      const str_action = "s";
                      const secretKey = "9096609945";

                      // Convert data into a JSON string
                      const dataToEncrypt = JSON.stringify({
                        v_clusterSummeryID,
                        sfile_id,
                        str_action,
                      });

                      // Encrypt the JSON string
                      const encryptedData = CryptoJS.AES.encrypt(
                        dataToEncrypt,
                        secretKey
                      ).toString();

                      // Encode to make it URL-safe
                      const encodedData = encodeURIComponent(encryptedData);

                      // Construct the final URL
                      const finalURL = `/clusterSummaryAddEdit?data=${encodedData}`;

                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                            {element.District_Name}
                          </StyledTableCell>
                          <StyledTableCell>Cluster(i)</StyledTableCell>
                          <StyledTableCell>
                            {element.RFS_Number}
                          </StyledTableCell>
                          <StyledTableCell>
                            {new Date(element.Date_OF_RFS).toLocaleDateString(
                              "en-GB"
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            {new Date(
                              element.Bid_Submission_Date
                            ).toLocaleDateString("en-GB")}
                          </StyledTableCell>
                          <StyledTableCell>
                            MSKVY {element.SPVName} Solar SPV Limited
                          </StyledTableCell>
                          <StyledTableCell>
                            {element.Scheduled_LOI_Issuance_Date !==
                            "0000-00-00 00:00:00.000"
                              ? new Date(
                                  element.Scheduled_LOI_Issuance_Date
                                ).toLocaleDateString("en-GB")
                              : "-"}
                          </StyledTableCell>
                          <StyledTableCell>
                            {element.Scheduled_LOI_Issuance_Date !==
                            "0000-00-00 00:00:00.000"
                              ? new Date(
                                  element.Actual_LOI_Issuance_Date
                                ).toLocaleDateString("en-GB")
                              : "-"}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              textAlign: "center",
                              padding: "auto",
                              cursor: "pointer",
                            }}
                          >
                            <Box
                              title={
                                element.Status === "In Progress"
                                  ? "In Progress"
                                  : element.Status === "Approved"
                                  ? "Approved"
                                  : "Yet To Start"
                              }
                              sx={{
                                borderRadius: "20px",
                                backgroundColor:
                                  element.Status === "Approved"
                                    ? "#34d39933"
                                    : element.Status === "In Progress"
                                    ? "#fbbf2433"
                                    : "#dee2e6",

                                color:
                                  element.Status === "Approved"
                                    ? "#10b981"
                                    : element.Status === "In Progress"
                                    ? "#f59e0b"
                                    : "#495057",
                                padding: "5px 10px",
                                fontSize: "12px",
                                width: "fit-content",
                                fontWeight: "bolder !important",
                              }}
                            >
                              {element.Status === "In Progress"
                                ? "P"
                                : element.Status === "Approved"
                                ? "A"
                                : "Y"}
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell style={{ textAlign: "center" }}>
                            <Link to={false} style={{ pointerEvents: "none" }}>
                              <EditIcon className="EditViewIcon" />
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell style={{ textAlign: "center" }}>
                            <Link title="view" to={finalURL}>
                              <ViewCompactRoundedIcon className="EditViewIcon" />
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            {/* Pagination */}
            <div className="pagination">
              <GoChevronLeft
                className="paginationArrows"
                onClick={goToPreviousPage}
              />
              <span className="paginationPage">{currentPage}</span>
              <GoChevronRight
                className="paginationArrows"
                onClick={goToNextPage}
              />
            </div>
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ClusterSummary;

// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import DataContext from "../context/DataContext";
// import { Box, TextField, Grid } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import CryptoJS from "crypto-js";
// import Loader from "../Common/Loader/loader";
// import { Link } from "react-router-dom";
// import EditIcon from "@mui/icons-material/Edit";
// import ViewCompactRoundedIcon from "@mui/icons-material/ViewCompactRounded";

// const ClusterSummary = () => {
//   const { clusterSummaryData, setClusterSummaryData } = useContext(
//     DataContext
//   ) || { clusterSummaryData: { clusterSummaries: [] } };

//   const [searchQuery, setSearchQuery] = useState(""); // Search query state
//   const apiUrl = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     axios
//       .get(`${apiUrl}/api/ClusterSummaryData?sfile_id=1`)
//       .then((response) => {
//         if (response.status === 200) {
//           setClusterSummaryData(response.data || { clusterSummaries: [] });
//         } else {
//           throw new Error("Network response was not ok");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // Filter data based on search query
//   const filteredData = clusterSummaryData?.clusterSummaries?.filter((element) => {
//     return (
//       element.District_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       element.Cluster_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       element.RFS_Number.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }) || [];

//   // Prepare data for DataGrid
//   const rows = filteredData.map((element, index) => {
//     const v_clusterSummeryID = element.clusterSummeryID;
//     const sfile_id = "1";
//     const str_action = "s";
//     const secretKey = "9096609945";

//     const dataToEncrypt = JSON.stringify({
//       v_clusterSummeryID,
//       sfile_id,
//       str_action,
//     });

//     const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
//     const encodedData = encodeURIComponent(encryptedData);
//     const finalURL = `/clusterSummaryAddEdit?data=${encodedData}`;

//     return {
//       id: index, // Use index as id
//       District_Name: element.District_Name,
//       Cluster_Name: element.Cluster_Name,
//       RFS_Number: element.RFS_Number,
//       Date_OF_RFS: new Date(element.Date_OF_RFS).toLocaleDateString("en-GB"),
//       Bid_Submission_Date: new Date(element.Bid_Submission_Date).toLocaleDateString("en-GB"),
//       SPV_Name: `MSKVY ${element.SPVName} Solar SPV Limited`,
//       Scheduled_LOI_Issuance_Date: element.Scheduled_LOI_Issuance_Date !== "0000-00-00 00:00:00.000"
//         ? new Date(element.Scheduled_LOI_Issuance_Date).toLocaleDateString("en-GB")
//         : "-",
//       Actual_LOI_Issuance_Date: element.Actual_LOI_Issuance_Date !== "0000-00-00 00:00:00.000"
//         ? new Date(element.Actual_LOI_Issuance_Date).toLocaleDateString("en-GB")
//         : "-",
//       Status: element.Status,
//       Action: <Link to={false} style={{ pointerEvents: "none" }}><EditIcon className="EditViewIcon" /></Link>,
//       View: <Link to={finalURL}><ViewCompactRoundedIcon className="EditViewIcon" /></Link>
//     };
//   });

//   // Define columns for DataGrid
//   const columns = [
//     { field: "District_Name", headerName: "District Name", flex: 1 },
//     { field: "Cluster_Name", headerName: "Cluster Name", flex: 1 },
//     { field: "RFS_Number", headerName: "RFS Number", flex: 1 },
//     { field: "Date_OF_RFS", headerName: "Date of RFS", flex: 1 },
//     { field: "Bid_Submission_Date", headerName: "Bid Submission Date", flex: 1 },
//     { field: "SPV_Name", headerName: "SPV Name", flex: 1 },
//     { field: "Scheduled_LOI_Issuance_Date", headerName: "Scheduled LOI Issuance Date", flex: 1 },
//     { field: "Actual_LOI_Issuance_Date", headerName: "Actual LOI Issuance Date", flex: 1 },
//     { field: "Status", headerName: "Status", flex: 1 },
//     { field: 'Action', headerName: 'Action', flex: 1, renderCell: (params) => (
//       <Link to={false} style={{ pointerEvents: "none" }}>
//         <EditIcon className="EditViewIcon" />
//       </Link>
//     )
//   },
//   {
//     field: 'View',
//     headerName: 'View',
//     flex: 1,
//     renderCell: (params) => {
//       const { v_clusterSummeryID } = params.row;
//       const sfile_id = "1";
//       const str_action = "s";
//       const secretKey = "9096609945";

//       const dataToEncrypt = JSON.stringify({
//         v_clusterSummeryID,
//         sfile_id,
//         str_action,
//       });

//       const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
//       const encodedData = encodeURIComponent(encryptedData);
//       const finalURL = `/clusterSummaryAddEdit?data=${encodedData}`;

//       return (
//         <Link to={finalURL}>
//           <ViewCompactRoundedIcon className="EditViewIcon" />
//         </Link>
//       );
//     }
//   }
//   ];

//   return (
//     <>
//       {clusterSummaryData?.clusterSummaries?.length > 0 ? (
//         <Box
//           sx={{
//             backgroundColor: "#FFF",
//             margin: "10px",
//             borderRadius: "5px",
//             boxShadow:
//               "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-start",
//               gap: "10px",
//               alignItems: "center",
//               padding: "0 10px",
//               marginBottom: "5px",
//             }}
//           >
//             <Box
//               sx={{
//                 backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.71 11.29-6-6A.996.996 0 1 0 13.3 6.7l4.29 4.29H4c-.55 0-1 .45-1 1s.45 1 1 1h13.59l-4.29 4.29a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l6-6a.996.996 0 0 0 0-1.41Z" fill="%23200020"></path></svg>')`,
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "cover",
//                 width: "25px",
//                 height: "25px",
//               }}
//             ></Box>
//             <h2 style={{ margin: "15px 0" }}>Cluster Summary List</h2>
//             {/* Add Search Input */}
//             <TextField
//               label="Search"
//               variant="outlined"
//               size="small"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               sx={{ marginLeft: "auto", marginRight: "10px", width: "200px" }}
//             />
//           </div>
//           <Box p={1}>
//             <div style={{ height: 620, width: "100%" , overflow:'hidden'}}>
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 pageSize={9}
//                 rowsPerPageOptions={[9]}
//                 pagination
//                 filterModel={{
//                   items: [
//                     { columnField: "District_Name", operatorValue: "contains", value: searchQuery },
//                     { columnField: "Cluster_Name", operatorValue: "contains", value: searchQuery },
//                     { columnField: "RFS_Number", operatorValue: "contains", value: searchQuery },
//                   ],
//                 }}
//                 disableSelectionOnClick
//               />
//             </div>
//           </Box>
//         </Box>
//       ) : (
//         <Loader />
//       )}
//     </>
//   );
// };

// export default ClusterSummary;
