import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loader from "../Common/Loader/loader";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import TransitionsModal from "../Modal";

const columns = [
  { id: "FileName", label: "Menu Name", minWidth: 250, align: "left" },
  { id: "RoleView", label: "View", minWidth: 50, align: "center" },
  { id: "RoleAdd", label: "Add", minWidth: 50, align: "center" },
  { id: "RoleEdit", label: "Edit", minWidth: 50, align: "center" },
  { id: "RoleDelete", label: "Delete", minWidth: 50, align: "center" },
];

function createData(id, name, view, add, edit, del) {
  return { id, name, view, add, edit, delete: del };
}

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

const UserRoleEdit = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [UserRoleEditData, setUserRoleEditData] = useState({});

  const [formData, setFormData] = useState({});
  const [data, setData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ssRoleID = searchParams.get("sRoleID");
  const ssfile_id = searchParams.get("sfile_id");
  // To track the focused input
  const inputRef = useRef(null);
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    action: null,
    img: "",
  });
  // const encryptedQueryString = window.location.search;
  // const secretKey = "9096609945";
  // const encryptedData = encryptedQueryString.substring(6);
  // const decodedData = decodeURIComponent(encryptedData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/UserRoleDataEdit`, {
          params: {
            sRoleID: ssRoleID,
            sfile_id: ssfile_id,
          },
        });

        console.log("✅ User Role Data:", response.data);

        if (response.status === 200) {
          setUserRoleEditData(response.data);
        } else {
          throw new Error("API request failed");
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [apiUrl, ssRoleID, ssfile_id]);

  // **Fix: Only update formData when letterOfIntentData is available and hasn't been set**
  useEffect(() => {
    if (UserRoleEditData && UserRoleEditData.ListUserType) {
      // Capitalize the first letter
      const foundUserType = UserRoleEditData.ListUserType?.find(
        (user) =>
          user.UserTypeID.toString() ===
          UserRoleEditData.objRole?.UserTypeID.toString()
      );
      const foundLandingFile = UserRoleEditData.ListFile?.find(
        (user) =>
          user.file_id.toString() ===
          UserRoleEditData.objRole?.LandingFileID.toString()
      );
      setData((prevState) => ({
        ...prevState,
        UserType: foundUserType ? foundUserType.UserTypeName : "",
        UserLandingFile: foundLandingFile ? foundLandingFile.file_name : "",
      }));
    }
    if (UserRoleEditData && Object.keys(formData).length === 0) {
      setFormData(UserRoleEditData);
    }
  }, [UserRoleEditData, formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Store the focused input before updating state
    inputRef.current = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Restore focus after state update
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleCheckboxChange = (event, rowIndex, field) => {
    const isChecked = event.target.checked ? 1 : 0;

    setFormData((prevState) => ({
      ...prevState,
      ListRoleFilePermission: prevState.ListRoleFilePermission.map(
        (ele, index) =>
          index === rowIndex ? { ...ele, [field]: isChecked } : ele
      ),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    console.log( "updated checkbox data: " , formData);
    try {
      const response = await axios.post(
        `${apiUrl}/api/InsertUpdateRoleData`,
        formData
      );

      if (response.status === 200) {
        setModal({
          open: true,
          title: "Congrats !!",
          message: "Data saved successfully",
          img: <CheckCircleIcon fontSize="large"  color="success" />,
        })       
        console.log(response.data);
      } else {
        // alert("Failed to save data!");
        setModal({
          open: true,
          title: "Error",
          message: "Failed to save data!.",
          img: <WarningRoundedIcon fontSize="large"  color="warning" />,
        })
      }
    } catch (error) {
      console.error("❌ main-Error:", error.message);
      alert("An error occurred while saving data.");
      setModal({
        open: true,
        title: "Error",
        message: "Failed to save data!.",
        img: <WarningRoundedIcon fontSize="large" color="warning" />,
      })
    }
  };

  // const handleViewPdf = (url) => {
  //     console.log(url)
  //     setPdfUrl(url);
  //     setOpenPdfViewer(true);
  //   };
  const ITEM_HEIGHT = 100;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const rows = (formData.ListRoleFilePermission || []).map((ele, index) => ({
    id: index,
    FileName: ele.FileName,
    RoleView: ele.RoleView,
    RoleAdd: ele.RoleAdd,
    RoleEdit: ele.RoleEdit,
    RoleDelete: ele.RoleDelete,
  }));

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        margin: "10px",
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
          padding: "0 14px",
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
        <h2 style={{ margin: "15px 0" }}>Role Mapping</h2>
      </div>
      <Box p={2}>
        {formData && formData.ListRoleFilePermission ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} mb={1}>
              {/* <Grid item xs={12} sm={3}> 
                <FormControl fullWidth size="medium">
                    <InputLabel>User Type</InputLabel>
                    <Select
                        name="UserType"
                        value={data.UserType || ""}
                        onChange={handleChange}
                    >
                        {formData.ListUserType &&
                        formData.ListUserType.map((users) => (
                            <MenuItem key={users.UserTypeID} value={users.UserTypeName}>
                            {users.UserTypeName}
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                </Grid> */}
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="medium">
                  <InputLabel
                    sx={{ backgroundColor: "#FFF", padding: "0 5px" }}
                  >
                    User Type
                  </InputLabel>
                  <Select
                    name="UserType"
                    value={data.UserType || ""}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                  >
                    {formData.ListUserType &&
                      formData.ListUserType.map((users) => (
                        <MenuItem
                          key={users.UserTypeID}
                          value={users.UserTypeName}
                        >
                          {users.UserTypeName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Role Name"
                  name="RoleName"
                  value={formData.objRole?.RoleName || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Role Description"
                  name="RoleDescription"
                  value={formData.objRole?.RoleDescription || ""}
                  onChange={handleChange}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="medium">
                  <InputLabel
                    sx={{ backgroundColor: "#FFF", padding: "0 5px" }}
                  >
                    Landing File
                  </InputLabel>
                  <Select
                    name="UserLandingFile"
                    value={data.UserLandingFile || ""}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                  >
                    {formData.ListFile &&
                      formData.ListFile.map((users) => (
                        <MenuItem key={users.file_id} value={users.file_name}>
                          {users.file_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box p={1} pt={1}>
                     <Box sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: 480 }}>
                <Table
                  sx={{ minWidth: 700 }}
                  stickyHeader
                  size="small" 
                  aria-label="sticky table"
                >
                 <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <StyledTableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={columns.length} align="center">
                          <Loader />
                        </TableCell>
                      </TableRow>
                    ) : (
                      rows.map((row, index) => (
                        <StyledTableRow key={row.id}>
                          {columns.map((column) => {
                            return (
                              <StyledTableCell
                                key={column.id}
                                align={column.align}
                              >
                                {column.id === "FileName" ? (
                                  row.FileName // ✅ Show menu name in the first column only
                                ) : (
                                  <Checkbox
                                    size="small"
                                    color="success"
                                    checked={row[column.id] === 1} // ✅ Ensure checkboxes reflect stored values
                                    onChange={(event) =>
                                      handleCheckboxChange(
                                        event,
                                        index,
                                        column.id
                                      )
                                    }
                                  />
                                )}
                              </StyledTableCell>
                            );
                          })}
                        </StyledTableRow>
                      ))
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
                variant="text"
                style={{color:'#069465'}}
                size="medium"
                type="submit"
                onClick={() => navigate("/userRole")}
              >
                Back
              </Button>
              <Button
                variant="contained"
                style={{backgroundColor:'#069465'}}
                size="medium"
                type="submit"
              >
                Save
              </Button>
            </Box>
            </Box>
            {/* </Grid> */}
          </form>
        ) : (
          <Loader />
        )}
      </Box>
      <TransitionsModal
          open={modal.open}
          onClose={() => setModal({ ...modal, open: false })}
          title={modal.title}
          message={modal.message}
          action={modal.action}
          img={modal.img}
        />
      {/* <StickyHeadTable data={formData.ListRoleFilePermission} /> */}
    </Box>
  );
};

export default UserRoleEdit;
