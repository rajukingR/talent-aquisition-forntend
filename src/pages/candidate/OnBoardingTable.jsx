import React from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../components/table-format/DynamicTable";

const OnBoardingTable = () => {
  const columns = [
    { id: "id", label: "No." },
    { id: "employee_name", label: "Employee Name" },
    { id: "position", label: "Position" },
    { id: "joining_date", label: "Joining Date" },
    { id: "status", label: "Status" },
  ];

  const data = [
    { id: 1, employee_name: "Mark Johnson", position: "UI Designer", joining_date: "2023-08-15", status: "Completed" },
    { id: 2, employee_name: "Sara Wilson", position: "Backend Developer", joining_date: "2023-09-01", status: "In Progress" },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        OnBoarding List
      </Typography>
      <DynamicTable columns={columns} data={data} />
    </>
  );
};

export default OnBoardingTable;
