import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";

export const InterviewNameTable = () => {
  const [interviewNames, setInterviewNames] = useState([]);

  useEffect(() => {
    const fetchInterviewNames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/interview-names");
        const data = await response.json();
        setInterviewNames(data); // Set fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInterviewNames();
  }, []);

  const columns = [
    { id: "sl_no", label: "Sl No." },
    { id: "interview_name", label: "Interview Name" },
    { id: "description", label: "Description" },
  ];

  // Map data with generated serial numbers
  const formattedData = interviewNames.map((item, index) => ({
    ...item,
    sl_no: index + 1, // Auto-generate Sl No. starting from 1
  }));

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Interview List
      </Typography>
      <DynamicTable columns={columns} data={formattedData} />
    </>
  );
};
