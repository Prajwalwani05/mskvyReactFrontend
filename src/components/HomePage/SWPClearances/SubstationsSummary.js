import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import EditIcon from "@mui/icons-material/Edit";
import ViewCompactRoundedIcon from '@mui/icons-material/ViewCompactRounded';
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

const SunstationsSummary = () => {
  const [substationsSWPClearances, setSubstationsSWPClearances] = useState({
    ClearanceSummaries: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [approach, setApproach] = useState("Cluster");
  const [currentSpvName, setCurrentSpvName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentProjectCode, setcurrentProjectCode] = useState("");
  const [spvList, setSpvList] = useState([]);
  const [itemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;
  const inputRef = useRef(null);
  const encryptedQueryString = window.location.search;
  const secretKey = "9096609945";
  const encryptedData = encryptedQueryString.substring(6);
  const decodedData = decodeURIComponent(encryptedData);
  const navigate = useNavigate();

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
        setApproach(decryptedObject.approachType);
        const updatedSpvName = selectedSpvName || decryptedObject.spvName;
        setCurrentSpvName(updatedSpvName);

    // Set SPV list
        setSpvList(decryptedObject.spvList);
        const selectedSpv = decryptedObject.spvList.find(spv => spv.name === updatedSpvName);
        const updatedProjectCode = selectedSpv ? selectedSpv.projectCode : decryptedObject.projectCode;
        setcurrentProjectCode(updatedProjectCode);

        console.log(updatedProjectCode);
        const response = await axios.get(
          `${apiUrl}/api/SWPSubStationsClearanceSummaryData`,
          {
            params: {
              projectCode: updatedProjectCode,
              sfile_id: 1,
              approachType: decryptedObject.approachType,
            },
          }
        );

        if (response.status === 200) {
          setSubstationsSWPClearances(response.data);
          console.log("Substations SWP Clearances: ", response.data);
        } else {
          throw new Error("API request failed");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
      finally{
        setLoading(false);
      }
    };
  
  const highestStatus =
    Array.isArray(substationsSWPClearances?.SummarySubstations) &&
    substationsSWPClearances?.SummarySubstations.length > 0
      ? substationsSWPClearances?.SummarySubstations.reduce(
          (max, item) => (item.y > max.y ? item : max),
          substationsSWPClearances?.SummarySubstations[0]
        )
      : { label: "No Data", color: "#ccc" }; // Default fallback
  const statusTitle = highestStatus.label;

  const chartData =
    substationsSWPClearances?.SummarySubstations?.map((ele) => ({
      label: ele.legendText || "Unknown", // Provide a fallback label if needed
      value: ele.y || 0, // Ensure there's a numeric value
    })) || [];

  const chartDataCapacity =
    substationsSWPClearances?.SummaryCapacity?.map((ele) => ({
      label: ele.legendText || "Unknown", // Provide a fallback label if needed
      value: ele.y || 0, // Ensure there's a numeric value
    })) || [];

    const ITEM_HEIGHT = 80;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          // width: 250,
        },
      },
    };
    const handleChange = (event) => {
      const selectedSpvName = event.target.value;
      
      // Find the corresponding projectCode from spvList
      const selectedSpv = spvList.find(spv => spv.name === selectedSpvName);
      
      setCurrentSpvName(selectedSpvName);
      setcurrentProjectCode(selectedSpv ? selectedSpv.projectCode : ""); // Set projectCode if found
      fetchData(selectedSpvName)
    };
  return (
    <>
      {
      loading ? (
        <Loader />
      )
      :
      (
        substationsSWPClearances?.ClearanceSummaries?.length > 0 ? (
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
                SWP Substations Clearance Summary -
              </h2>
                <Typography style={{ marginLeft: "5px" }}>[ {currentSpvName} ]</Typography>
              {/* <button className="download-table-xls-button">Add +</button> */}
            </div>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <PieChartWithPaddingAngle
                chartData={chartData}
                chartName={"Substation Status"}
              />
              <PieChartWithPaddingAngle
                chartData={chartDataCapacity}
                chartName={"Solar Capacity"}
              />
            </Box>
            <Box p={1} py={2}>
              <Box py={2}>
              <Typography variant="body2" mb={0.5}>Select SPV Name</Typography>
              <Select size="small" name="spvName"
              value={currentSpvName || ""}
              onChange={handleChange}
              MenuProps={MenuProps}
              >
                {
                  spvList?.map((element)=>(
                    <MenuItem value={element.name}>{element.name}</MenuItem>
                  ))
                }
                {/* <MenuItem value="Cancelled">Cancelled</MenuItem> */}
              </Select>
              </Box>
              <Box sx={{ width: "100%", overflow: "hidden" }}>
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
                        <StyledTableCell>
                          Project Id - SubProject Id
                        </StyledTableCell>
                        <StyledTableCell>Solar Capacity (MW)</StyledTableCell>
                        <StyledTableCell>Current Status</StyledTableCell>
                        <StyledTableCell style={{ width: "100px" }}>
                          Status
                        </StyledTableCell>
                        <StyledTableCell>View</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {substationsSWPClearances?.ClearanceSummaries.map(
                        (element, index) => {
                          const substationCode = element.SUBSTATION_CODE;
                          const ProjectCapacity = element.PROJECT_CAPACITY_MW;
                          const sfile_id = "1";
                          const headerName = currentSpvName;
                          const projectCode = currentProjectCode  ;
                          const approachType = approach;
                          const spvName = currentSpvName;
                          const SUBSTATION_CODE = element.SUBSTATION_CODE;
                          const PPA_ID= element.PPA_ID;
                          const SUBSTATION_NAME= element.SUBSTATION_NAME;
                          const PROJECT_CAPACITY_MW = element.PROJECT_CAPACITY_MW;
                          const secretKey = "9096609945";
  
                          // Convert data into a JSON string
                          const dataToEncrypt = JSON.stringify({
                            substationCode,
                            ProjectCapacity,
                            sfile_id,
                            headerName,
                            projectCode,
                            approachType,
                            spvName,
                            SUBSTATION_CODE,
                            PPA_ID,
                            SUBSTATION_NAME,
                            PROJECT_CAPACITY_MW
                          });
  
                          // Encrypt the JSON string
                          const encryptedData = CryptoJS.AES.encrypt(
                            dataToEncrypt,
                            secretKey
                          ).toString();
  
                          // Encode to make it URL-safe
                          const encodedData = encodeURIComponent(encryptedData);
  
                          // Construct the final URL
                          const finalURL = `/SWPSummaryStageWise?data=${encodedData}`;
  
                          // console.log("Final Encrypted URL:", finalURL);
  
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                {element.SUBSTATION_CODE}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.SUBSTATION_NAME}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.LOCATION_ID + "-" + element.PPA_ID}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.PROJECT_CAPACITY_MW}
                              </StyledTableCell>
                              <StyledTableCell>
                                {element.CURRENCT_STATUS}
                              </StyledTableCell>
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
                                    statusTitle === "Completed"
                                      ? "#34d39933"
                                      : statusTitle === "In Progress"
                                      ? "#fbbf2433"
                                      :"#fb718533",

                                  color:
                                    statusTitle === "Completed"
                                      ? "#10b981"
                                      : statusTitle === "In Progress"
                                      ? "#f59e0b"
                                      : "#f43f5e",
                                    padding: "5px 10px",
                                    fontSize: "12px",
                                    width: "fit-content",
                                    fontWeight: "bolder !important",
                                  }}
                                >
                                  {statusTitle === "In Progress"
                                  ? "P"
                                  : statusTitle === "Completed"
                                  ? "C"
                                  :  "Y"}
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
                    navigate(
                      `${
                        approach === "Cluster"
                          ? "/SWPClearancesCluster"
                          : "/SWPClearancesOpenTender"
                      }`
                    )
                  }
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
      )
    }
    </>
  );
};

export default SunstationsSummary;
