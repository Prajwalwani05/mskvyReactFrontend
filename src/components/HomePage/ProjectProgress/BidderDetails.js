// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Divider,
//   styled,
//   Table,
//   TableBody,
//   TableCell,
//   tableCellClasses,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// // import ViewCompactRoundedIcon from '@mui/icons-material/ViewCompactRounded';
// import Loader from "../../Common/Loader/loader";
// import { useLocation, useNavigate } from "react-router-dom";
// import CryptoJS from "crypto-js";
// import SelectActionCard from "./Cards";
// import Add from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#F9F9FA",
//     color: "#6c757d",
//     fontWeight: "600 !important",
//     fontSize: 13,
//     borderBottom: "1px solid #ced4da",
//     borderTop: "1px solid #ced4da",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 13,
//     // border: "1px solid #000",
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   backgroundColor: theme.palette.action.white,
// }));

// const BidderDetails = () => {
//   // const { ppaNo, infoType } = useParams(); // Get clicked status (Completed, In Progress, etc.)
//   const [BidderDetails, setBidderDetails] = useState([]);
//   const apiUrl = process.env.REACT_APP_API_URL;
//   const encryptedQueryString = window.location.search;
//   const secretKey = "9096609945";
//   const location = useLocation();
//   const encryptedData = encryptedQueryString.substring(6);
//   const decodedData = decodeURIComponent(encryptedData);
//   const [loading, setLoading] = useState(false);
//   const [expandedRows, setExpandedRows] = useState(nul);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async (selectedSpvName = null) => {
//     setLoading(true);
//     try {
//       const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
//       const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
//       if (!decryptedData) throw new Error("Decryption failed");

//       const decryptedObject = JSON.parse(decryptedData);
//       const response = await axios.get(`${apiUrl}/api/GetBidderDetails`, {
//         params: {
//           strBidder: decryptedObject.strBidder,
//           infoType: decryptedObject.infoType,
//         },
//       });

//       if (response.status === 200) {
//         setBidderDetails(response.data);
//         console.log("GetBidderDetails: ", response.data);
//       } else {
//         throw new Error("API request failed");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleRow = (index) => {
//     setExpandedRows(expandedRows === index ? null : index);
//   };
//   const calculateProgressStats = (key) => {
//     const filteredSubstations =
//       BidderDetails?.Model?._progressStatusCount?.filter(
//         (progress) =>
//           progress[key] === "Yes" &&
//           BidderDetails?.Model?._BidderDetails?.some(
//             (bidder) =>
//               bidder.DistrictName === progress.District &&
//               bidder.NameOfSelectedBidderCompany === progress.Bidder_Name
//           )
//       ) || [];

//     return {
//       totalSubstations: filteredSubstations.reduce(
//         (sum, ele) => sum + ele.SsNo,
//         0
//       ),
//       totalCapacity: filteredSubstations.reduce(
//         (sum, ele) => sum + ele.Solar_Capacity,
//         0
//       ),
//       totalApplications: filteredSubstations.reduce(
//         (sum, ele) => sum + ele.Application_No,
//         0
//       ),
//       totalJMLand: filteredSubstations.reduce(
//         (sum, ele) => sum + ele.JM_Area_Acres,
//         0
//       ),
//     };
//   };

//   const landPossessionStats = calculateProgressStats(
//     "PR_Land_Possession_Status"
//   );
//   const treeCuttingStats = calculateProgressStats(
//     "Received_Tree_cutting_Permission"
//   );
//   const wayIssueStats = calculateProgressStats("Right_of_Way_Issues");
//   const UnwarrantedStats = calculateProgressStats(
//     "Unwarranted Stoppages if any?"
//   );
//   const levellingStats = calculateProgressStats("Land Levelling");
//   const fencingStats = calculateProgressStats("Land Fencing");
//   const pillingStats = calculateProgressStats("Pilling Work");
//   const modulesStats = calculateProgressStats("Solar Modules");
//   const invertersStats = calculateProgressStats("Solar Inverters");
//   const dutyStats = calculateProgressStats("Inverter Duty Transformer");
//   const balanceStats = calculateProgressStats("Balance of Supply");
//   const installationStats = calculateProgressStats("Module Installation");
//   const inverterInstallationStats = calculateProgressStats("Inverter Installation");
//   const dutyTransformerStats = calculateProgressStats("Inverter Duty Transformer Installation");
//   const supplyStats = calculateProgressStats("Balance of Supply Installation");
//   const distributionStats = calculateProgressStats("Distribution Line");
//   const bayStats = calculateProgressStats("Bay");
//   const materStats = calculateProgressStats("Meter");
//   const remoteStats = calculateProgressStats("Remote Monitoring System");

