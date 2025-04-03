import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
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


const UserCreation = () => {
  // Ensure default value to avoid undefined errors
  const [UserCreationData, setUserCreationData] = useState({
    userCreationLists: [],
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
      .get(`${apiUrl}/api/UserCreationData?sfile_id=1`)
      .then((response) => {
        if (response.status === 200) {
          console.log("User Creation Lists>>>", response.data);
          setUserCreationData(response.data || { userCreationLists: [] });
          setTotalItems((response.data?.userCreationLists || []).length);
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
    (UserCreationData?.userCreationLists?.length || 0) / itemsPerPage
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    UserCreationData?.userCreationLists?.slice(
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
      {UserCreationData?.userCreationLists?.length > 0 ? (
        <Box
          sx={{
            backgroundColor: "#FFF",
            margin: "10px",
            //  padding:'5px',
            borderRadius: "5px",
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
            <h2 style={{ margin: "15px 0" }}>User List</h2>
            {/* <button className="download-table-xls-button">Add +</button> */}
          </div>
          <Box p={1}>
          <TableContainer sx={{ maxHeight: 590 }}>
                <Table
                  sx={{ minWidth: 700 }}
                  stickyHeader
                  // size="small" 
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                    <StyledTableCell>Login Name</StyledTableCell>
                    <StyledTableCell>Login Id</StyledTableCell>
                    <StyledTableCell>Role Name</StyledTableCell>
                    <StyledTableCell>Role Type</StyledTableCell>
                    <StyledTableCell>Email Id</StyledTableCell>
                    <StyledTableCell>District Code</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {currentItems.map((element, index) => {
                    const LoginId = element.Id;
                    //    const sfile_id = "1";
                    //    const str_action = "s";
                    const secretKey = "9096609945";

                    // Convert data into a JSON string
                    const dataToEncrypt = JSON.stringify({ LoginId });

                    // Encrypt the JSON string
                    const encryptedData = CryptoJS.AES.encrypt(
                      dataToEncrypt,
                      secretKey
                    ).toString();

                    // Encode to make it URL-safe
                    const encodedData = encodeURIComponent(encryptedData);

                    // Construct the final URL
                    const finalURL = `/UserCreationEdit?data=${encodedData}&mode=edit`;
                    return (
                      <StyledTableRow key={index}>
                      <StyledTableCell>{element.LOGIN_NAME}</StyledTableCell>
                      <StyledTableCell>{element.LOGIN_ID}</StyledTableCell>
                      <StyledTableCell>{element.APPLICANT_NAME}</StyledTableCell>
                      <StyledTableCell>{element.APPLICANT_TYPE}</StyledTableCell>
                      <StyledTableCell>{element.EMAIL_ID}</StyledTableCell>
                      <StyledTableCell>{element.DIST_CODE}</StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        <Link to={finalURL}>
                          <EditIcon className="EditViewIcon" />
                        </Link>
                      </StyledTableCell>
                      {/* <td style={{textAlign:'center'}}><Link to={`/clusterSummaryAddEdit/${element.clusterSummeryID}/1/view`}><VisibilityIcon className='EditViewIcon'/></Link></td> */}

                      {/* <td style={{textAlign:'center'}}><Link to={finalURL}><VisibilityIcon className='EditViewIcon'/></Link></td> */}
                    </StyledTableRow>
                    );
                  })}
                    </TableBody>
                    </Table>
                    </TableContainer>
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

export default UserCreation;
