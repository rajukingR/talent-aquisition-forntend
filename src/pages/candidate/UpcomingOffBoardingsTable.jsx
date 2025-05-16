import React from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../components/table-format/DynamicTable";

const UpcomingOffBoardingsTable = () => {
  const columns = [
    { id: "id", label: "No." },
    { id: "employee_name", label: "Employee Name" },
    { id: "position", label: "Position" },
    { id: "last_working_day", label: "Last Working Day" },
    { id: "status", label: "Status" },
  ];

  const data = [
    { id: 1, employee_name: "Kevin Lee", position: "Project Manager", last_working_day: "2023-09-30", status: "Pending" },
    { id: 2, employee_name: "Emma White", position: "HR Manager", last_working_day: "2023-10-05", status: "Approved" },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Upcoming OffBoardings
      </Typography>
      <DynamicTable columns={columns} data={data} />
    </>
  );
};

export default UpcomingOffBoardingsTable;
