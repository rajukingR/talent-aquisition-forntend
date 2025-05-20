import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";
import axios from "axios";

export const OverallStatusTable = () => {
  const [data, setData] = useState([]);

  const columns = [
    { id: "id", label: "No." },
    { id: "overall_status", label: "Overall Status" },
    { id: "description", label: "Description" },
  ];

 useEffect(() => {
  const fetchOverallStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/overall-status");

      const formattedOverallStatus = response.data.map((statusItem, index) => ({
        serial: index + 1,
        id: statusItem.id,
        overall_status: statusItem.overall_status, // Update field name as per API
        description: statusItem.description,
        status: statusItem.active_status ? "Active" : "Inactive", // Assumes active_status is boolean
      }));

      setData(formattedOverallStatus);
    } catch (error) {
      console.error("Error fetching overall status data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchOverallStatus();
}, []);


  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Overall Status List
      </Typography>
      <DynamicTable columns={columns} data={data} />
    </>
  );
};
