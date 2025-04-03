import React , {useState} from 'react';
import DataContext from './DataContext';



const DataProvider = ({children}) => {
    const [data , setData] = useState();
    const [substationData, setSubstationData] = useState();
    const [remainingSolarData, setRemainingSolarData] = useState();
    const [substationstatusdata, setSubstationstatusdata] = useState([]);
    const [clusterSummaryData, setClusterSummaryData] = useState([]);
  return (
    <DataContext.Provider value = {{
        data , setData , substationData, setSubstationData, remainingSolarData, setRemainingSolarData , substationstatusdata,clusterSummaryData, setSubstationstatusdata, setClusterSummaryData}}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider;