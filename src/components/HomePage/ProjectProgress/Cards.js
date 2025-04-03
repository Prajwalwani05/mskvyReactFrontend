import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

function SelectActionCard({ data }) {
  const districts = data.length;

  const substations = data?.reduce((sum, ele) => sum + ele.SsNo, 0);
  const solarCapacity = data?.reduce(
    (sum, ele) => sum + ele.AggregateCapacityMW,
    0
  );
  const landParcels = data?.reduce((sum, ele) => sum + ele.NoOfGovtLand, 0);
  const jmLand = data?.reduce((sum, ele) => sum + ele.JMArea, 0);

  const url = data?.map((element) => {
    const strBidder = element.PPA_Reference_No;
    const infoType = element.infoType;
    const bidderName = element.NameOfSelectedBidderCompany;
    const isBidder = 'Y';
    const secretKey = "9096609945";
  
    // Convert data into a JSON string
    const dataToEncrypt = JSON.stringify({
      strBidder,
      infoType,
      bidderName,
      isBidder
    });
  
    // Encrypt the JSON string
    const encryptedData = CryptoJS.AES.encrypt(
      dataToEncrypt,
      secretKey
    ).toString();
    const encodedData = encodeURIComponent(encryptedData);

    return `/bidderWiseDetails?data=${encodedData}`;
  })[0];

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 1,
        backgroundColor: "#e9ecef",
        padding: 1,
        borderRadius: 2,
      }}
    >
      <Card sx={{ backgroundColor: "#fbfaff" }}>
        {" "}
        {/* ✅ Added key */}
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" mb={1} component="div">
              District
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <Box
                mr={1}
                sx={{
                  borderRadius: "50%",
                  background:
                    "-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )",
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                }}
              ></Box>
              <Typography variant="h6" color="text.secondary">
                {districts}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ backgroundColor: "#fbfaff" }}>
        {" "}
        {/* ✅ Added key */}
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" mb={1} component="div">
              No. of Substations
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <Box
                mr={1}
                sx={{
                  borderRadius: "50%",
                  background:
                    "-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )",
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                }}
              ></Box>
              <Typography
                sx={{ color: "blue", cursor: "pointer" }}
                variant="h6"
              >
                <Link to={url}>{substations}</Link>
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ backgroundColor: "#fbfaff" }}>
        {" "}
        {/* ✅ Added key */}
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" mb={1} component="div">
              Solar Capacity(MW)
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <Box
                mr={1}
                sx={{
                  borderRadius: "50%",
                  background:
                    "-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )",
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                }}
              ></Box>
              <Typography variant="h6" color="text.secondary">
                {solarCapacity}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ backgroundColor: "#fbfaff" }}>
        {" "}
        {/* ✅ Added key */}
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" mb={1} component="div">
              No. of Land Parcels
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <Box
                mr={1}
                sx={{
                  borderRadius: "50%",
                  background:
                    "-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )",
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                }}
              ></Box>
              <Typography variant="h6" color="text.secondary">
                {landParcels}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ backgroundColor: "#fbfaff" }}>
        {" "}
        {/* ✅ Added key */}
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" mb={1} component="div">
              JM Area(Acres)
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <Box
                mr={1}
                sx={{
                  borderRadius: "50%",
                  background:
                    "-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )",
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                }}
              ></Box>
              <Typography variant="h6" color="text.secondary">
                {jmLand}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default SelectActionCard;
