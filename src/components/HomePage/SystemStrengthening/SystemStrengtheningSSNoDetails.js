import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
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
import PieChartWithPaddingAngle from "./Chart_second";
import SelectActionCard from "./Cards";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F9F9FA",
    color: "#6c757d",
    fontWeight: "600 !important",
    fontSize: 13,
    borderBottom: "1px solid #ced4da",
    borderTop: "1px solid #ced4da",
  },
  // Apply border-radius only to the first and last header cells
  [`&.${tableCellClasses.head}:first-child`]: {
    // borderTopLeftRadius: 8,
  },
  [`&.${tableCellClasses.head}:last-child`]: {
    // borderTopRightRadius: 8,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    // border: "1px solid #000",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.white,
}));

const SystemStrengtheningSSNoDetails = () => {
  // Ensure default value to avoid undefined errors
  const [substationData, setSubstationData] = useState({
    Model: [],
  });
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const encryptedQueryString = window.location.search;
  const secretKey = "9096609945";
  const encryptedData = encryptedQueryString.substring(6);
  const decodedData = decodeURIComponent(encryptedData);
  const navigate = useNavigate();
  const [currentSpvName, setCurrentSpvName] = useState("");
  const [data, setData] = useState({
    SS_No: '',
    SS_Desc: '',
    SolarCapacity: '',
    nameOfBidder: '',
    Percentage: ''
  });
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (selectedSpvName = null) => {
    setLoading(true);
    try {
      const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedData) throw new Error("Decryption failed");

      const decryptedObject = JSON.parse(decryptedData);
      //     setApproach(decryptedObject.approachType);
      const updatedSpvName = selectedSpvName || decryptedObject.spvName;
      setCurrentSpvName(updatedSpvName);
      setData((prev) => ({
        ...prev,
        SS_No: decryptedObject.SS_No,
        SS_Desc: decryptedObject.SS_Desc,
        SolarCapacity: decryptedObject.SolarCapacity,
        nameOfBidder: decryptedObject.nameOfBidder,
        Percentage: decryptedObject.Percentage,
      }));
      const response = await axios.get(
        `${apiUrl}/api/SystemStrengtheningSSNoDetails`,
        {
          params: {
            SS_No: decryptedObject.SS_No,
            approachType: decryptedObject.approachType,
            Issplit: decryptedObject.Issplit,
            sfile_id: 1,
          },
        }
      );

      if (response.status === 200) {
        setSubstationData(response.data);
        console.log("SystemStrengtheningSSNoDetails: ", response.data);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     {
          loading ? (
            <Loader />
          )
          :
      (substationData?.Model?.systemStrengtheningSS_NoDetailLists
        ?.length > 0 ? (
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
            System Strengthening Substations Activity Details
            </h2>
            {/* <button className="download-table-xls-button">Add +</button> */}
          </div>
          <Box p={1} pb={2}>
            <Box pb={2}>
              <SelectActionCard data={data} spvName = {currentSpvName}/>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TableContainer sx={{ maxHeight: 460 }}>
                <Table
                  sx={{ minWidth: 700 }}
                  stickyHeader
                  size="small"
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Sr. No.</StyledTableCell>
                      <StyledTableCell>Activity Name</StyledTableCell>
                      <StyledTableCell>No. of Target Activity</StyledTableCell>
                      <StyledTableCell>No. of Completed Activity</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {substationData?.Model?.systemStrengtheningSS_NoDetailLists?.map(
                      (element, index) => {
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>{element.Activity_Name}</StyledTableCell>
                            <StyledTableCell>
                              {element.NoOfActivity}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.NoOfCompletedActivity}
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
                                  : "Not_Req"
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
                                  : "N"}
                              </Box>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box
                mt={2}
                width="100%"
                display="flex"
                justifyContent="flex-end"
                gap="5px"
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#069465" }}
                  size="medium"
                  type="submit"
                  onClick={() =>
                    navigate(-1)
                  }
                >
                  Back
                </Button>
              </Box>
          </Box>
        </Box>
      ) : (
        <Loader />
      ))
    }
    </>
  );
};

export default SystemStrengtheningSSNoDetails;
