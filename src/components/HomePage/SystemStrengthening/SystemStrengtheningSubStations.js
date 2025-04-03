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

const SystemStrengtheningSubstations = () => {
  // Ensure default value to avoid undefined errors
  const [substationData, setSubstationData] = useState({
    SubstationData: [],
  });
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const inputRef = useRef(null);
  const encryptedQueryString = window.location.search;
  const secretKey = "9096609945";
  const encryptedData = encryptedQueryString.substring(6);
  const decodedData = decodeURIComponent(encryptedData);
  const navigate = useNavigate();
  const [currentSpvName, setCurrentSpvName] = useState("");
  const [spvList, setSpvList] = useState([]);
  const [currentClusterId, setCurrentClusterId] = useState('');
  const [currentClusterNo, setCurrentClusterNo] = useState('');
  const [isSplit, setIssplit] = useState('');
  const [doughnutData, setDoughnutData] = useState({
      ssummaryId: '',
      rreferenceNo: '',
      aapproachType: '',
      iissplit: '',
      spvName: ''
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
      const list = JSON.parse(sessionStorage.getItem('spvList')) || [];
      console.log(list)
      setSpvList(list);
      const selectedSpv = spvList.find(spv => spv.name === updatedSpvName);
      const updatedClusterId = selectedSpv ? selectedSpv.clusterId : decryptedObject.summaryId;
      const updatedClusterNo = selectedSpv ? selectedSpv.clusterNo : decryptedObject.ReferenceNo;
      setCurrentClusterId(updatedClusterId);
      // console.log(updatedProjectCode);
      setIssplit(decryptedObject.Issplit);
      setDoughnutData((prev) => ({
        ...prev,
        ssummaryId: updatedClusterId,
        rreferenceNo: updatedClusterNo,
        aapproachType: decryptedObject.approachType,
        iissplit: decryptedObject.Issplit,
        spvName: updatedSpvName
      }));
      const response = await axios.get(
        `${apiUrl}/api/SystemStrengtheningSubStations`,
        {
          params: {
            summaryId: updatedClusterId,
            ReferenceNo: updatedClusterNo,
            approachType: decryptedObject.approachType,
            Issplit: decryptedObject.Issplit,
            sfile_id: 1,
          },
        }
      );
      if (response.status === 200) {
        setSubstationData(response.data);
        console.log("SystemStrengtheningSubStations: ", response.data);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const chartData =
    substationData?.SS_Count?.map((ele) => ({
      label: ele.legendText || "Unknown", // Provide a fallback label if needed
      value: ele.y || 0, // Ensure there's a numeric value
    })) || [];
  const chartDataCapacity =
    substationData?.SolarCapacity?.map((ele) => ({
      label: ele.legendText || "Unknown", // Provide a fallback label if needed
      value: ele.y || 0, // Ensure there's a numeric value
    })) || [];

  const ITEM_HEIGHT = 80;
  const ITEM_PADDING_TOP = 10;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.8 + ITEM_PADDING_TOP,
        width: 360,
      },
    },
  };
  const handleChange = async (event) => {
    const selectedSpvName = event.target.value;
    const selectedSpv = spvList?.find(spv => spv.name === selectedSpvName);
  
    setCurrentSpvName(selectedSpvName);
    setCurrentClusterId(selectedSpv ? selectedSpv.clusterId : "");
    setCurrentClusterNo(selectedSpv ? selectedSpv.clusterNo : "");
  
    await fetchData(selectedSpvName);
  };
  

  return (
    <>
     {
          loading ? (
            <Loader />
          )
          :
      (substationData?.SubstationData?.systemStrengtheningSubstationsLists
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
              System Strengthening Substations Summary -{" "}
            </h2>
              <Typography style={{ marginLeft: "5px" }}>{currentSpvName}</Typography>
            {/* <button className="download-table-xls-button">Add +</button> */}
          </div>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <PieChartWithPaddingAngle
              chartData={chartData}
              chartName={"S/S Count"}
              doughnutData = {doughnutData}
            />
            <PieChartWithPaddingAngle
              chartData={chartDataCapacity}
              chartName={"S/S Solar Capacity"}
              doughnutData = {doughnutData}
            />
          </Box>
          <Box p={1} pb={2}>
            <Box py={2}>
              <Typography  variant="body2" mb={0.5}>
                Select SPV Name
              </Typography>
              <Select
                size="small"
                name="spvName"
                value={currentSpvName || ""}
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                {spvList?.map((element) => (
                  <MenuItem value={element.name}>{element.name}</MenuItem>
                ))}
                {/* <MenuItem value="Cancelled">Cancelled</MenuItem> */}
              </Select>
            </Box>
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
                    {substationData?.SubstationData?.systemStrengtheningSubstationsLists?.map(
                      (element, index) => {
                        const SS_No = element.SS_NO;
                        const sfile_id = "1";
                        const approachType = "Cluster";
                        const Issplit = isSplit;
                        const SS_Desc = element.SS_DESC;
                        const SolarCapacity = element.SOLAR_CAPACITY_MW;
                        const nameOfBidder = element.Name_Of_Selected_Bidder;
                        const Percentage = element.Percentage;
                        const spvName = element.SPVName;
                        const secretKey = "9096609945";

                        // Convert data into a JSON string
                        const dataToEncrypt = JSON.stringify({
                          SS_No,
                          sfile_id,
                          approachType,
                          Issplit,
                          SS_Desc,
                          SolarCapacity,
                          nameOfBidder,
                          Percentage,
                          spvName,
                        });

                        // Encrypt the JSON string
                        const encryptedData = CryptoJS.AES.encrypt(
                          dataToEncrypt,
                          secretKey
                        ).toString();

                        // Encode to make it URL-safe
                        const encodedData = encodeURIComponent(encryptedData);

                        // Construct the final URL
                        const finalURL = `/SystemStrengtheningSSNoDetails?data=${encodedData}`;

                        // console.log("Final Encrypted URL:", finalURL);

                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell>{element.SS_NO}</StyledTableCell>
                            <StyledTableCell>{element.SS_DESC}</StyledTableCell>
                            <StyledTableCell>
                              {element.SOLAR_CAPACITY_MW}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.Percentage}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.CreatedDate}
                            </StyledTableCell>
                            <StyledTableCell>
                              {element.LastUpdatedDate}
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

export default SystemStrengtheningSubstations;