//   const progressStats = [
//     { label: "Land Possession", data: landPossessionStats },
//     { label: "Received Tree Cutting Permission", data: treeCuttingStats },
//     { label: "Right of Way Issues if any?", data: wayIssueStats },
//     { label: "Unwarranted Stoppages if any?", data: UnwarrantedStats },
//     { label: "Land Levelling", data: levellingStats },
//     { label: "Land Fencing", data: fencingStats },
//     { label: "Pilling Work", data: pillingStats },
//     { label: "Solar Modules", data: modulesStats },
//     { label: "Solar Inverters", data: invertersStats },
//     { label: "Inverter Duty Transformer", data: dutyStats },
//     { label: "Balance of Supply", data: balanceStats },
//     { label: "Module Installation", data: installationStats },
//     { label: "Inverter Installation", data: inverterInstallationStats },
//     { label: "Inverter Duty Transformer Installation", data: dutyTransformerStats },
//     { label: "Balance of Supply Installation", data: supplyStats },
//     { label: "Distribution Line", data: distributionStats },
//     { label: "Bay", data: bayStats },
//     { label: "Meter", data: materStats },
//     { label: "Remote Monitoring System", data: remoteStats }
//   ];

//   return (
//     <>
//       {BidderDetails?.Model?._BidderDetails?.length > 0 ? (
//         <Box
//           sx={{
//             backgroundColor: "#FFF",
//             margin: "10px",
//             //  padding:'5px',
//             borderRadius: "5px",
//             boxShadow:
//               "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
//             // boxShadow:
//             //   "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
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
//             <h2 style={{ margin: "15px 0" }}>{"SPVName"}</h2>
//             {/* <button className="download-table-xls-button">Add +</button> */}
//           </div>
//           {/* <Box>
//             <MultiplePieCharts graphs={SystemStrengtheningData.Graphs} />
//           </Box> */}
//           <Box p={1} pt={2}>
//             <Box pb={2}>
//               <SelectActionCard data={BidderDetails?.Model?._BidderDetails} />
//             </Box>
//             <Box sx={{ width: "100%" }}>
//               <TableContainer>
//                 <Table
//                   sx={{ minWidth: 650 }}
//                   stickyHeader
//                   size="small"
//                   aria-label="sticky table"
//                 >
//                   <TableHead>
//                     <StyledTableCell>Sr. No.</StyledTableCell>
//                     <StyledTableCell>District</StyledTableCell>
//                     <StyledTableCell>No. of Substations</StyledTableCell>
//                     <StyledTableCell>Solar Capacity(MW)</StyledTableCell>
//                     <StyledTableCell>No. of Land Parcels</StyledTableCell>
//                     <StyledTableCell>JM Area(Acres)</StyledTableCell>
//                   </TableHead>
//                   <TableBody>
//                     {BidderDetails?.Model?._BidderDetails.map((ele, index) => {
//                       return (
//                         <>
//                           <StyledTableRow style={{backgroundColor: expandedRows[index]? '#003049' : '', color: expandedRows[index]? '#FFF' : '' }}>
//                             <StyledTableCell style={{color: expandedRows[index]? '#FFF' : '' }}>{index + 1}</StyledTableCell>
//                             <StyledTableCell
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "10px",
//                                 color: expandedRows[index]? '#FFF' : ''
//                               }}
//                               onClick={() => handleToggleRow(index)}
//                             >
//                               {expandedRows[index] ? (
//                                 <RemoveIcon
//                                   style={{ padding: "2px" }}
//                                   className="EditViewIcon"
//                                 />
//                               ) : (
//                                 <Add
//                                   style={{ padding: "2px" }}
//                                   className="EditViewIcon"
//                                 />
//                               )}
//                               {ele.DistrictName}
//                             </StyledTableCell>
//                             <StyledTableCell style={{color: expandedRows[index]? '#FFF' : '' }}>{ele.SsNo}</StyledTableCell>
//                             <StyledTableCell style={{color: expandedRows[index]? '#FFF' : '' }}>
//                               {ele.AggregateCapacityMW}
//                             </StyledTableCell>
//                             <StyledTableCell style={{color: expandedRows[index]? '#FFF' : '' }}>
//                               {ele.NoOfGovtLand}
//                             </StyledTableCell>
//                             <StyledTableCell style={{color: expandedRows[index]? '#FFF' : '' }}>{ele.JMArea}</StyledTableCell>
//                           </StyledTableRow>

