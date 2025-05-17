import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import DynamicTable from "../../../components/table-format/DynamicTable";

export const BenchStatusTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: "id", label: "No." },
    { id: "employee_name", label: "Employee Name" },
    { id: "status", label: "Status" },
    { id: "description", label: "Description" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bench-status");
        setData(res.data); // assuming response is an array of objects
      } catch (error) {
        console.error("Failed to fetch bench status", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Bench Status
      </Typography>
      <DynamicTable columns={columns} data={data} />
    </>
  );
};
