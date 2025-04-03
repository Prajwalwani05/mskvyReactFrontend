import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import {
  Box,
  Button,
  Divider,
  Menu,
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
import PieChartWithPaddingAngle from "./Charts";
import SelectActionCard from "./StageWiseCard";

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

const SummaryStageWise = () => {
  const [summaryStageWise, setSummaryStageWise] = useState({
    ClearanceSummaries: [],
  });
  const [approach, setApproach] = useState("Cluster");
  const [currentSpvName, setCurrentSpvName] = useState("");
  const [currentSubstationCode, setCurrentSubstationCode] = useState("");
  const [ppaId, setPpaId] = useState("");
  const [substationName, setSubstationName] = useState("");
  const [projectCapacity, setProjectCapacity] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const encryptedQueryString = window.location.search;
  const secretKey = "9096609945";
  const encryptedData = encryptedQueryString.substring(6);
  const decodedData = decodeURIComponent(encryptedData);
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedData) throw new Error("Decryption failed");

        const decryptedObject = JSON.parse(decryptedData);
        setCurrentSpvName(decryptedObject.spvName)
        setCurrentSubstationCode(decryptedObject.SUBSTATION_CODE)
        setSubstationName(decryptedObject.SUBSTATION_NAME)
        setProjectCapacity(decryptedObject.PROJECT_CAPACITY_MW)
        setPpaId(decryptedObject.PPA_ID)
        console.log(decryptedData);
        const response = await axios.get(
          `${apiUrl}/api/SWPClearanceSummaryStageWise`,
          {
            params: {
              substationCode: decryptedObject.substationCode,
              ProjectCapacity: decryptedObject.ProjectCapacity,
              sfile_id: decryptedObject.sfile_id,
              headerName: decryptedObject.headerName,
              projectCode: decryptedObject.projectCode,
              approachType: decryptedObject.approachType
            },
          }
        );

        if (response.status === 200) {
          setLoading(false);
          setSummaryStageWise(response.data);
        } else {
          setLoading(false);
          throw new Error("API request failed");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, decodedData]);

  return (
    <>
      {
        summaryStageWise?.ClearanceSummaries?.length > 0 ? (
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
              Substation specific Clearance Status -
              </h2>
                <Typography style={{ marginLeft: "5px" }}>[ {currentSpvName} ]</Typography>
              {/* <button className="download-table-xls-button">Add +</button> */}
            </div>
           
            <Box p={1} py={2}>
              <Box pb={2}>
                <SelectActionCard projectId = {summaryStageWise?.ClearanceSummaries[0]?.PROJECT_CODE} currentSubstationCode = {currentSubstationCode} subProjectId = {ppaId} substationName={substationName} ppaRefNo = {summaryStageWise?.ClearanceSummaries[0]?.PPA_Reference_No} ssCapacity = {projectCapacity}/>
              </Box>
              <Box sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 580 }}>
                  <Table
                    sx={{ minWidth: 700 }}
                    stickyHeader
                    // size="small"
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Activity</StyledTableCell>
                        <StyledTableCell>Actual Start Data</StyledTableCell>
                        <StyledTableCell>
                          Scheduled End Date
                        </StyledTableCell>
                        <StyledTableCell>Actual End Date</StyledTableCell>
                        <StyledTableCell>Current Status</StyledTableCell>
                        <StyledTableCell style={{ width: "100px" }}>
                          Stag Status
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {summaryStageWise?.ClearanceSummaries.map(
                        (element, index) => {
                          const substationCode = element.SUBSTATION_CODE;
                          const ProjectCapacity = element.PROJECT_CAPACITY_MW;
                          const sfile_id = "1";
                          const headerName = currentSpvName;
                          const projectCode = element.LOCATION_ID;
                          const approachType = approach;
                          const secretKey = "9096609945";
  
                          // Convert data into a JSON string
                          const dataToEncrypt = JSON.stringify({
                            substationCode,
                            ProjectCapacity,
                            sfile_id,
                            headerName,
                            projectCode,
                            approachType
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
  
                          // console.log("Final Encrypted URL:", finalURL);
  
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                {element.Activity_Name}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.APPLICATION_DT}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.SCHEDULE_APPROVAL_DT}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.APPLN_APPROVED_DT}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.CURRENCT_STATUS}
                              </StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  textAlign: "center",
                                  padding: "0",
                                }}
                              >
                                <Box
                                  sx={{
                                    borderRadius: "20px",
                                    backgroundColor:
                                    element.CURRENCT_STATUS !== "" ?
                                         "#d8f3dc" : "#ffccd5",
  
                                    color: element.CURRENCT_STATUS !== "" ? "#007f5f"   : "#6a040f",
                                    padding: "5px 10px",
                                    fontSize: "12px",
                                    width: "fit-content",
                                    fontWeight: "bolder !important",
                                  }}
                                >
                                  {
                                    element.CURRENCT_STATUS !== "" ? 'Completed' : 'Yet To Start'
                                  }
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
                  onClick={()=> navigate(-1)}
                >
                  Back
                </Button>
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
        )
        :
        <Loader />
        }
    </>
  );
};

export default SummaryStageWise;