//                           {expandedRows[index] && (
//                             <StyledTableRow>
//                               <StyledTableCell colSpan={6}>
//                                 <TableContainer sx={{ maxHeight: 400, border:'1px solid #c5c5c5' }}>
//                                   <Table size="small"
//                                   sx={{ minWidth: 650 }}
//                                   stickyHeader
//                                   aria-label="sticky table"
//                                   >
//                                     <TableHead>
//                                       <StyledTableCell>
//                                         Category
//                                       </StyledTableCell>
//                                       <StyledTableCell>
//                                         No. of Substations
//                                       </StyledTableCell>
//                                       <StyledTableCell>
//                                         Capacity(MW)
//                                       </StyledTableCell>
//                                       <StyledTableCell>
//                                         No. of Land Parcels
//                                       </StyledTableCell>
//                                       <StyledTableCell>
//                                         JM Area(Acres)
//                                       </StyledTableCell>
//                                     </TableHead>
//                                     <TableBody>
//                                       {progressStats.map((item, index) => (
//                                         <StyledTableRow key={index}>
//                                           <StyledTableCell>
//                                             {item.label}
//                                           </StyledTableCell>
//                                           <StyledTableCell>
//                                             {item.data.totalSubstations}
//                                           </StyledTableCell>
//                                           <StyledTableCell>
//                                             {item.data.totalCapacity}
//                                           </StyledTableCell>
//                                           <StyledTableCell>
//                                             {item.data.totalApplications}
//                                           </StyledTableCell>
//                                           <StyledTableCell>
//                                             {item.data.totalJMLand}
//                                           </StyledTableCell>
//                                         </StyledTableRow>
//                                       ))}
//                                     </TableBody>
//                                   </Table>
//                                 </TableContainer>
//                               </StyledTableCell>
//                             </StyledTableRow>
//                           )}
//                         </>
//                       );
//                     })}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           </Box>
//         </Box>
//       ) : (
//         <Loader />
//       )}
//     </>
//   );
// };

// export default BidderDetails;

import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Collapse,
  tableCellClasses,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Loader from "../../Common/Loader/loader";
import axios from "axios";
import CryptoJS from "crypto-js";
import SelectActionCard from "./Cards";
import { Link, useNavigate } from "react-router-dom";

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

