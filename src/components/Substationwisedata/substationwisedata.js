import React, { useContext, useState } from 'react'
import DataContext from '../context/DataContext';
import Loader from '../Common/Loader/loader';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import all functions and objects from xlsx library
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

const Substationwisedata = () => {
  
  const {substationstatusdata} = useContext(DataContext);
  const {status} = useParams();
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // You can change the number of items per page here

  const handleExportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ['SUBSTATION NO', 'SUBSTATION NAME', 'SOLAR CAPACITY (MW)', 'LAND REQUIRED (In Acre)', 'USEFUL LAND (In Acre)', 'REMARKS', 'Application No', 'Land Type', 'Land Owner', 'Land Survey No', 'Taluka', 'Village', 'Land Area (in acre)', 'JM Land Area (in acre)', 'Proposal Send to Collector']
    ]);
  
    substationstatusdata.SubStationWiseData.forEach((element) => {
      const outerRowData = [
        element.SUBSTATION_NO,
        element.SUBSTATION_NAME,
        element.SOLAR_CAPACITY_MW,
        element.LAND_REQUIRED_IN_ACRE,
        element.USEFUL_LAND,
        element.SubStation_Status
      ];
      XLSX.utils.sheet_add_aoa(ws, [outerRowData], { origin: -1 });
  
      if (element.landClearancesList && element.landClearancesList.length > 0) {
        element.landClearancesList.forEach((ele) => {
          const innerRowData = [
            '',
            '',
            '',
            '',
            '',
            '',
            ele.APPLICATION_NO,
            ele.Land_Type,
            ele.Land_Owner,
            ele.Survey_No,
            ele.Taluka,
            ele.Village,
            ele.LAND_AREA_IN_ACRE,
            ele.JM_LAND_AREA,
            ele.Proposal_To_Collector
          ];
          XLSX.utils.sheet_add_aoa(ws, [innerRowData], { origin: -1 });
        });
      }
    });
  
    XLSX.utils.book_append_sheet(wb, ws, 'Substation Data');
    XLSX.writeFile(wb, 'tablexls.xlsx');
  };
  
  
  const handleLandClearancesList = (index) =>{
    if (expandedRow === index) {
      // If the clicked row is already expanded, collapse it
      setExpandedRow(null);
    } else {
      // If the clicked row is not expanded, expand it
      setExpandedRow(index);
    }
    }

     // Calculate indexes for pagination
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentItems = substationstatusdata && substationstatusdata.SubStationWiseData
     ? substationstatusdata.SubStationWiseData.slice(indexOfFirstItem, indexOfLastItem)
     : []; 
     // Change page
     const goToPage = (pageNumber) => setCurrentPage(pageNumber);
 
     // Next page
     const goToNextPage = () => {
         if (currentPage < Math.ceil(substationstatusdata.SubStationWiseData.length / itemsPerPage)) {
             setCurrentPage(currentPage + 1);
         }
     };
 
     // Previous page
     const goToPreviousPage = () => {
         if (currentPage > 1) {
             setCurrentPage(currentPage - 1);
         }
     };
  return (
   
    <>
              {
                substationstatusdata && substationstatusdata.SubStationWiseData ? 
                (
            <div className='mainContent'>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" , padding:"0 10px;", marginBottom:"5px"}}>
                <h2 style={{marginBottom:"10px"}}>Substation List within {status}</h2>
                <button className="download-table-xls-button" onClick={handleExportToExcel}>Download as XLS</button>
              </div>
                  <div className="districtTable">
                  <table className="responsive-table" id='tableToExcel'>
                      <thead>
                          <tr>
                              <th className='firstTh' style={{width:"50px", textAlign:"center"}}></th>
                              <th>SUBSTATION NO</th>
                              <th>SUBSTATION NAME</th>
                              <th>SOLAR CAPACITY (MW)</th>
                              <th>LAND REQUIRED (In Acre)</th>
                              <th>USEFUL LAND (In Acre)</th>
                              <th className='lastTh'>REMARKS</th>
                             
                          </tr>
                      </thead>
                      <tbody>
                          { 
                              currentItems.map((element, index) => (
                                <React.Fragment key={index}>
                                  <tr>
                                      <td style={{textAlign:"center", fontSize:"16px"}} onClick={()=>handleLandClearancesList(index)}><p style={{fontWeight:"700", cursor:"pointer"}}>{expandedRow === index ? '-' : '+'}</p></td>    
                                      <td>{element.SUBSTATION_NO}</td>
                                      <td>{element.SUBSTATION_NAME}</td>
                                      <td>{element.SOLAR_CAPACITY_MW}</td>
                                      <td>{element.LAND_REQUIRED_IN_ACRE}</td>
                                      <td>{element.USEFUL_LAND}</td>
                                      <td
                                      style={{
                                        textAlign:"center",
                                        backgroundColor:
                                            element.SubStation_Status === 'In Progress'
                                                ? '#FFD142'
                                                : element.SubStation_Status === 'Completed'
                                                ? '#3cb371'
                                                : element.SubStation_Status === 'Yet To Start'
                                                ? '#FF4255'
                                                : '',
                                                color:'#FFFFFF'
                                    }}
                                      >{element.SubStation_Status}</td>
                                      
                                  </tr>
                                  {expandedRow === index && (
                                    (element.landClearancesList && element.landClearancesList.length > 0)
                                    ?
                                    <>
                                    <tr className={`collapsible-row ${expandedRow === index ? 'open' : ''}`}>
                                      <td colSpan={9}>
                                      <table>
                                        <thead>
                                    <tr key={`extra_${index}`}>
                                      <th className='firstTh'>Application No</th>
                                      <th>Land Type</th>
                                      <th>Land Owner</th>
                                      <th>Land Survey No</th>
                                      <th>Taluka</th>
                                      <th>Village</th>
                                      <th>Land Area (in acre)</th>
                                      <th>JM Land Area (in acre)</th>
                                      <th className='lastTh'>Proposal Send to Collector</th>
                                    </tr>
                                        </thead>
                                        <tbody>
                                    {
                                      element.landClearancesList.map((ele, ind) => (
                                    <tr key={ind}>
                                      <td>{ele.APPLICATION_NO}</td>
                                      <td>{ele.Land_Type}</td>
                                      <td>{ele.Land_Owner}</td>
                                      <td>{ele.Survey_No}</td>
                                      <td>{ele.Taluka}</td>
                                      <td>{ele.Village}</td>
                                      <td>{ele.LAND_AREA_IN_ACRE}</td>
                                      <td>{ele.JM_LAND_AREA}</td>
                                      <td>{ele.Proposal_To_Collector}</td>
                                    </tr>
                                      ))
                                    }
                                        </tbody>
                                      </table>
                                      </td>
                                    </tr>
                                    </>
                                    :
                                    <>
                                    {/* <tr>
                                      <td colSpan={9}>
                                      <table>
                                        <thead>
                                    <tr key={`extra_${index}`}>
                                      <th>Application No</th>
                                      <th>Land Type</th>
                                      <th>Land Owner</th>
                                      <th>Land Survey No</th>
                                      <th>Taluka</th>
                                      <th>Village</th>
                                      <th>Land Acre (in acre)</th>
                                      <th>JM Land Area (in acre)</th>
                                      <th>Proposal Send to Collector</th>
                                    </tr>
                                        </thead>
                                      </table>
                                      </td>
                                    </tr> */}
                                    <tr>
                                    <td colSpan="9" style={{fontWeight:"700", textAlign:"center"}}>No land clearances data available</td>
                                    </tr>
                                    </>
                                  )}
                                  </React.Fragment>
                              ))
                            }
                      </tbody>
                  </table>
                </div>
              <div style={{width:"100%",display:"flex", justifyContent:"flex-end", alignItems:"center", margin:"8px 0"}}>
                 <div className='pagination'>
                            <GoChevronLeft className='paginationArrows' onClick={() => goToPreviousPage()}/>
                            <span className='paginationPage'>{currentPage}</span>
                            <GoChevronRight className='paginationArrows' onClick={() => goToNextPage()}/>
                        </div>
              <button >Back</button>
              </div>
           
            </div>
            ) :
            (
              <Loader></Loader>
            )
          }
    </>
  )
}

export default Substationwisedata;