import profileLogo from "../../../images/3dMan.jpg";
import { GoListUnordered } from "react-icons/go";
import {
  Box,
  Menu,
  MenuItem,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext"; // Assuming you have this context

const Header = ({ toogleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const sessionData = JSON.parse(sessionStorage.getItem("sessionData"));

  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  // Suggestions state
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sample data for suggestions - could be from an API or static data
  const sampleSuggestions = [
    "Profile",
    "SPV Operationalization",
    "SWP Clearances - Cluster",
    "SWP Clearances - Open Tender",
    "Settings",
    "Reports",
    "Help Center",
    "Change Password",
    "Logout",
    "Land Database",
    "Cluster Summary",
    "Letter Of Intent (LOI)",
    "MERC Tariff Adoption Order",
    "Download Manual",
    "Role Mapping",
    "Create New User",
    "Milestone SPV Dashboard",
    "System Strengthening",
    "Project Progress Monitoring",
    "Project CFA Milestones Monitoring",
  ];

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = sampleSuggestions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("sessionData");
    sessionStorage.removeItem("token");
    handleClose();
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleChangePassoword = () => {
    navigate("/changePassword");
    handleClose();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false); // Hide suggestions after selection
    // Navigate to the selected suggestion's page
    navigateToPage(suggestion);
    setSearchTerm("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && suggestions.length > 0) {
      // If Enter is pressed, navigate to the first suggestion (or selected suggestion)
      handleSuggestionClick(suggestions[0]);
      setSearchTerm("");
    }
  };

  const navigateToPage = (suggestion) => {
    // Navigate to the page based on the suggestion selected
    switch (suggestion) {
      case "Profile":
        navigate("/profile");
        break;
      case "SPV Operationalization":
        navigate("/spvOperationalisation");
        break;
      case "SWP Clearances - Cluster":
        navigate("/SWPClearancesCluster");
        break;
      case "SWP Clearances - Open Tender":
        navigate("/SWPClearancesOpenTender");
        break;
      case "Settings":
        navigate("/settings");
        break;
      case "Reports":
        navigate("/reports");
        break;
      case "Help Center":
        navigate("/help-center");
        break;
      case "Change Password":
        navigate("/changePassword");
        break;
        case "Land Database":
        navigate("/home");
        break;
        case "Cluster Summary":
        navigate("/clusterSummary");
        break;
        case "Letter Of Intent (LOI)":
        navigate("/letterOfIntent");
        break;
        case "MERC Tariff Adoption Order":
        navigate("/mercAdoptionOrder");
        break;
        case "Download Manual":
        navigate("/downloadManuals");
        break;
        case "Role Mapping":
        navigate("/userCreation");
        break;
        case "Create New User":
        navigate("/userCreation");
        break;
        case "Milestone SPV Dashboard":
        navigate("/milestoneSPVDashboard");
        break;
        case "System Strengthening":
        navigate("/SystemStrengthening");
        break;
        case "Project Progress Monitoring":
        navigate("/ProjectProgressMonitoring");
        break;
        case "Project CFA Milestones Monitoring":
          navigate("/projectCFAMilestone");
          break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="Header">
      <Box display={"flex"} gap={"10px"} alignItems={"center"}>
        <div className="msaplLogoDiv" style={{ position: "relative" }}>
          <GoListUnordered
            onClick={toogleSidebar}
            style={{
              color: "var(--headerSidebar)",
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
        </div>
        <Box>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)} // Show suggestions when input is focused
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow for suggestion selection
            onKeyDown={handleKeyDown} // Listen for the Enter key press
            sx={{
              "& .MuiInputBase-input": {
                color: "#212529",
                padding: "5px", // Adjust padding for better spacing
              },
            }}
          />
          {showSuggestions && (
            <Box
              sx={{
                position: "absolute",
                backgroundColor: "white",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                width: "max-content",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 9999, // Ensure it's above other content
              }}
            >
              <List>
                {suggestions.map((suggestion, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <ListItemText primary={suggestion} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="profileLogoDiv"
        sx={{
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography>{sessionData && sessionData.UserName}</Typography>
        <Box
          sx={{
            width: "40px",
            height: "40px", // Ensure height matches width for a perfect circle
            borderRadius: "50%",
            overflow: "hidden", // Prevents image from spilling out
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={profileLogo}
            alt="profileIcon"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensures the image covers the entire circle
            }}
          />
        </Box>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleChangePassoword}>Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
