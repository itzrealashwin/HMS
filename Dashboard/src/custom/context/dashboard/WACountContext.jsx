import axios from "axios";
import { URL } from "@base";
import { createContext, useEffect, useState } from "react";

const WACountContext = createContext();

const WACountProvider = ({ children }) => {
  const [WaData, setWaData] = useState([]);
  const [customRange, setCustomRange] = useState([]);
  const fetchWAData = async () => {
    try {
      const response = await axios.get(`${URL}/api/admin/getWeeklyCounts`);
      console.log("API Response:", response.data); // Log the response
      setWaData(response.data);
    } catch (error) {
      console.error("Error fetching WACount data:", error);
    }
  };

  const WACountByDate = async (date) => {
    try {
      const response = await axios.post(
        `${URL}/api/admin/getWeeklyCountsByDate`,
        { date },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);
      setCustomRange(response.data);
    } catch (error) {
      console.error("Error fetching WACount data:", error);
    }
  };

  useEffect(() => {
    fetchWAData();
  }, []);
  console.log(WaData);
  return (
    <WACountContext.Provider
      value={{ WaData, customRange, WACountByDate, fetchWAData }}
    >
      {children}
    </WACountContext.Provider>
  );
};

export { WACountProvider, WACountContext };
