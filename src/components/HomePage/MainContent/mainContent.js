import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import Loader from "../../Common/Loader/loader";
import {
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

const MainContent = () => {
  const { data, setData, setSubstationData } = useContext(DataContext);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(true); // State for iframe loading
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const augumny = "N";
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/api/GetAllDistrictSummary`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // Check if response status is 200
        if (response.status === 200) {
          // Data is now available here
          console.log("DATA>>>", response.data);
          setData(response.data);
          setLoading(false);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    console.log(selectedDistrict);
  };

  const handleApiRequest = (districtCode) => {
    setLoading(true);
    axios
      .get(
        `${apiUrl}/api/SubStation/GetSubStationData?dist_code=${districtCode}&augmny=${augumny}`
        // `${apiUrl}/api/SubStation/GetSubStationData?dist_code=${DIST_CODE}&augmny=${augmentation}`,
      )
      .then((response) => {
        console.log(response);
        if (response) {
          console.log("Substation Data", response.data);
          setSubstationData(response.data);
          navigate(`/SubstationStatus/${districtCode}/${augumny}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API request is completed
      });
  };

  //Total
  // Initialize total variables
  let tSubStation = 0;
  let tSolarCapacity = 0;
  let tLandRequired = 0;
  let tLandRequiredWith5Tolerance = 0;
  let tJMLandArea = 0;

  // Iterate through the data and calculate totals
  data &&
    data.forEach((element) => {
      tSubStation += Number(element.TotalSubStation);
      tSolarCapacity += Number(element.TotalSolarCapacity);
      tLandRequired += Number(element.TotalLandRequired);
      tLandRequiredWith5Tolerance += Number(
        element.TotalLandRequiredwith_5_tolerance
      );
      tJMLandArea += Number(element.JM_LAND_AREA);
    });
  let totalSubStation = tSubStation.toFixed(2);
  let totalSolarCapacity = tSolarCapacity.toFixed(2);
  let totalLandRequired = tLandRequired.toFixed(2);
  let totalLandRequiredWith5Tolerance = tLandRequiredWith5Tolerance.toFixed(2);
  let totalJMLandArea = tJMLandArea.toFixed(2);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="mainContent">
          <h1 style={{ margin: "10px 0" }}>Dashboard</h1>
          {mapLoading && <Loader />}

          <iframe
            style={{
              border: "0",
              width: "100%",
              height: "500px",
              display: mapLoading ? "none" : "block",
            }}
            title="Google Map"
            src="https://www.google.com/maps/d/embed?mid=1ulfLx1FHM1qBs6t2l6K9RalQHI2qi44&ehbc=2E312F"
            onLoad={() => setMapLoading(false)} // Hide loader when iframe loads
          ></iframe>
          {/* <iframe style={{border: '0', width: '100%', height: '500px'}} title="hello" src="https://www.google.com/maps/d/embed?mid=1ulfLx1FHM1qBs6t2l6K9RalQHI2qi44&ehbc=2E312F" width="640" height="480"></iframe> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "5px",
                width: "100%",
                justifyContent: "flex-end",
                margin: "20px 0px 10px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <h4>Select District</h4>
                <select
                  onChange={handleDistrictChange}
                  placeholder="Select District"
                >
                  {data ? (
                    data.map((element, index) => (
                      <option key={index} value={element.DIST_CODE}>
                        {element.DIST_NAME}
                      </option>
                    ))
                  ) : (
                    <div></div>
                  )}
                </select>
              </div>
              <button onClick={() => handleApiRequest(selectedDistrict)}>
                Submit
              </button>
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>District Name</StyledTableCell>
                  <StyledTableCell>
                    Number of Identified Substations
                  </StyledTableCell>
                  <StyledTableCell>
                    Total Solar Capacity (in MW)
                  </StyledTableCell>
                  <StyledTableCell>
                    Total Land Required (in Acre)
                  </StyledTableCell>
                  <StyledTableCell>
                    Land Required with 5% Tolerance (in Acre)
                  </StyledTableCell>
                  <StyledTableCell>Land Cleared (in Acre)</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data ? (
                  data.map((element, index) => (
                    <StyledTableRow
                      key={index}
                      onClick={() => handleApiRequest(element.DIST_CODE)}
                      style={{ cursor: "pointer" }}
                    >
                      <StyledTableCell>{element.DIST_NAME}</StyledTableCell>
                      <StyledTableCell>
                        {element.TotalSubStation}
                      </StyledTableCell>
                      <StyledTableCell>
                        {element.TotalSolarCapacity}
                      </StyledTableCell>
                      <StyledTableCell>
                        {element.TotalLandRequired}
                      </StyledTableCell>
                      <StyledTableCell>
                        {element.TotalLandRequiredwith_5_tolerance}
                      </StyledTableCell>
                      <StyledTableCell>{element.JM_LAND_AREA}</StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <Loader />
                )}
                <StyledTableRow style={{ backgroundColor: "#F9F9FA" }}>
                  <StyledTableCell style={{ color: "#6c757d" }}>
                    Total
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "#6c757d" }}>
                    {totalSubStation}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "#6c757d" }}>
                    {totalSolarCapacity}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "#6c757d" }}>
                    {totalLandRequired}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "#6c757d" }}>
                    {totalLandRequiredWith5Tolerance}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "#6c757d" }}>
                    {totalJMLandArea}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default MainContent;
