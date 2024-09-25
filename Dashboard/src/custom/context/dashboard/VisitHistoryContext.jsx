// const { createContext, useEffect, useState } = require("react");

import { URL } from "@base";
import axios from "axios";
import { createContext, useEffect, useState } from "react";


const VisitHistoryContext = createContext();

const VisitHistoryProvider = (props) => {
    const [visitHistoryData, setvisitHistoryData] = useState()
  const fetchVisitHistory = async () => {
    try {
      const response = await axios.get(`${URL}/api/admin/getStatusCounts`);
      console.log("API Response:", response.data); // Log the response
      setvisitHistoryData(response.data);
    } catch (error) {
      console.error("Error fetching visitHistoryData data:", error);
    }
  };

  useEffect(() => {
    fetchVisitHistory();
  },[]);

  return <VisitHistoryContext.Provider value={{visitHistoryData}}>{props.children}</VisitHistoryContext.Provider>;
};


export { VisitHistoryProvider , VisitHistoryContext }