const BidderDetails = () => {
  const [BidderDetails, setBidderDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bidderName , setBidderName] = useState(null);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const encryptedQueryString = window.location.search;
  const secretKey = "9096609945";
  const encryptedData = encryptedQueryString.substring(6);
  const decodedData = decodeURIComponent(encryptedData);
  const navigate = useNavigate()
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedData) throw new Error("Decryption failed");

      const decryptedObject = JSON.parse(decryptedData);
      setBidderName(decryptedObject.bidderName)
      const response = await axios.get(`${apiUrl}/api/GetBidderDetails`, {
        params: {
          strBidder: decryptedObject.strBidder,
          infoType: decryptedObject.infoType,
        },
      });

      if (response.status === 200) {
        setBidderDetails(response.data);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRow = (index) => {
    setExpandedRowIndex(expandedRowIndex === index ? null : index);
  };

  const calculateProgressStats = (key) => {
    const filteredSubstations =
      BidderDetails?.Model?._progressStatusCount?.filter(
        (progress) =>
          progress[key] === "Yes" &&
          BidderDetails?.Model?._BidderDetails?.some(
            (bidder) =>
              bidder.DistrictName === progress.District &&
              bidder.NameOfSelectedBidderCompany === progress.Bidder_Name
          )
      ) || [];

    return {
      totalSubstations: filteredSubstations.reduce(
        (sum, ele) => sum + ele.SsNo,
        0
      ),
      totalCapacity: filteredSubstations.reduce(
        (sum, ele) => sum + ele.Solar_Capacity,
        0
      ),
      totalApplications: filteredSubstations.reduce(
        (sum, ele) => sum + ele.Application_No,
        0
      ),
      totalJMLand: filteredSubstations.reduce(
        (sum, ele) => sum + ele.JM_Area_Acres,
        0
      ),
    };
  };
  const landPossessionStats = calculateProgressStats(
    "PR_Land_Possession_Status"
  );
  const treeCuttingStats = calculateProgressStats(
    "Received_Tree_cutting_Permission"
  );
  const wayIssueStats = calculateProgressStats("Right_of_Way_Issues");
  const UnwarrantedStats = calculateProgressStats(
    "Unwarranted Stoppages if any?"
  );
  const levellingStats = calculateProgressStats("Land Levelling");
  const fencingStats = calculateProgressStats("Land Fencing");
  const pillingStats = calculateProgressStats("Pilling Work");
  const modulesStats = calculateProgressStats("Solar Modules");
  const invertersStats = calculateProgressStats("Solar Inverters");
  const dutyStats = calculateProgressStats("Inverter Duty Transformer");
  const balanceStats = calculateProgressStats("Balance of Supply");
  const installationStats = calculateProgressStats("Module Installation");
  const inverterInstallationStats = calculateProgressStats(
    "Inverter Installation"
  );
  const dutyTransformerStats = calculateProgressStats(
    "Inverter Duty Transformer Installation"
  );
  const supplyStats = calculateProgressStats("Balance of Supply Installation");
  const distributionStats = calculateProgressStats("Distribution Line");
  const bayStats = calculateProgressStats("Bay");
  const materStats = calculateProgressStats("Meter");
  const remoteStats = calculateProgressStats("Remote Monitoring System");

  const progressStats = [
    { label: "Land Possession", data: landPossessionStats },
    { label: "Received Tree Cutting Permission", data: treeCuttingStats },
    { label: "Right of Way Issues if any?", data: wayIssueStats },
    { label: "Unwarranted Stoppages if any?", data: UnwarrantedStats },
    { label: "Land Levelling", data: levellingStats },
    { label: "Land Fencing", data: fencingStats },
    { label: "Pilling Work", data: pillingStats },
    { label: "Solar Modules", data: modulesStats },
    { label: "Solar Inverters", data: invertersStats },
    { label: "Inverter Duty Transformer", data: dutyStats },
    { label: "Balance of Supply", data: balanceStats },
    { label: "Module Installation", data: installationStats },
    { label: "Inverter Installation", data: inverterInstallationStats },
    {
      label: "Inverter Duty Transformer Installation",
      data: dutyTransformerStats,
    },
    { label: "Balance of Supply Installation", data: supplyStats },
    { label: "Distribution Line", data: distributionStats },
    { label: "Bay", data: bayStats },
    { label: "Meter", data: materStats },
    { label: "Remote Monitoring System", data: remoteStats },
  ];

  return (
    <>
      {BidderDetails?.Model?._BidderDetails?.length > 0 ? (
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
            <h2 style={{ margin: "15px 0" }}>{bidderName}</h2>
            {/* <button className="download-table-xls-button">Add +</button> */}
          </div>
          <Box p={1} pt={2}>
            <Box pb={2}>
              <SelectActionCard model={BidderDetails} data={BidderDetails?.Model?._BidderDetails} />
            </Box>
            <Box sx={{ width: "100%" }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 650 }}
                  stickyHeader
                  size="small"
                  aria-label="sticky table"
                >
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>District</StyledTableCell>
                      <StyledTableCell>No. of Substations</StyledTableCell>
                      <StyledTableCell>Solar Capacity (MW)</StyledTableCell>
                      <StyledTableCell>No. of Land Parcels</StyledTableCell>
                      <StyledTableCell>JM Area (Acres)</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {BidderDetails?.Model?._BidderDetails.map((ele, index) => {
                       const strBidder = ele.PPA_Reference_No;
                       const infoType = ele.infoType;
                       const districtName = ele.DistrictName.toUpperCase();
                       const isBidder = 'N';
                       const secretKey = "9096609945";
                       
                       // Convert data into a JSON string
                       const dataToEncrypt = JSON.stringify({
                         strBidder,
                         infoType,
                         districtName,
                         isBidder
                       });

                       // Encrypt the JSON string
                       const encryptedData = CryptoJS.AES.encrypt(
                         dataToEncrypt,
                         secretKey
                       ).toString();

                       // Encode to make it URL-safe
                       const encodedData = encodeURIComponent(encryptedData);

                       // Construct the final URL
                       const finalURL = `/bidderWiseDetails?data=${encodedData}`;
                      return(
                      <React.Fragment key={index}>
                        <StyledTableRow
                          style={{
                            backgroundColor: expandedRowIndex === index ? "#e9ecef" : "",
                          }}
                        >
                          <StyledTableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleToggleRow(index)}
                            >
                              {expandedRowIndex === index ? (
                                <RemoveIcon style={{ padding: "2px" }} className="EditViewIcon" />
                              ) : (
                                <AddIcon style={{ padding: "2px" }} className="EditViewIcon" />
                              )}
                            </IconButton>
                          </StyledTableCell>
                          <StyledTableCell>
                              {ele.DistrictName}
                          </StyledTableCell>
                          <StyledTableCell
                          sx={{
                            // minWidth: "220px",
                            color: "blue",
                            cursor: "pointer",
                          }}>
                            <Link to={finalURL}>
                              {ele.SsNo}
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell>
                            {ele.AggregateCapacityMW}
                          </StyledTableCell>
                          <StyledTableCell>{ele.NoOfGovtLand}</StyledTableCell>
                          <StyledTableCell>{ele.JMArea}</StyledTableCell>
                        </StyledTableRow>

                        {/* Expanded Row */}
                        <StyledTableRow>
                          <TableCell
                            colSpan={6}
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                          >
                            <Collapse
                              in={expandedRowIndex === index}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ padding: 2 }}>
                                <TableContainer
                                  sx={{
                                    maxHeight: 400,
                                    border: "1px solid #c5c5c5",
                                  }}
                                >
                                  <Table
                                    size="small"
                                    sx={{ minWidth: 650 }}
                                    stickyHeader
                                    aria-label="sticky table"
                                  >
                                    <TableHead>
                                      <StyledTableRow>
                                        <StyledTableCell>
                                          Category
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          No. of Substations
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          Capacity (MW)
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          No. of Land Parcels
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          JM Area (Acres)
                                        </StyledTableCell>
                                      </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                      {progressStats.map((item, idx) => (
                                        <StyledTableRow key={idx}>
                                          <StyledTableCell>
                                            {item.label}
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            {item.data.totalSubstations}
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            {item.data.totalCapacity}
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            {item.data.totalApplications}
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            {item.data.totalJMLand}
                                          </StyledTableCell>
                                        </StyledTableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </StyledTableRow>
                      </React.Fragment>

                      )
                    }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box
              mt={1}
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

export default BidderDetails;
