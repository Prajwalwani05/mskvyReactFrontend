import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../context/DataContext";
import Loader from "../Common/Loader/loader";
import { fetchData } from "../Functions/substationDataFunc";
import MyChart from "./PieChart";
import MyChart2 from "./PieChart2";
import MyChart3 from "./PieChart3";
import MyChart4 from "./PieChart4";
import BasicBars from "./BarChart";
import "./style.css";

const SubstationStatus = () => {
  let { DIST_CODE, augmny } = useParams();
  console.log("DIST-CODE: " , DIST_CODE)
  const { data, setData, substationData, setSubstationData, remainingSolarData, setRemainingSolarData } = useContext(
    DataContext
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [augmentation, setAugmentation] = useState("");
  const [foundElement, setFoundElement] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(()=>{
    // fetchData(DIST_CODE , augmny, setSubstationData, setLoading, navigate);
    const handleApiRequest = () => {
      setLoading(true);
      axios.get(`${apiUrl}/api/SubStation/GetSubStationData?dist_code=${DIST_CODE}&augmny=${augmny}`)
      .then((response) => {
        console.log("API Response:", response); // Log full response
        console.log("Substation Data 2:", response.data);
        if (response.data && response.data.length > 0) {
          setSubstationData(response.data);
        } else {
          console.log("No data received");
        }
      })
      .catch((error) => console.log("API Error:", error));
    
    };
  handleApiRequest();
    setLoading(true);
    axios.get(
      `${apiUrl}/api/SubStation/GetRemainingSolarCapacitySubstationsData?dist_code=${DIST_CODE}&augmny=${augmny}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      // Check if response status is 200
      if (response.status === 200) {
        // Data is now available here
        console.log("Remaining Data>>>", response.data);
         setRemainingSolarData(response.data);
         setLoading(false);
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(()=>{
      setLoading(false);
    })

  },[]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${apiUrl}/api/GetAllDistrictSummary`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
          const foundedEle = (data && data.find((ele) => ele.DIST_CODE === substationData.SubStationWiseData[0].DIST_CODE));
          setFoundElement(foundedEle);
          console.log(response.data)
          console.log(foundedEle)
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
 
 const handleDistrictChange = (e) =>{
 const districtCode = e.target.value;
 setSelectedDistrict(districtCode);
 DIST_CODE =selectedDistrict;
 fetchData(districtCode, augmny, setSubstationData, setLoading, navigate);
 }
 const handleAugmentationChange = (e) =>{
  const augmentationValue = e.target.value;
  setAugmentation(augmentationValue);
  augmny = augmentation;
  fetchData(selectedDistrict, augmentationValue, setSubstationData, setLoading, navigate);
 }

 const handleViewDetails = () =>{
  console.log("dfg");
 }

 function getBackgroundClass(data) {
  const completed = parseInt(data.Completed);
  const inProgress = parseInt(data.InProgress);
  const yetToStart = parseInt(data.Yet_To_Start);

  // Check which status has the highest value
  if (completed > inProgress && completed > yetToStart) {
    return "completed-background";
  } else if (inProgress > completed && inProgress > yetToStart) {
    return "in-progress-background";
  } else if (yetToStart > completed && yetToStart > inProgress) {
    return "yet-to-start-background";
  } else {
    // In case of ties or all values being equal, you can handle it as you prefer
    return "default-background";
  }
}

  return (
    <>
         {loading ? (
           <Loader></Loader>
     ) : (
       <div className="mainContent">
        <div>
         <h1>District Summary</h1>
         <div
           style={{
             display: "flex",
             margin:"12px 0px",
             borderRadius:"20px",
             boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
             justifyContent: "space-between",
             padding: "30px 70px",
             backgroundColor:"var(--secondary)"
           }}
         >
           <div
             className="districtDropdown"
             style={{
               display: "flex",
               flexDirection: "column",
               gap: "5px",
               margin: "10px 0px",
             }}
           >
             <h3>Select District</h3>
             <select  onChange={handleDistrictChange}>
               {data ? (
                 Object.values(data).map((element, index) => (
                   <option  key={index} value={element.DIST_CODE} selected={ substationData &&
                     substationData.SubStationWiseData && substationData.SubStationWiseData.length > 0  ? ( element.DIST_CODE === substationData.SubStationWiseData[0].DIST_CODE) : (element.DIST_CODE)}>
                     {element.DIST_NAME}
                   </option>
                 ))
               ) : (
                 <option>Data Not Found</option>
               )}
             </select>
           </div>
           {
             foundElement ? (
               <div>
                 <BasicBars prop1={foundElement.TotalSubStation} prop2={foundElement.TotalSolarCapacity}></BasicBars>
               </div>
             ) : (
               <Loader></Loader>
             )
           }
           <div
             className="augmentationDropdown"
             style={{
               display: "flex",
               flexDirection: "column",
               gap: "5px",
               margin: "10px 0px",
             }}
           >
             <h3>Augmentation Yes/No</h3>
             <select value={augmentation} onChange={handleAugmentationChange} placeholder="Select District">
               <option value="N">No</option>
               <option value="Y">Yes</option>
             </select>
           </div>
         </div>
         {substationData && remainingSolarData && 
         substationData.SubStationWiseData && remainingSolarData.SubStationWiseData &&
         substationData.SubStationWiseData.length > 0 && remainingSolarData.SubStationWiseData.length > 0  ? (
           <>
           <div className="firstPieCharts">
             <div className={`pieCard ${getBackgroundClass(substationData.SubStationWiseData[0])}`}>
             {
               ((parseInt(substationData.SubStationWiseData[0].Completed) <= 0) && (parseInt(substationData.SubStationWiseData[0].InProgress) <= 0) && (parseInt(substationData.SubStationWiseData[0].Yet_To_Start) <= 0)) ? 
              <>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"15px 0px 25px"}}><div style={{ display:"grid", placeItems:"center",width:"160px", height:"160px", border:"0px solid darkgray", borderRadius:"50%", backgroundColor:"gray"}}><div style={{display:"grid", placeItems:"center",width:"80px", height:"80px", backgroundColor:"white", zIndex:"1", borderRadius:"50%", textAlign:"center", fontWeight:"700"}}>No Data</div></div></div> 
              <div className="labels">
                 <div>
                   <p className="pieCardText">No Data</p>
                   <p className="Color gray"></p>
                 </div>
               </div>
              </>
              :
              <>
               <MyChart
               prop1={(substationData.SubStationWiseData[0].Completed)}
               prop2={(substationData.SubStationWiseData[0].InProgress)}
               prop3={(substationData.SubStationWiseData[0].Yet_To_Start)}
               Dist_Code = {DIST_CODE}
               ></MyChart>
               <div className="labels">
                 <div>
                   <p className="pieCardText">Completed</p>
                   <p className="Color green"></p>
                 </div>
                 <div>
                   <p className="pieCardText">In Progress</p>
                   <p className="Color yellow"></p>
                 </div>
                 <div>
                   <p className="pieCardText">Yet to Start</p>
                   <p className="Color red"></p>
                 </div>
               </div>
              </>
              }
               <h4>Substation Status</h4>
             </div>
             <div className={`pieCard ${getBackgroundClass(substationData.SubStationWiseData[1])}`}>
               
             {
               ((parseInt(substationData.SubStationWiseData[1].Completed) <= 0) && (parseInt(substationData.SubStationWiseData[1].InProgress) <= 0) && (parseInt(substationData.SubStationWiseData[1].Yet_To_Start) <= 0)) ? 
              <>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"15px 0px 25px"}}><div style={{ display:"grid", placeItems:"center",width:"160px", height:"160px", border:"0px solid darkgray", borderRadius:"50%", backgroundColor:"gray"}}><div style={{display:"grid", placeItems:"center",width:"80px", height:"80px", backgroundColor:"white", zIndex:"1", borderRadius:"50%", textAlign:"center", fontWeight:"700"}}>No Data</div></div></div> 
              <div className="labels">
                 <div>
                   <p className="pieCardText">No Data</p>
                   <p className="Color gray"></p>
                 </div>
               </div>
              </>
              :
              <>
               <MyChart
               prop1={(substationData.SubStationWiseData[1].Completed)}
               prop2={(substationData.SubStationWiseData[1].InProgress)}
               prop3={(substationData.SubStationWiseData[1].Yet_To_Start)}
               Dist_Code = {DIST_CODE}
               ></MyChart>
               <div className="labels">
                 <div>
                   <p className="pieCardText">Completed</p>
                   <p className="Color green"></p>
                 </div>
                 <div>
                   <p className="pieCardText">In Progress</p>
                   <p className="Color yellow"></p>
                 </div>
                 <div>
                   <p className="pieCardText">Yet to Start</p>
                   <p className="Color red"></p>
                 </div>
               </div>
              </>
              }
               <h4>Solar Capacity (in MW)</h4>
             </div>
             <div className={`pieCard ${getBackgroundClass(substationData.SubStationWiseData[2])}`}>
               
             {
               ((parseInt(substationData.SubStationWiseData[2].Completed) <= 0) && (parseInt(substationData.SubStationWiseData[2].InProgress) <= 0) && (parseInt(substationData.SubStationWiseData[2].Yet_To_Start) <= 0)) ? 
              <>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"15px 0px 25px"}}><div style={{ display:"grid", placeItems:"center",width:"160px", height:"160px", border:"0px solid darkgray", borderRadius:"50%", backgroundColor:"gray"}}><div style={{display:"grid", placeItems:"center",width:"80px", height:"80px", backgroundColor:"white", zIndex:"1", borderRadius:"50%", textAlign:"center", fontWeight:"700"}}>No Data</div></div></div> 
              <div className="labels">
                 <div>
                   <p className="pieCardText">No Data</p>
                   <p className="Color gray"></p>
                 </div>
               </div>
              </>
              :
              <>
               <MyChart2
               prop1={(substationData.SubStationWiseData[2].Completed)}
               prop2={(substationData.SubStationWiseData[2].InProgress)}
               prop3={(substationData.SubStationWiseData[2].Yet_To_Start)}
               Dist_Code = {DIST_CODE}
               ></MyChart2>
               <div className="labels">
                 <div>
                   <p className="pieCardText">Completed</p>
                   <p className="Color green"></p>
                 </div>
                 <div>
                   <p className="pieCardText">In Progress</p>
                   <p className="Color yellow"></p>
                 </div>
                 <div>
                   <p className="pieCardText">Yet to Start</p>
                   <p className="Color red"></p>
                 </div>
               </div>
              </>
              }
               <h4>{augmentation === "N" ? "Substations without Augmentation" : "Substations with Augmentation"}</h4>
             </div>
             <div className={`pieCard ${getBackgroundClass(substationData.SubStationWiseData[3])}`}>
             
             {
               ((parseInt(substationData.SubStationWiseData[3].Completed) <= 0) && (parseInt(substationData.SubStationWiseData[3].InProgress) <= 0) && (parseInt(substationData.SubStationWiseData[3].Yet_To_Start) <= 0)) ? 
              <>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"15px 0px 25px"}}><div style={{ display:"grid", placeItems:"center",width:"160px", height:"160px", border:"0px solid darkgray", borderRadius:"50%", backgroundColor:"gray"}}><div style={{display:"grid", placeItems:"center",width:"80px", height:"80px", backgroundColor:"white", zIndex:"1", borderRadius:"50%", textAlign:"center", fontWeight:"700"}}>No Data</div></div></div> 
              <div className="labels">
                 <div>
                   <p className="pieCardText">No Data</p>
                   <p className="Color gray"></p>
                 </div>
               </div>
              </>
              :
              <>
               <MyChart2
               prop1={(substationData.SubStationWiseData[3].Completed)}
               prop2={(substationData.SubStationWiseData[3].InProgress)}
               prop3={(substationData.SubStationWiseData[3].Yet_To_Start)}
               Dist_Code = {DIST_CODE}
               ></MyChart2>
               <div className="labels">
                 <div>
                   <p className="pieCardText">Completed</p>
                   <p className="Color green"></p>
                 </div>
                 <div>
                   <p className="pieCardText">In Progress</p>
                   <p className="Color yellow"></p>
                 </div>
                 <div>
                   <p className="pieCardText">Yet to Start</p>
                   <p className="Color red"></p>
                 </div>
               </div>
              </>
              }
               <h4> {augmentation === "N" ? "S/S Solar Capacity (in MW) without Augmentation" : "S/S Solar Capacity (in MW) with Augmentation"} </h4>
             </div>
           </div>
           <div style={{width:"100%",display:"flex", justifyContent:"flex-end", alignItems:"center", margin:"8px 0", paddingRight:"15px"}}>
             {/* <button onClick={handleViewDetails} >View Details</button> */}
           </div>
           <div style={{display:"flex",justifyContent:"center", alignItems:"center", gap:"32px", margin:"5px", paddingBottom:"10px"}}>
           <div className="pieChartsTable" >
             <table>
               <thead>
                 <tr>
                   <th className="firstTh"></th>
                   <th>Total Substation</th>
                   <th>Completed</th>
                   <th>In Progress</th>
                   <th className="lastTh">Yet To Start</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>Substation Count</td>
                   <td>{substationData.SubStationWiseData[0].TotalSubStation}</td>
                   <td>{substationData.SubStationWiseData[0].Completed}</td>
                   <td>{substationData.SubStationWiseData[0].InProgress}</td>
                   <td>{substationData.SubStationWiseData[0].Yet_To_Start}</td>
                 </tr>
                 <tr>
                   <td className="firstTd">Solar Capacity</td>
                 <td>{substationData.SubStationWiseData[1].TotalSubStation}</td>
                 <td>{substationData.SubStationWiseData[1].TotalSubStation}</td>
                 <td>{substationData.SubStationWiseData[1].TotalSubStation}</td>
                 <td className="lastTd">{substationData.SubStationWiseData[1].TotalSubStation}</td>
                 </tr>
               </tbody>
             </table>
           </div>
           <div style={{width:"2px", height:"160px", backgroundColor:"lightgray"}}></div>
           <div className="pieChartsTable" >
             <table>
               <thead>
                 <tr>
                   <th className="firstTh"></th>
                   <th>Total Substation</th>
                   <th>Completed</th>
                   <th>In Progress</th>
                   <th className="lastTh">Yet To Start</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td >Substations Count</td>
                   <td>{substationData.SubStationWiseData[2].TotalSubStation}</td>
                   <td>{substationData.SubStationWiseData[2].Completed}</td>
                   <td>{substationData.SubStationWiseData[2].InProgress}</td>
                   <td >{substationData.SubStationWiseData[2].Yet_To_Start}</td>
                 </tr>
                 <tr>
                   <td className="firstTd">Solar Capacity</td>
                 <td>{substationData.SubStationWiseData[3].TotalSubStation}</td>
                 <td>{substationData.SubStationWiseData[3].TotalSubStation}</td>
                 <td>{substationData.SubStationWiseData[3].TotalSubStation}</td>
                 <td className="lastTd">{substationData.SubStationWiseData[3].TotalSubStation}</td>
                 </tr>
               </tbody>
             </table>
           </div>
           </div>
           <hr></hr>
           <div style={{paddingTop:"20px", display:"flex", flexDirection:"column", gap:"20px" , marginBottom:"20px"}}>
             <h2>Cluster(I) Level Status</h2>
             <div className="firstPieCharts">
             <div className={`pieCard ${getBackgroundClass(substationData.SubStationWiseData[4])}`}>
             {
               ((parseInt(substationData.SubStationWiseData[4].Completed) <= 0)) ? 
              <>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"15px 0px 25px"}}><div style={{ display:"grid", placeItems:"center",width:"160px", height:"160px", border:"0px solid darkgray", borderRadius:"50%", backgroundColor:"gray"}}><div style={{display:"grid", placeItems:"center",width:"80px", height:"80px", backgroundColor:"white", zIndex:"1", borderRadius:"50%", textAlign:"center", fontWeight:"700"}}>No Data</div></div></div> 
              <div className="labels">
                 <div>
                   <p className="pieCardText">No Data</p>
                   <p className="Color gray"></p>
                 </div>
               </div>
              </>
              :
              <>
               <MyChart3
               prop1={(substationData.SubStationWiseData[4].Completed)}
               prop2={(substationData.SubStationWiseData[4].InProgress)}
               prop3={(substationData.SubStationWiseData[4].Yet_To_Start)}
               Dist_Code = {DIST_CODE}
               ></MyChart3>
               <div className="labels">
                 <div>
                   <p className="pieCardText">Completed</p>
                   <p className="Color green"></p>
                 </div>
                 <div>
                   <p className="pieCardText">In Progress</p>
                   <p className="Color yellow"></p>
                 </div>
                 <div>
                   <p className="pieCardText">Yet to Start</p>
                   <p className="Color red"></p>
                 </div>
               </div>
              </>
              }
               <h4>SubStation Status</h4>
             </div>
             <div className={`pieCard ${getBackgroundClass(substationData.SubStationWiseData[5])}`}>
               
             {
               ((parseInt(substationData.SubStationWiseData[5].Completed) <= 0)) ? 
              <>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"15px 0px 25px"}}><div style={{ display:"grid", placeItems:"center",width:"160px", height:"160px", border:"0px solid darkgray", borderRadius:"50%", backgroundColor:"gray"}}><div style={{display:"grid", placeItems:"center",width:"80px", height:"80px", backgroundColor:"white", zIndex:"1", borderRadius:"50%", textAlign:"center", fontWeight:"700"}}>No Data</div></div></div> 
              <div className="labels">
                 <div>
                   <p className="pieCardText">No Data</p>
                   <p className="Color gray"></p>
                 </div>
               </div>
              </>
              :
              <>
               <MyChart3
               prop1={(substationData.SubStationWiseData[5].Completed)}
               prop2={(substationData.SubStationWiseData[5].InProgress)}
               prop3={(substationData.SubStationWiseData[5].Yet_To_Start)}
               Dist_Code = {DIST_CODE}
               ></MyChart3>
               <div className="labels">
                 <div>
                   <p className="pieCardText">Completed</p>
                   <p className="Color green"></p>
                 </div>
                 <div>
                   <p className="pieCardText">In Progress</p>
                   <p className="Color yellow"></p>
                 </div>
                 <div>
                   <p className="pieCardText">Yet to Start</p>
                   <p className="Color red"></p>
                 </div>
               </div>
              </>
              }
               <h4>Solar Capacity (MW)</h4>
             </div>
             <div className={`pieCard ${getBackgroundClass(substationData.SubStationWiseData[6])}`}>
             {
               ((parseInt(substationData.SubStationWiseData[6].Completed) <= 0)) ? 
              <>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"15px 0px 25px"}}><div style={{ display:"grid", placeItems:"center",width:"160px", height:"160px", border:"0px solid darkgray", borderRadius:"50%", backgroundColor:"gray"}}><div style={{display:"grid", placeItems:"center",width:"80px", height:"80px", backgroundColor:"white", zIndex:"1", borderRadius:"50%", textAlign:"center", fontWeight:"700"}}>No Data</div></div></div> 
              <div className="labels">
                 <div>
                   <p className="pieCardText">No Data</p>
                   <p className="Color gray"></p>
                 </div>
               </div>
              </>
              :
              <>
               <MyChart3
               prop1={(substationData.SubStationWiseData[6].Completed)}
               prop2={(substationData.SubStationWiseData[6].InProgress)}
               prop3={(substationData.SubStationWiseData[6].Yet_To_Start)}
               Dist_Code = {DIST_CODE}
               ></MyChart3>
               <div className="labels">
                 <div>
                   <p className="pieCardText">Completed</p>
                   <p className="Color green"></p>
                 </div>
                 <div>
                   <p className="pieCardText">In Progress</p>
                   <p className="Color yellow"></p>
                 </div>
                 <div>
                   <p className="pieCardText">Yet to Start</p>
                   <p className="Color red"></p>
                 </div>
               </div>
              </>
              }
               <h4>JM Land (in Acre)</h4>
             </div>
             </div>
           </div>
           <hr></hr>
           <div style={{paddingTop:"20px", display:"flex", flexDirection:"column", gap:"20px"}}>
             <h2>Remaining Solar Capacity</h2>
             <div className="firstPieCharts">
             <div className={`pieCard ${getBackgroundClass(remainingSolarData.SubStationWiseData[0])}`}>
             {
               ((parseInt(remainingSolarData.SubStationWiseData[0].Completed) <= 0) && (parseInt(remainingSolarData.SubStationWiseData[0].InProgress) <= 0) && (parseInt(remainingSolarData.SubStationWiseData[0].Yet_To_Start) <= 0)) ? 
              <>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"15px 0px 25px"}}><div style={{ display:"grid", placeItems:"center",width:"160px", height:"160px", border:"0px solid darkgray", borderRadius:"50%", backgroundColor:"gray"}}><div style={{display:"grid", placeItems:"center",width:"80px", height:"80px", backgroundColor:"white", zIndex:"1", borderRadius:"50%", textAlign:"center", fontWeight:"700"}}>No Data</div></div></div> 
              <div className="labels">
                 <div>
                   <p className="pieCardText">No Data</p>
                   <p className="Color gray"></p>
                 </div>
               </div>
              </>
              :
              <>
               <MyChart4
               prop1={(remainingSolarData.SubStationWiseData[0].Completed)}
               prop2={(remainingSolarData.SubStationWiseData[0].InProgress)}
               prop3={(remainingSolarData.SubStationWiseData[0].Yet_To_Start)}
               Dist_Code = {DIST_CODE}
               ></MyChart4>
               <div className="labels">
                 <div>
                   <p className="pieCardText">Completed</p>
                   <p className="Color green"></p>
                 </div>
                 <div>
                   <p className="pieCardText">In Progress</p>
                   <p className="Color yellow"></p>
                 </div>
                 <div>
                   <p className="pieCardText">Yet to Start</p>
                   <p className="Color red"></p>
                 </div>
               </div>
              </>
              }
               <h4>SubStation Status</h4>
             </div>
             <div className={`pieCard ${getBackgroundClass(remainingSolarData.SubStationWiseData[1])}`}>
             {
               ((parseInt(remainingSolarData.SubStationWiseData[1].Completed) <= 0) && (parseInt(remainingSolarData.SubStationWiseData[1].InProgress) <= 0) && (parseInt(remainingSolarData.SubStationWiseData[1].Yet_To_Start) <= 0)) ? 
              <>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"15px 0px 25px"}}><div style={{ display:"grid", placeItems:"center",width:"160px", height:"160px", border:"0px solid darkgray", borderRadius:"50%", backgroundColor:"gray"}}><div style={{display:"grid", placeItems:"center",width:"80px", height:"80px", backgroundColor:"white", zIndex:"1", borderRadius:"50%", textAlign:"center", fontWeight:"700"}}>No Data</div></div></div> 
              <div className="labels">
                 <div>
                   <p className="pieCardText">No Data</p>
                   <p className="Color gray"></p>
                 </div>
               </div>
              </>
              :
              <>
               <MyChart4
               prop1={(remainingSolarData.SubStationWiseData[1].Completed)}
               prop2={(remainingSolarData.SubStationWiseData[1].InProgress)}
               prop3={(remainingSolarData.SubStationWiseData[1].Yet_To_Start)}
               Dist_Code = {DIST_CODE}
               ></MyChart4>
               <div className="labels">
                 <div>
                   <p className="pieCardText">Completed</p>
                   <p className="Color green"></p>
                 </div>
                 <div>
                   <p className="pieCardText">In Progress</p>
                   <p className="Color yellow"></p>
                 </div>
                 <div>
                   <p className="pieCardText">Yet to Start</p>
                   <p className="Color red"></p>
                 </div>
               </div>
              </>
              }
               <h4>Solar Capacity (MW)</h4>
             </div>
             <div className={`pieCard ${getBackgroundClass(remainingSolarData.SubStationWiseData[2])}`}>
               
             {
               ((parseInt(remainingSolarData.SubStationWiseData[2].Completed) <= 0) && (parseInt(remainingSolarData.SubStationWiseData[2].InProgress) <= 0) && (parseInt(remainingSolarData.SubStationWiseData[2].Yet_To_Start) <= 0)) ? 
              <>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"15px 0px 25px"}}><div style={{ display:"grid", placeItems:"center",width:"160px", height:"160px", border:"0px solid darkgray", borderRadius:"50%", backgroundColor:"gray"}}><div style={{display:"grid", placeItems:"center",width:"80px", height:"80px", backgroundColor:"white", zIndex:"1", borderRadius:"50%", textAlign:"center", fontWeight:"700"}}>No Data</div></div></div> 
              <div className="labels">
                 <div>
                   <p className="pieCardText">No Data</p>
                   <p className="Color gray"></p>
                 </div>
               </div>
              </>
              :
              <>
               <MyChart4
               prop1={(remainingSolarData.SubStationWiseData[2].Completed)}
               prop2={(remainingSolarData.SubStationWiseData[2].InProgress)}
               prop3={(remainingSolarData.SubStationWiseData[2].Yet_To_Start)}
               Dist_Code = {DIST_CODE}
               ></MyChart4>
               <div className="labels">
                 <div>
                   <p className="pieCardText">Completed</p>
                   <p className="Color green"></p>
                 </div>
                 <div>
                   <p className="pieCardText">In Progress</p>
                   <p className="Color yellow"></p>
                 </div>
                 <div>
                   <p className="pieCardText">Yet to Start</p>
                   <p className="Color red"></p>
                 </div>
               </div>
              </>
              }
               <h4>{augmny === "N" ? "SubStations without Augmentation" : "SubStations with Augmentation"}  </h4>
             </div>
             <div className={`pieCard ${getBackgroundClass(remainingSolarData.SubStationWiseData[3])}`}>
              
             {
               ((parseInt(remainingSolarData.SubStationWiseData[3].Completed) <= 0) && (parseInt(remainingSolarData.SubStationWiseData[3].InProgress) <= 0) && (parseInt(remainingSolarData.SubStationWiseData[3].Yet_To_Start) <= 0)) ? 
              <>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"15px 0px 25px"}}><div style={{ display:"grid", placeItems:"center",width:"160px", height:"160px", border:"0px solid darkgray", borderRadius:"50%", backgroundColor:"gray"}}><div style={{display:"grid", placeItems:"center",width:"80px", height:"80px", backgroundColor:"white", zIndex:"1", borderRadius:"50%", textAlign:"center", fontWeight:"700"}}>No Data</div></div></div> 
              <div className="labels">
                 <div>
                   <p className="pieCardText">No Data</p>
                   <p className="Color gray"></p>
                 </div>
               </div>
              </>
              :
              <>
               <MyChart4
               prop1={(remainingSolarData.SubStationWiseData[3].Completed)}
               prop2={(remainingSolarData.SubStationWiseData[3].InProgress)}
               prop3={(remainingSolarData.SubStationWiseData[3].Yet_To_Start)}
               Dist_Code = {DIST_CODE}
               ></MyChart4>
               <div className="labels">
                 <div>
                   <p className="pieCardText">Completed</p>
                   <p className="Color green"></p>
                 </div>
                 <div>
                   <p className="pieCardText">In Progress</p>
                   <p className="Color yellow"></p>
                 </div>
                 <div>
                   <p className="pieCardText">Yet to Start</p>
                   <p className="Color red"></p>
                 </div>
               </div>
              </>
              }
               <h4>{augmny === "N" ? "S/S Solar Capacity (MW) without Augmentation" : "S/S Solar Capacity (MW) with Augmentation"}</h4>
             </div>
             </div>
             <div style={{width:"100%",display:"flex", justifyContent:"flex-end", alignItems:"center", paddingRight:"15px"}}>
             <button onClick={handleViewDetails} >Back</button>
           </div>
           </div>
           </>
         ) : (
           <Loader></Loader>
         )}
       </div>
         </div>
     )}
    </>
  );
};

export default SubstationStatus;
