import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Loader from "../../Common/Loader/loader";
import axios from "axios";
import CryptoJS from "crypto-js";
import SelectActionCard from "./Cards";
import { useNavigate } from "react-router-dom";

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

const BidderWiseDetails = () => {
  const [BidderWiseDetails, setBidderWiseDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bidderName, setBidderName] = useState(null);
  const [districtName, setDistrictName] = useState(null);
  const [isBidder, setIsBidder] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const encryptedQueryString = window.location.search;
  const secretKey = "9096609945";
  const encryptedData = encryptedQueryString.substring(6);
  const decodedData = decodeURIComponent(encryptedData);
  const navigate = useNavigate();

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
      setBidderName(decryptedObject.bidderName || "");
      setDistrictName(decryptedObject.districtName || "");
      setIsBidder(decryptedObject.isBidder || "N");
      const response = await axios.get(`${apiUrl}/api/GetBidderDetails`, {
        params: {
          strBidder: decryptedObject.strBidder,
          infoType: decryptedObject.infoType,
        },
      });

      if (response.status === 200) {
        setBidderWiseDetails(response.data);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProgressData =
    BidderWiseDetails?.Model?._progressStatusCount?.filter((item) => {
      if (isBidder === "Y") {
        return item.Bidder_Name === bidderName;
      } else {
        return item.District === districtName;
      }
    }) || [];

  return (
    <>
      {filteredProgressData?.length > 0 ? (
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
            <h2 style={{ margin: "15px 0" }}>Land Level Progress -</h2>
            <Typography style={{ marginLeft: "0px" }}>
              <Box
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#34d39933",
                  color: "#10b981",
                  padding: "5px 10px",
                  fontSize: "12px",
                  width: "fit-content",
                  fontWeight: "bold !important",
                }}
              >
                {bidderName ? bidderName : districtName}
              </Box>
            </Typography>
            {/* <button className="download-table-xls-button">Add +</button> */}
          </div>
          <Box p={1} pt={2}>
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <TableContainer sx={{ maxHeight: 590, overflowX: "scroll" }}>
                <Table
                  sx={{ minWidth: 650, overflowX: "scroll" }}
                  stickyHeader
                  size="small"
                  aria-label="sticky table"
                >
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Sr. No.</StyledTableCell>
                      <StyledTableCell>Circle Name</StyledTableCell>
                      <StyledTableCell>District</StyledTableCell>
                      <StyledTableCell>Bidder Name</StyledTableCell>
                      <StyledTableCell>SPV Name</StyledTableCell>
                      <StyledTableCell>PPA Ref. No.</StyledTableCell>
                      <StyledTableCell>Sub-Division Name</StyledTableCell>
                      <StyledTableCell>Substation Name</StyledTableCell>
                      <StyledTableCell>Substation No.</StyledTableCell>
                      <StyledTableCell>Solar Capacity(MW)</StyledTableCell>
                      <StyledTableCell>Application No.</StyledTableCell>
                      <StyledTableCell>Land Type</StyledTableCell>
                      <StyledTableCell>JM Area(Acres)</StyledTableCell>

                      {/* Remaining feildsare remaining to map */}
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProgressData?.map((ele, index) => (
                      <React.Fragment key={index}>
                        <StyledTableRow>
                          <StyledTableCell>{index + 1}</StyledTableCell>
                          <StyledTableCell>{ele.Circle_Name}</StyledTableCell>
                          <StyledTableCell>{ele.District}</StyledTableCell>
                          <StyledTableCell>{ele.Bidder_Name}</StyledTableCell>
                          <StyledTableCell>{ele.SPV_Name}</StyledTableCell>
                          <StyledTableCell>
                            {ele.PPA_Reference_No}
                          </StyledTableCell>
                          <StyledTableCell>
                            {ele.Subdivision_Name}
                          </StyledTableCell>
                          <StyledTableCell>
                            {ele.Substation_Name}
                          </StyledTableCell>
                          <StyledTableCell>{ele.SS_NO}</StyledTableCell>
                          <StyledTableCell>
                            {ele.Solar_Capacity}
                          </StyledTableCell>
                          <StyledTableCell>
                            {ele.Application_No}
                          </StyledTableCell>
                          <StyledTableCell>{ele.Land_Type}</StyledTableCell>
                          <StyledTableCell>{ele.JM_Area_Acres}</StyledTableCell>
                        </StyledTableRow>
                      </React.Fragment>
                    ))}
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

export default BidderWiseDetails;
