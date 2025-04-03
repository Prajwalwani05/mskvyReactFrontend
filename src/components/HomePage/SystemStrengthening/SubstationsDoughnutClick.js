import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import EditIcon from "@mui/icons-material/Edit";
import ViewCompactRoundedIcon from "@mui/icons-material/ViewCompactRounded";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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

const SubstationsDoughnutClick = () => {
  // Ensure default value to avoid undefined errors
  const [substationData, setSubstationData] = useState({
    Model: [],
  });
  const { status } = useParams(); // Get clicked status (Completed, In Progress, etc.)
  const location = useLocation();
  const { doughnutData } = location.state || {};
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!doughnutData) {
        console.error("doughnutdata is undefined.");
        return;
      }
      console.log(doughnutData)
      fetchData();
  }, [doughnutData]);
  
  const fetchData = async (selectedSpvName = null) => {
    if (!status) {
      console.error("API request skipped due to missing type or status.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/SubstationsDoughnutClick`,
        {
          params: {
            summaryId: doughnutData?.ssummaryId,
            ReferenceNo: doughnutData?.rreferenceNo,
            approachType: doughnutData?.aapproachType,
            Issplit: doughnutData?.iissplit,
            status: status,
            sfile_id: 1,
          },
        }
      );

      if (response.status === 200) {
        setSubstationData(response.data);
        console.log(
          "SubstationsDoughnutClick: ",
          response.data
        );
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
      {loading ? (
        <Loader />
      ) : substationData?.Model?.systemStrengtheningSubstationsLists
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
            <h2 style={{ margin: "15px 0" }}>System Strengthening Substations Summary -</h2>
            <Typography style={{ marginLeft: "0px" }}>
              {doughnutData?.spvName} -{" "}
            </Typography>
            <Typography style={{ marginLeft: "0px" }}>
              <Box
                sx={{
                  borderRadius: "20px",
                  backgroundColor:
                    status === "Completed"
                      ? "#34d39933"
                      : status === "In Progress"
                      ? "#fbbf2433"
                      : status === "Yet To Start"
                      ? "#fb718533"
                      : "#dee2e6",

                  color:
                    status === "Completed"
                      ? "#10b981"
                      : status === "In Progress"
                      ? "#f59e0b"
                      : status === "Yet To Start"
                      ? "#f43f5e"
                      : "#495057",
                  padding: "5px 10px",
                  fontSize: "12px",
                  width: "fit-content",
                  fontWeight: "bolder !important",
                }}
              >
                {status}
              </Box>
            </Typography>
            {/* <button className="download-table-xls-button">Add +</button> */}
          </div>
          <Box p={1} pb={2}>
            <Box sx={{ width: "100%" }}>
              <TableContainer sx={{ maxHeight: 580 }}>
                <Table
                  sx={{ minWidth: 700 }}
                  stickyHeader
                  size="small"
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Substation No.</StyledTableCell>
                      <StyledTableCell>Substation Name</StyledTableCell>
                      <StyledTableCell>Solar Capacity(MW)</StyledTableCell>
                      <StyledTableCell>Completion(%)</StyledTableCell>
                      <StyledTableCell>Created Date</StyledTableCell>
                      <StyledTableCell>Last Updated Date</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>View</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {substationData?.Model?.systemStrengtheningSubstationsLists?.map(
                      (element, index) => {
                        const SS_No = element.SS_NO;
                        const summaryId = doughnutData.ssummaryId;
                        const ReferenceNo = doughnutData.rreferenceNo;
                        const approachType = doughnutData.aapproachType;
                        const Issplit = doughnutData.iissplit;
                        const sstatus = status;
                        const sfile_id = "1";
                        const secretKey = "9096609945";

                        // Convert data into a JSON string
                        const dataToEncrypt = JSON.stringify({
                          SS_No,
                          summaryId,
                          ReferenceNo,
                          approachType,
                          Issplit,
                          sstatus,
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
                        const finalURL = `/SSDoughnutClickDetails?data=${encodedData}`;

                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell>{element.SS_NO}</StyledTableCell>
                            <StyledTableCell>
                              {element.SS_DESC}
                            </StyledTableCell>
                            <StyledTableCell>{element.SOLAR_CAPACITY_MW}</StyledTableCell>
                            <StyledTableCell>
                              {element.Percentage}
                            </StyledTableCell>
                            <StyledTableCell>{element.CreatedDate}</StyledTableCell>
                            <StyledTableCell>{element.LastUpdatedDate}</StyledTableCell>
                            <StyledTableCell
                              sx={{
                                textAlign: "center",
                                padding: "auto",
                                cursor: "pointer",
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
                            <StyledTableCell style={{ textAlign: "center" }}>
                              <Link title="view" to={finalURL}>
                                <ViewCompactRoundedIcon className="EditViewIcon" />
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
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SubstationsDoughnutClick;
