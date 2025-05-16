import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import DynamicTable from "../../../components/table-format/DynamicTable";

export const JobTitleTable = () => {
  const [rows, setRows] = useState([]);

  const columns = [
    { id: "id", label: "No." },
    { id: "job_title", label: "Job Title" },
    { id: "department", label: "Department" }, // optional if your API includes this
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/job-title/");
        setRows(res.data); // assuming response is an array of job titles
      } catch (err) {
        console.error("Failed to fetch job titles:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Job Titles
      </Typography>

      <DynamicTable columns={columns} data={rows} />
    </>
  );
};
