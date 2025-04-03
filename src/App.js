import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from 'react';

import HomePage from './components/HomePage/home';
import Login from './components/LoginPage/login';
// import SubstationStatus from './components/SubstationStatus/substationStatus';
import Substationwisedata from './components/Substationwisedata/substationwisedata';
import SPVDashboard from './components/SPVDashboard/spvDashboard';
import SWPClearances from './components/SWPClearances/swpClearances';
import SideBar from './components/Common/Sidebar/sidebar';
import Header from './components/Common/Header/header';
import SpvOperationalisation from './components/HomePage/SpvOperationalisation';
import ClusterSummaryAddEdit from './components/SPVTenderingCluster/ClusterSummaryAddEdit';
import ClusterSummary from './components/SPVTenderingCluster/ClusterSummary';
import LetterOfIntent from './components/SPVTenderingCluster/LetterOfIntent';
import LetterOfIntentAddEdit from './components/SPVTenderingCluster/LetterOfIntentAddEdit';
import Manuals from './components/HelpManual/Manuals';
import SubstationStatus from './components/SubstationStatus/substationStatus';
import MercAdoptionOrder from './components/SPVTenderingCluster/MercAdoptionOrder';
import MercAdoptionOrderAddEdit from './components/SPVTenderingCluster/MercAdoptionOrderAddEdit';
import UserRole from './components/AdminPanel/UserRole';
import UserCreation from './components/AdminPanel/UserCreation';
import UserCreationEdit from './components/AdminPanel/UserCreationEdit';
import UserRoleEdit from './components/AdminPanel/UserRoleEdit';
import Cluster from './components/HomePage/SWPClearances/Cluster';
import OpenTender from './components/HomePage/SWPClearances/OpenTender';
import SunstationsSummary from './components/HomePage/SWPClearances/SubstationsSummary';
import SummaryStageWise from './components/HomePage/SWPClearances/SummaryStageWise';
import SystemStrengthening from './components/HomePage/SystemStrengthening';
import SystemStrengtheningSubstations from './components/HomePage/SystemStrengthening/SystemStrengtheningSubStations';
import SystemStrengtheningSSNoDetails from './components/HomePage/SystemStrengthening/SystemStrengtheningSSNoDetails';
import SystemStrengtheningSubstationActivityStatus from './components/HomePage/SystemStrengthening/SystemStrengtheningSubstationActivityStatus';
import SystemStrengtheningSSNoActivity from './components/HomePage/SystemStrengthening/SystemStrengtheningSSNoActivity';
import SubstationsDoughnutClick from './components/HomePage/SystemStrengthening/SubstationsDoughnutClick';
import SSDoughnutClickDetails from './components/HomePage/SystemStrengthening/SubstationsDoughnutClickDetails';
import ProjectProgress from './components/HomePage/ProjectProgress';
import GetAllSummary from './components/HomePage/ProjectProgress/GetAllSummary';
import BidderDetails from './components/HomePage/ProjectProgress/BidderDetails';
import BidderWiseDetails from './components/HomePage/ProjectProgress/BidderWiseDetails';
import { Box } from '@mui/material';
import CommissionedSS from './components/HomePage/ProjectProgress/CommissionedSS';
import ProjectCFA from './components/HomePage/ProjectCFA';
import Dashboard from './components/HomePage/ProjectCFA/Dashboard';
import MilestoneSPVDashboard from './components/HomePage/ProjectCFA/MilestoneSPVDashboard';
import ForgotPassword from './components/LoginPage/ForgotPassword';
import ChangePassword from './components/LoginPage/ChangePassword';
import Profile from './components/LoginPage/Profile';
import TokenHandler from './components/LoginPage/TokenHandler';
import ProtectedRoute from './components/LoginPage/ProtectedRoute';
import NotFoundPage from './components/LoginPage/NotFoundPage';
import Chatbot from './components/Chatbot';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toogleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isForgotPasswordPage = location.pathname === '/forgotPassword';
  const isChangePasswordPage = location.pathname === '/changePassword';
  const [token, setToken] = useState(null);

  return (
    <Box className="App" >
      {!isLoginPage && !isForgotPasswordPage && !isChangePasswordPage && <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      {!isLoginPage && !isForgotPasswordPage && !isChangePasswordPage && (
        <Box sx={{flexGrow:1, overflowX: "hidden", display: "flex", flexDirection: "column" }}>
          <Header toogleSidebar={toogleSidebar} />
          <Chatbot />

          <Box sx={{flexGrow:1}} >
          <TokenHandler />
            <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/spvOperationalisation" element={<SpvOperationalisation />} />
              <Route path="/clusterSummary" element={<ClusterSummary />} />
              {/* <Route path='/clusterSummaryAddEdit/:v_clusterSummeryID/:sfile_id/:str_action' element={<ClusterSummaryAddEdit />} /> */}
              <Route path='/clusterSummaryAddEdit' element={<ClusterSummaryAddEdit />} />
              
              <Route path="/letterOfIntent" element={<LetterOfIntent />} />
              <Route path='/letterOfIntentAddEdit' element={<LetterOfIntentAddEdit />} />

              <Route path="/mercAdoptionOrder" element={<MercAdoptionOrder />} />
              <Route path='/mercAdoptionOrderAddEdit' element={<MercAdoptionOrderAddEdit />} />

              <Route path='/Substationwisedata/:DIST_CODE/:status' element={<Substationwisedata />} />
              <Route path='/SPVDashboard' element={<SPVDashboard />} />
              <Route path='/SWPClearances' element={<SWPClearances />} />
              <Route path='/downloadManuals' element={<Manuals />} />
              <Route path='/SubstationStatus/:DIST_CODE/:augmny' element={<SubstationStatus />} />

              <Route path='/userRole' element={<UserRole />} />
              <Route path='/UserRoleEdit' element={<UserRoleEdit />} />
              
              <Route path='/userCreation' element={<UserCreation />} />
              <Route path='/UserCreationEdit' element={<UserCreationEdit />} />

              
              <Route path='/SWPClearancesCluster' element={<Cluster />} />
              <Route path='/SWPClearancesOpenTender' element={<OpenTender />} />
              <Route path='/SWPSubStationsClearanceSummaryData' element={<SunstationsSummary />} />
              <Route path='/SWPSummaryStageWise' element={<SummaryStageWise />} />
              

              <Route path='/SystemStrengthening' element={<SystemStrengthening />} />
              <Route path='/SystemStrengtheningSS' element={<SystemStrengtheningSubstations />} />
              <Route path='/SystemStrengtheningSSNoDetails' element={<SystemStrengtheningSSNoDetails />} />
              <Route path='/SSActivityStatus/:status' element={<SystemStrengtheningSubstationActivityStatus />} />
              <Route path='/SystemStrengtheningSSNoActivity' element={<SystemStrengtheningSSNoActivity />} />
              <Route path='/SubstationsDoughnutClick/:status' element={<SubstationsDoughnutClick />} />
              <Route path='/SSDoughnutClickDetails' element={<SSDoughnutClickDetails />} />
              
              
              <Route path='/ProjectProgressMonitoring' element={<ProjectProgress />} />
              <Route path='/GetAllSummary' element={<GetAllSummary />} />
              <Route path='/bidderDetails' element={<BidderDetails />} />
              <Route path='/bidderWiseDetails' element={<BidderWiseDetails />} />
              <Route path='/commissionedSS' element={<CommissionedSS />} />
              
              
              <Route path='/projectCFAMilestone' element={<ProjectCFA />} />
              <Route path='/dashboard' element={<Dashboard />} />
              
              <Route path='/milestoneSPVDashboard' element={<MilestoneSPVDashboard />} />
              
              
             
             
             
              </Route>
            </Routes>
          </Box>
        </Box>
      )}
      <Routes>
        <Route path="/" element={<Login token={token} setToken={setToken}/>} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/changePassword' element={<ChangePassword />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Box>
  );
}

function App() {
  return <Layout />; // No <BrowserRouter> here
}

export default App;

