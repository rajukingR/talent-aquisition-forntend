import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import DynamicTable from "../../../components/table-format/DynamicTable";

export const CandidateStatusTable = () => {
  const columns = [
    { id: "id", label: "No." },
    { id: "status", label: "Status" },
    { id: "description", label: "Description" },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCandidateStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/candidate-status");
        setData(response.data); // Make sure your backend returns an array
      } catch (error) {
        console.error("Error fetching candidate status:", error);
      }
    };

    fetchCandidateStatus();
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Candidate Status
      </Typography>
      <DynamicTable columns={columns} data={data} />
    </>
  );
};
