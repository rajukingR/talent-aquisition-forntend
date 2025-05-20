import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";
import axios from "axios";
import API_URL from "../../../api/Api_url";

export const AvailabilityTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: "id", label: "No." },
    { id: "availability_status", label: "Availability Status" },
    { id: "description", label: "Description" },
  ];

 useEffect(() => {
  const fetchAvailabilityStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/availability-status`);

      const formattedAvailability = response.data.map((statusItem, index) => ({
        serial: index + 1,
        id: statusItem.id,
        availability_status: statusItem.availability_status, // Update field as per your API
        description: statusItem.description,
        status: statusItem.active_status ? "Active" : "Inactive", // Assumes active_status is boolean
      }));

      setData(formattedAvailability);
    } catch (error) {
      console.error("Failed to fetch availability status:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAvailabilityStatus();
}, []);


  return (
    <div>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Availability Table
      </Typography>
      {loading ? <CircularProgress /> : <DynamicTable columns={columns} data={data} />}
    </div>
  );
};
