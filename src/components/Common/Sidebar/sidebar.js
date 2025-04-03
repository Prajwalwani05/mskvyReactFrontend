import React, { useEffect, useState } from "react";
import msapl from "../../../images/Msapl_loho_new.jpg";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  GoHome,
  GoChecklist,
  GoCodeReview,
  GoTasklist,
  GoPerson,
} from "react-icons/go";
import { HiChevronDown } from "react-icons/hi2";
import { FaChartPie } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { FaRankingStar } from "react-icons/fa6";
import { FaTowerBroadcast } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaFirstdraft } from "react-icons/fa";
import { FaHireAHelper } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { IoMdShareAlt } from "react-icons/io";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const SideBar = ({ setIsOpen, isOpen }) => {
  const [menuData, setMenuData] = useState([]);
  const [activeLink, setActiveLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [openSubmenus2, setOpenSubmenus2] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 1300) {
        setIsOpen(true); // Close sidebar when width is <= 1200px
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run once to set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Add event listener to track changes in the location
    const handleActiveLink = () => {
      setActiveLink(window.location.pathname);
    };

    // Initial check for active link
    handleActiveLink();

    // Listen for changes in the location
    window.addEventListener("popstate", handleActiveLink);

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handleActiveLink);
    };
  }, []);

  useEffect(() => {
    const storedOpenSubmenus = JSON.parse(localStorage.getItem("openSubmenus")) || {};
    const storedOpenSubmenus2 = JSON.parse(localStorage.getItem("openSubmenus2")) || {};
    setOpenSubmenus(storedOpenSubmenus);
    setOpenSubmenus2(storedOpenSubmenus2);
  }, []);
  
  useEffect(() => {
    setLoading(true);
    
    const sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
    if (!sessionData) {
      console.error("❌ Not found session storage");
      return;
    }
    if (!sessionData.Role_Id) {
      console.error("❌ No Role_ID found in session storage");
      return;
    }
     
    axios
      .get(`${apiUrl}/api/Login/Menu?userId=${sessionData.Role_Id}`)
      .then((response) => {
        // Check if response status is 200
        if (response.status === 200) {
          // Data is now available here
          console.log("Menu_DATA>>>", response.data);
          setMenuData(response.data);
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

  const handleExpandMenu = (e, index) => {
    e.stopPropagation();
    setOpenSubmenus((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        if (key !== index.toString()) {
          newState[key] = false;
        }
      });
      newState[index] = !newState[index];
      return newState;
    });
  };
  const handleExpandSubMenu = (e, key) => {
    e.stopPropagation();
    setOpenSubmenus2((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((existingKey) => {
        if (existingKey.startsWith(key.split("-")[0]) && existingKey !== key) {
          newState[existingKey] = false;
        }
      });
      newState[key] = !newState[key];
      return newState;
    });
  };

  const iconMap = {
    "icon fa-solid fa-chart-pie": (
      <FaChartPie
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "16px" }}
      />
    ),
    "icon fa-solid fa-file-contract": (
      <HiDocumentReport
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "18px" }}
      />
    ),
    "icon fa-solid fa-ranking-star": (
      <FaRankingStar
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "16px" }}
      />
    ),
    "icon fa-solid fa-tower-broadcast": (
      <FaTowerBroadcast
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "16px" }}
      />
    ),
    "icon fa-solid fa-layer-group": (
      <GoCodeReview
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "16px" }}
      />
    ),
    "icon fa-regular fa-rectangle-list": (
      <FaListAlt
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "16px" }}
      />
    ),
    "icon fa-solid fa-envelope-circle-check": (
      <MdEmail
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "16px" }}
      />
    ),
    "icon fa-solid fa-shield": (
      <RiAdminFill
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "18px" }}
      />
    ),
    "icon fa-solid fa-chalkboard-user": (
      <FaChalkboardTeacher
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "18px" }}
      />
    ),
    "icon fa-brands fa-firstdraft": (
      <FaFirstdraft
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "16px" }}
      />
    ),
    "icon fa-brands fa-hire-a-helper": (
      <FaHireAHelper
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "16px" }}
      />
    ),
    "icon fa-solid fa-share": (
      <IoMdShareAlt
        className="sidebarIcon"
        style={{ color: "#495057", fontSize: "16px" }}
      />
    ),
  };
  const titleToUrlMap = {
    "Land Database": "/home",
    "SPV Operationalization": "/spvOperationalisation",
    "Cluster Summary": "/clusterSummary",
    "Letter Of Intent (LOI)": "/letterOfIntent",
    "MERC Tariff Adoption Order": "/mercAdoptionOrder",
    "Download Manual": "/downloadManuals",
    "Role Mapping": "/userRole",
    "Create New User": "/userCreation",
    "Milestone SPV Dashboard": "/milestoneSPVDashboard",
    "SWP Clearances - Cluster": "/SWPClearancesCluster",
    "SWP Clearances - Open Tender": "/SWPClearancesOpenTender",

    "System Strengthening": "/SystemStrengthening",
    
    
    "Project Progress Monitoring": "/ProjectProgressMonitoring",
    
    "Project CFA Milestones Monitoring": "/projectCFAMilestone"
  };

  return (
    <div
      style={{ paddingBottom: "15px" }}
      className={isOpen ? "SideBarOpen" : "SideBar"}
    >
      <div className="img">
        <img style={{ width: "180px" }} src={msapl} alt="msaplLogo" />
      </div>
      {/* <hr /> */}
      <div className="sidebar-body">
        {
          <>
            {isOpen ? (
              <div>
                <div className="isOpenDiv">
                  {menuData &&
                  menuData.MenuItems &&
                  menuData.MenuItems.length > 0
                    ? menuData.MenuItems.map((element, index) => (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            width: "100%",
                          }}
                        >
                          {iconMap[element.Icon] && iconMap[element.Icon]}
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            ) : (
              <div className="mainMenu">
                {menuData &&
                menuData.MenuItems &&
                menuData.MenuItems.length > 0 ? (
                  menuData.MenuItems
                  .filter((element) => 
                    element.SubMenu && element.SubMenu.some((ele) => ele.Url !== null)
                  )
                  .map((element, index) => (
                    <li key={index} style={{ position: "relative" }}>
                      <div
                        onClick={(e) => handleExpandMenu(e, index)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            width: "100%",
                          }}
                        >
                          {iconMap[element.Icon] && iconMap[element.Icon]}
                          <h5 className="links">{element.Title}</h5>
                        </div>
                        {element.SubMenu && element.SubMenu.length > 0 && (
                          <ExpandMoreRoundedIcon
                            className={`sidebarIcon2 ${
                              openSubmenus[index] ? "open" : ""
                            }`}
                            style={{
                              color: "#495057",
                              fontSize: "18px",
                              marginLeft: "15px",
                              transform: openSubmenus[index]
                                ? "rotate(180deg)"
                                : "rotate(0deg)", // ✅ Rotate when open
                              transition: "transform 0.3s ease", // ✅ Smooth animation
                            }}
                          />
                        )}
                      </div>
                      {openSubmenus[index] && (
                        <ul style={{ width: "100%" }}>
                          {element.SubMenu.map((ele, subIndex) => (
                            ele.Url !== null &&
                            <li key={subIndex}>
                              <div
                                onClick={(e) =>
                                  handleExpandSubMenu(e, `${index}-${subIndex}`)
                                }
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "100%",
                                  cursor: "pointer",
                                  paddingRight: "3px",
                                  paddingLeft: "27px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    width: "100%",
                                  }}
                                >
                                  {iconMap[ele.Icon] && iconMap[ele.Icon]}
                                  {
                                    ele.SubMenu.length > 0 ? (
                                      <h5 className="links">{ele.Title}</h5>
                                    ) : (
                                      <NavLink
                                        to={titleToUrlMap[ele.Title] || "#"}
                                        className={({ isActive }) =>
                                          isActive
                                            ? "active-menu-item"
                                            : "menu-item"
                                        }
                                      >
                                        {iconMap[ele.Icon]} {ele.Title}
                                      </NavLink>
                                    )
                                    // <NavLink style={{fontSize:'12px'}}  to={titleToUrlMap[ele.Title]}>{ele.Title}</NavLink>
                                  }
                                </div>
                                {/* <h5 className='links'>{ele.Title}</h5> */}
                                {ele.SubMenu && ele.SubMenu.length > 0 && (
                                  <ExpandMoreRoundedIcon
                                    className={`sidebarIcon2 ${
                                      openSubmenus2[`${index}-${subIndex}`]
                                        ? "open"
                                        : ""
                                    }`}
                                    style={{
                                      color: "#495057",
                                      fontSize: "14px",
                                      marginLeft: "10px",
                                      transform: openSubmenus2[
                                        `${index}-${subIndex}`
                                      ]
                                        ? "rotate(180deg)"
                                        : "rotate(0deg)", // ✅ Rotate when open
                                      transition: "transform 0.3s ease", // ✅ Smooth animation
                                    }}
                                  />
                                )}
                              </div>
                              {openSubmenus2[`${index}-${subIndex}`] &&
                                ele.SubMenu.length > 0 && (
                                  <ul style={{ paddingLeft: "35px" }}>
                                    {ele.SubMenu.map((subEle, nestedIndex) => (
                                      <li
                                        key={nestedIndex}
                                        style={{ padding: "14px 0 0 20px" }}
                                      >
                                        {/* <NavLink
                                          style={{
                                            fontSize: "12px",
                                            fontWeight: "600",
                                          }}
                                          className="links"
                                          to={subEle.Url || "#"}
                                        >
                                          {subEle.Title}
                                        </NavLink> */}
                                        <NavLink
                                          to={subEle.Url || "#"}
                                          className={({ isActive }) =>
                                            isActive
                                              ? "active-menu-item"
                                              : "menu-item"
                                          }
                                        >
                                          {subEle.Title}
                                        </NavLink>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
};

export default SideBar;
