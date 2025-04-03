import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
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
} from "@mui/material";import Loader from "../Common/Loader/loader";

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


const UserRole = () => {
  // Ensure default value to avoid undefined errors
  const [UserRoleData, setUserRoleData] = useState({ ListRole: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/api/RoleModelData?sfile_id=1`)
      .then((response) => {
        if (response.status === 200) {
          console.log("UserRoleData>>>", response.data);
          setUserRoleData(response.data || { ListRole: [] });
          setTotalItems((response.data?.ListRole || []).length);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Ensure clusterSummaryData.clusterSummaries is not undefined
  const totalPages = Math.ceil(
    (UserRoleData?.ListRole?.length || 0) / itemsPerPage
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    UserRoleData?.ListRole?.slice(indexOfFirstItem, indexOfLastItem) || [];

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
      {UserRoleData?.ListRole?.length > 0 ? (
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
            <h2 style={{ margin: "15px 0" }}>Role List</h2>
            {/* <button className="download-table-xls-button">Add +</button> */}
          </div>
          <Box p={1} pt={2}>
                     <Box sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: 590 }}>
                <Table
                  sx={{ minWidth: 700 }}
                  stickyHeader
                //   size="small" 
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                    <StyledTableCell>Role Name</StyledTableCell>
                    <StyledTableCell>Role Description</StyledTableCell>
                    <StyledTableCell>User Type Name</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {currentItems.map((element, index) => {
                    const finalURL = `/UserRoleEdit?sRoleID=${element.RoleID}&sfile_id=1&mode=edit`;

                    console.log("Final Encrypted URL:", finalURL);

                    return (
                      <StyledTableRow key={index}>
                          <StyledTableCell>{element.RoleName}</StyledTableCell>
                        <StyledTableCell>{element.RoleDescription}</StyledTableCell>
                        <StyledTableCell>{element.UserTypeName}</StyledTableCell>
                        {/* <StyledTableCell style={{textAlign:'center'}}><a href="/" aria-disabled="true" ><EditIcon /></a></StyledTableCell> */}
                        <StyledTableCell style={{ textAlign: "center" }}>
                          <Link to={finalURL}>
                            <EditIcon className="EditViewIcon" />
                          </Link>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                    </TableBody>
                    </Table>
                    </TableContainer>
                    </Box>
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

export default UserRole;
