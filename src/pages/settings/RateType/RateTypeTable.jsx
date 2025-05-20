import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";
import axios from "axios";

export const RateTypeTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: "id", label: "No." },
    { id: "rate_type", label: "Rate Type" }, 
    { id: "description", label: "Description" }, 
  ];
  
  
 useEffect(() => {
  const fetchRateTypes = async () =>{
    try {
      const response = await axios.get("http://localhost:5000/api/rate-types");

      const formattedRateTypes = response.data.map((rateType, index) => ({
        serial: index + 1,
        id: rateType.id,
        rate_type: rateType.rate_type, 
        description: rateType.description,
        status: rateType.active_status ? "Active" : "Inactive", 
      }));

      setData(formattedRateTypes);
    } catch (error) {
      console.error("Failed to fetch rate types:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchRateTypes();
}, []);


  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Rate Types
      </Typography>
      {loading ? <CircularProgress /> : <DynamicTable columns={columns} data={data} />}
    </>
  );
};
