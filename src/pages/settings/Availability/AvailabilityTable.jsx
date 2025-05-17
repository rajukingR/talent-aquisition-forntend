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
    axios
      .get(`${API_URL}/availability-status`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch availability status:", err);
        setLoading(false);
      });
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
