import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import EditIcon from "@mui/icons-material/Edit";
import ViewCompactRoundedIcon from "@mui/icons-material/ViewCompactRounded";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import Loader from "../Common/Loader/loader";
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

const MercAdoptionOrder = () => {
  // Ensure default value to avoid undefined errors
  const [MercAdoptionOrderData, setMercAdoptionOrderData] = useState({
    mercAdoptionOrderLists: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/api/MercAdoptionOrderData?sfile_id=1`)
      .then((response) => {
        if (response.status === 200) {
          console.log("MercAdoptionOrderData>>>", response.data);
          setMercAdoptionOrderData(
            response.data || { mercAdoptionOrderLists: [] }
          );
          setTotalItems((response.data?.mercAdoptionOrderLists || []).length);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalPages = Math.ceil(
    (MercAdoptionOrderData?.mercAdoptionOrderLists?.length || 0) / itemsPerPage
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    MercAdoptionOrderData?.mercAdoptionOrderLists?.slice(
      indexOfFirstItem,
      indexOfLastItem
    ) || [];

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
      {MercAdoptionOrderData?.mercAdoptionOrderLists?.length > 0 ? (
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
              padding: "0 14px",
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
            <h2 style={{ margin: "15px 0" }}>MERC Adoption Order List</h2>
          </div>
          <Box p={1}>
            <TableContainer>
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
                    <StyledTableCell>Date of Petition Filing</StyledTableCell>
                    <StyledTableCell>Date of Admission</StyledTableCell>
                    <StyledTableCell>Date of Final Hearing</StyledTableCell>
                    <StyledTableCell>Date of Issuance of Order</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                    <StyledTableCell>View</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((element, index) => {
                    const v_mercId = element.mercID;
                    const sfile_id = "1";
                    const DistCode = element.Dist_Code;
                    const secretKey = "9096609945";

                    // Convert data into a JSON string
                    const dataToEncrypt = JSON.stringify({
                      v_mercId,
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
                    const editUrl = `/mercAdoptionOrderAddEdit?data=${encodedData}&mode=edit`;
                    const viewUrl = `/mercAdoptionOrderAddEdit?data=${encodedData}&mode=view`;
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          {element.District_Name}
                        </StyledTableCell>
                        <StyledTableCell>Cluster(i)</StyledTableCell>
                        <StyledTableCell>
                          {element.LOI_Reference_no}
                        </StyledTableCell>
                        <StyledTableCell>
                          {new Date(
                            element.Date_of_petition_filing
                          ).toLocaleDateString("en-GB")}
                        </StyledTableCell>
                        <StyledTableCell>
                          {new Date(
                            element.Date_Admissibility_Hearing
                          ).toLocaleDateString("en-GB")}
                        </StyledTableCell>
                        <StyledTableCell>
                          {new Date(
                            element.Date_Final_Hearing
                          ).toLocaleDateString("en-GB")}
                        </StyledTableCell>
                        <StyledTableCell>
                          {new Date(
                            element.Date_Issuance_the_order
                          ).toLocaleDateString("en-GB")}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            textAlign: "center",
                            padding: "auto",
                            cursor: "pointer",
                          }}
                        >
                          <Box
                            title="Approved"
                            sx={{
                              borderRadius: "20px",
                              backgroundColor: "#34d39933",

                              color: "#10b981",
                              padding: "5px 10px",
                              fontSize: "12px",
                              width: "fit-content",
                              fontWeight: "bolder !important",
                            }}
                          >
                            A
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

export default MercAdoptionOrder;
