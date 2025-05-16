import React from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../components/table-format/DynamicTable";

const ResumeBankTable = () => {
  const columns = [
    { id: "id", label: "No." },
    { id: "candidate_name", label: "Candidate Name" },
    { id: "position", label: "Position" },
    { id: "experience", label: "Experience" },
    { id: "status", label: "Status" },
  ];

  const data = [
    { id: 1, candidate_name: "John Doe", position: "Software Engineer", experience: "3 years", status: "Available" },
    { id: 2, candidate_name: "Jane Smith", position: "Data Scientist", experience: "5 years", status: "Hired" },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Resume Bank
      </Typography>
      <DynamicTable columns={columns} data={data} />
    </>
  );
};

export default ResumeBankTable;
