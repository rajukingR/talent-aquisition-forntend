import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";
import axios from "axios";

export const InterviewStatusTable = () => {
  const [data, setData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/interview-statuses"); 
        setData(response.data);
      } catch (error) {
        console.error("Error fetching interview statuses", error);
      }
    };
    fetchData();
  }, []);

  // Define columns for the table
  const columns = [
    { id: "id", label: "No." },
    { id: "status_name", label: "Interview Status" },
    { id: "job_description", label: "Description" },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Interview Status
      </Typography>
      <DynamicTable columns={columns} data={data} />
    </>
  );
};
