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
  Paper,
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
    // border: "1px solid #000",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.white,
}));

const LetterOfIntent = () => {
  // Ensure default value to avoid undefined errors
  const [letterOfIntentData, setLetterOfIntentData] = useState({
    latterOfIntents: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/api/LetterOfIntentData?sfile_id=1`)
      .then((response) => {
        if (response.status === 200) {
          console.log("LetterOfIntentData>>>", response.data);
          setLetterOfIntentData(response.data || { latterOfIntents: [] });
          setTotalItems((response.data?.latterOfIntents || []).length);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
// Filter data based on search query
const filteredData = letterOfIntentData?.latterOfIntents?.filter((element) => {
  return (
    element.District_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    element.RFS_Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    element.SPVName.toLowerCase().includes(searchQuery.toLowerCase())
  );
}) || [];

const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages = Math.ceil(
  //   (letterOfIntentData?.latterOfIntents?.length || 0) / itemsPerPage
  // );
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems =
  //   letterOfIntentData?.latterOfIntents?.slice(
  //     indexOfFirstItem,
  //     indexOfLastItem
  //   ) || [];

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
      {letterOfIntentData?.latterOfIntents?.length > 0 ? (
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
              justifyContent: 'space-between',
              gap: "10px",
              alignItems: "center",
              padding: "0 10px",
              marginBottom: "5px",
            }}
          >
           <Box display={'flex'} alignItems={'center'}>

            <Box
              sx={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.71 11.29-6-6A.996.996 0 1 0 13.3 6.7l4.29 4.29H4c-.55 0-1 .45-1 1s.45 1 1 1h13.59l-4.29 4.29a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l6-6a.996.996 0 0 0 0-1.41Z" fill="%23200020"></path></svg>')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "25px",
                height: "25px",
              }}
            ></Box>
            <h2 style={{ margin: "15px 0" }}>Letter of Intent List</h2>
           </Box>
            {/* <button className="download-table-xls-button">Add +</button> */}
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // sx={{ marginLeft: "auto", marginRight: "10px", width: "200px" }}
            />
          </div>
          <Box p={1}>
            {/* <Paper sx={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px', width: "100%", overflow: "hidden" }}> */}
            <TableContainer sx={{ maxHeight: 600 }}>
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
                    <StyledTableCell>LOI Reference No.</StyledTableCell>
                    {/* <StyledTableCell>Bid Submission Date</StyledTableCell> */}
                    <StyledTableCell>SPV Name</StyledTableCell>
                    <StyledTableCell>
                      Scheduled LOI Issuance Date
                    </StyledTableCell>
                    <StyledTableCell>Actual LOI Issuance Date</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                    <StyledTableCell>View</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((element, index) => {
                    const v_loiID = element.loiID;
                    const sfile_id = "1";
                    const DistCode = element.District_Name;
                    const secretKey = "9096609945";

                    // Convert data into a JSON string
                    const dataToEncrypt = JSON.stringify({
                      v_loiID,
                      sfile_id,
                      DistCode,
                    });

                    // Encrypt the JSON string
                    const encryptedData = CryptoJS.AES.encrypt(
                      dataToEncrypt,
                      secretKey
                    ).toString();

                    // Encode to make it URL-safe
                    const encodedData = encodeURIComponent(encryptedData);

                    // Construct the final URL
                    //    const finalURL = `/letterOfIntentAddEdit?data=${encodedData}`;
                    const editUrl = `/letterOfIntentAddEdit?data=${encodedData}&mode=edit`;
                    const viewUrl = `/letterOfIntentAddEdit?data=${encodedData}&mode=view`;
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{element.Dist_Name}</StyledTableCell>
                        <StyledTableCell>Cluster(i)</StyledTableCell>
                        <StyledTableCell>{element.RFS_Number}</StyledTableCell>
                        <StyledTableCell>
                          {new Date(element.Date_OF_RFS).toLocaleDateString(
                            "en-GB"
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          {element.LOI_Reference_No}
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
                          <Link title="edit" to={editUrl}>
                            <EditIcon className="EditViewIcon" />
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell style={{ textAlign: "center" }}>
                          <Link title="view" to={viewUrl}>
                            <ViewCompactRoundedIcon className="EditViewIcon" />
                          </Link>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* </Paper> */}
            {/* </div> */}
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

export default LetterOfIntent;
