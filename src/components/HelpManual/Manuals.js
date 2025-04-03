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
  Typography,
} from "@mui/material";
import React from "react";
import pdfImg from "./pdf.png";
import SPV_Manual from "./SPV_Manual.pdf";
import Renewable_Energy_Help from "./Renewable Energy Help.pdf";
import Approver_Manual from "./Approver_Manual.pdf";
import Renewable_Energy_Help_2 from "./Renewable Energy Help (1).pdf";
import Checker_Manual from "./Checker_ Manual.pdf";

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

const Manuals = () => {
  const handleDownload = (pdf, name) => {
    const link = document.createElement("a");
    link.href = pdf;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        margin: "10px",
        borderRadius: "16px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
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
        <h2 style={{ margin: "15px 0" }}>Download Help Manuals</h2>
      </div>
      <Box p={1}>
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer >
            <Table
             sx={{ minWidth: 700 }}
             stickyHeader
             size="medium"
             aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Document</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Download</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>
                    <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                    <img src={pdfImg} alt="pdf" width={"30"} />
                    <Box>
                      <Typography
                        variant="h6"
                        fontFamily={"inherit"}
                        fontWeight={"600"}
                      >
                        User Manual for SPV
                      </Typography>
                      <Typography
                        variant="content"
                        fontFamily={"inherit"}
                        fontWeight={"600"}
                      >
                        Comprehensive Manual to help you navigate the
                        application.
                      </Typography>
                    </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box
                      sx={{
                        width: "60%",
                        textAlign: "center",
                        backgroundColor: "#e9ecef",
                        borderRadius: "20px",
                        padding: "5px",
                      }}
                    >
                      <Typography
                        fontSize={"12px"}
                        fontFamily={"inherit"}
                        color={"green"}
                        fontWeight={"600"}
                      >
                        Active
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <button
                      class="Btn"
                      onClick={() => handleDownload(SPV_Manual, "SPV Manual")}
                    >
                      <svg
                        class="svgIcon"
                        viewBox="0 0 384 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                      </svg>
                      <span class="icon2"></span>
                      <span class="tooltip">Download</span>
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                  <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                  <img src={pdfImg} alt="pdf" width={"30"} />
                <Box>
                  <Typography
                    variant="h6"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    Renewable Energy Help for SPV
                  </Typography>
                  <Typography
                    variant="content"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    The Renewable Energy Help Manual is here to guide you in
                    navigating the mobile app.
                  </Typography>
                </Box>
                  </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                  <Box
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    backgroundColor: "#e9ecef",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    fontFamily={"inherit"}
                    color={"green"}
                    fontWeight={"600"}
                  >
                    Active
                  </Typography>
                </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                  <button
                  class="Btn"
                  onClick={() =>
                    handleDownload(
                      Renewable_Energy_Help,
                      "Renewable Energy Help"
                    )
                  }
                >
                  <svg
                    class="svgIcon"
                    viewBox="0 0 384 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                  </svg>
                  <span class="icon2"></span>
                  <span class="tooltip">Download</span>
                </button>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                  <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                  <img src={pdfImg} alt="pdf" width={"30"} />
                <Box>
                  <Typography
                    variant="h6"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    User Manual for Checker
                  </Typography>
                  <Typography
                    variant="content"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    Comprehensive Manual to help you navigate the application.
                  </Typography>
                </Box>
                  </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                  <Box
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    backgroundColor: "#e9ecef",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    fontFamily={"inherit"}
                    color={"green"}
                    fontWeight={"600"}
                  >
                    Active
                  </Typography>
                </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                  <button
                  class="Btn"
                  onClick={() =>
                    handleDownload(Checker_Manual, "Checker Manual")
                  }
                >
                  <svg
                    class="svgIcon"
                    viewBox="0 0 384 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                  </svg>
                  <span class="icon2"></span>
                  <span class="tooltip">Download</span>
                </button>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                  <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                  <img src={pdfImg} alt="pdf" width={"30"} />
                <Box>
                  <Typography
                    variant="h6"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    User Manual for Approver
                  </Typography>
                  <Typography
                    variant="content"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    Comprehensive Manual to help you navigate the application.
                  </Typography>
                </Box>
                  </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                  <Box
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    backgroundColor: "#e9ecef",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    fontFamily={"inherit"}
                    color={"green"}
                    fontWeight={"600"}
                  >
                    Active
                  </Typography>
                </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                  <button
                  class="Btn"
                  onClick={() =>
                    handleDownload(Approver_Manual, "Approver Manual")
                  }
                >
                  <svg
                    class="svgIcon"
                    viewBox="0 0 384 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                  </svg>
                  <span class="icon2"></span>
                  <span class="tooltip">Download</span>
                </button>
                  </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>
                  <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                    <img src={pdfImg} alt="pdf" width={"30"} />
                <Box>
                  <Typography
                    variant="h6"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    Renewable Energy Help for Checker
                  </Typography>
                  <Typography
                    variant="content"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    The Renewable Energy Help Manual is here to guide you in
                    navigating the mobile app.
                  </Typography>
                </Box>
                  </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                    <Box
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    backgroundColor: "#e9ecef",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    fontFamily={"inherit"}
                    color={"green"}
                    fontWeight={"600"}
                  >
                    Active
                  </Typography>
                </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                    <button
                  class="Btn"
                  onClick={() =>
                    handleDownload(
                      Renewable_Energy_Help_2,
                      "Renewable Energy Help 2"
                    )
                  }
                >
                  <svg
                    class="svgIcon"
                    viewBox="0 0 384 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                  </svg>
                  <span class="icon2"></span>
                  <span class="tooltip">Download</span>
                </button>
                    </StyledTableCell>
                  </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* <table>
          <thead>
            <tr>
              <th>Document</th>
              <th>Status</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{ display: "flex", gap: "15px", alignItems: "center" }}
              >
                <img src={pdfImg} alt="pdf" width={"30"} />
                <Box>
                  <Typography
                    variant="h6"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    User Manual for SPV
                  </Typography>
                  <Typography
                    variant="content"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    Comprehensive Manual to help you navigate the application.
                  </Typography>
                </Box>
              </td>
              <td>
                <Box
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    backgroundColor: "#e9ecef",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    fontFamily={"inherit"}
                    color={"green"}
                    fontWeight={"600"}
                  >
                    Active
                  </Typography>
                </Box>
              </td>
              <td>
                <button
                  class="Btn"
                  onClick={() => handleDownload(SPV_Manual, "SPV Manual")}
                >
                  <svg
                    class="svgIcon"
                    viewBox="0 0 384 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                  </svg>
                  <span class="icon2"></span>
                  <span class="tooltip">Download</span>
                </button>
              </td>
            </tr>
            <tr>
              <td
                style={{ display: "flex", gap: "15px", alignItems: "center" }}
              >
                <img src={pdfImg} alt="pdf" width={"30"} />
                <Box>
                  <Typography
                    variant="h6"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    Renewable Energy Help for SPV
                  </Typography>
                  <Typography
                    variant="content"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    The Renewable Energy Help Manual is here to guide you in
                    navigating the mobile app.
                  </Typography>
                </Box>
              </td>
              <td>
                <Box
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    backgroundColor: "#e9ecef",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    fontFamily={"inherit"}
                    color={"green"}
                    fontWeight={"600"}
                  >
                    Active
                  </Typography>
                </Box>
              </td>
              <td>
                <button
                  class="Btn"
                  onClick={() =>
                    handleDownload(
                      Renewable_Energy_Help,
                      "Renewable Energy Help"
                    )
                  }
                >
                  <svg
                    class="svgIcon"
                    viewBox="0 0 384 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                  </svg>
                  <span class="icon2"></span>
                  <span class="tooltip">Download</span>
                </button>
              </td>
            </tr>

            <tr>
              <td
                style={{ display: "flex", gap: "15px", alignItems: "center" }}
              >
                <img src={pdfImg} alt="pdf" width={"30"} />
                <Box>
                  <Typography
                    variant="h6"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    User Manual for Approver
                  </Typography>
                  <Typography
                    variant="content"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    Comprehensive Manual to help you navigate the application.
                  </Typography>
                </Box>
              </td>
              <td>
                <Box
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    backgroundColor: "#e9ecef",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    fontFamily={"inherit"}
                    color={"green"}
                    fontWeight={"600"}
                  >
                    Active
                  </Typography>
                </Box>
              </td>
              <td>
                <button
                  class="Btn"
                  onClick={() =>
                    handleDownload(Approver_Manual, "Approver Manual")
                  }
                >
                  <svg
                    class="svgIcon"
                    viewBox="0 0 384 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                  </svg>
                  <span class="icon2"></span>
                  <span class="tooltip">Download</span>
                </button>
              </td>
            </tr>

            <tr>
              <td
                style={{ display: "flex", gap: "15px", alignItems: "center" }}
              >
                <img src={pdfImg} alt="pdf" width={"30"} />
                <Box>
                  <Typography
                    variant="h6"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    Renewable Energy Help for Checker
                  </Typography>
                  <Typography
                    variant="content"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    The Renewable Energy Help Manual is here to guide you in
                    navigating the mobile app.
                  </Typography>
                </Box>
              </td>
              <td>
                <Box
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    backgroundColor: "#e9ecef",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    fontFamily={"inherit"}
                    color={"green"}
                    fontWeight={"600"}
                  >
                    Active
                  </Typography>
                </Box>
              </td>
              <td>
                <button
                  class="Btn"
                  onClick={() =>
                    handleDownload(
                      Renewable_Energy_Help_2,
                      "Renewable Energy Help 2"
                    )
                  }
                >
                  <svg
                    class="svgIcon"
                    viewBox="0 0 384 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                  </svg>
                  <span class="icon2"></span>
                  <span class="tooltip">Download</span>
                </button>
              </td>
            </tr>
            <tr>
              <td
                style={{ display: "flex", gap: "15px", alignItems: "center" }}
              >
                <img src={pdfImg} alt="pdf" width={"30"} />
                <Box>
                  <Typography
                    variant="h6"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    User Manual for Checker
                  </Typography>
                  <Typography
                    variant="content"
                    fontFamily={"inherit"}
                    fontWeight={"600"}
                  >
                    Comprehensive Manual to help you navigate the application.
                  </Typography>
                </Box>
              </td>
              <td>
                <Box
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    backgroundColor: "#e9ecef",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    fontFamily={"inherit"}
                    color={"green"}
                    fontWeight={"600"}
                  >
                    Active
                  </Typography>
                </Box>
              </td>
              <td>
                <button
                  class="Btn"
                  onClick={() =>
                    handleDownload(Checker_Manual, "Checker Manual")
                  }
                >
                  <svg
                    class="svgIcon"
                    viewBox="0 0 384 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                  </svg>
                  <span class="icon2"></span>
                  <span class="tooltip">Download</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table> */}
      </Box>
    </Box>
  );
};

export default Manuals;
