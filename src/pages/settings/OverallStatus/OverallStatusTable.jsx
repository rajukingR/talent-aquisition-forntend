import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";
import axios from "axios";

export const OverallStatusTable = () => {
  const [data, setData] = useState([]);

  const columns = [
    { id: "id", label: "No." },
    { id: "overall_status", label: "Overall Status" },
    { id: "description", label: "Description" },
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/api/overall-status")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching overall status data:", error));
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Overall Status List
      </Typography>
      <DynamicTable columns={columns} data={data} />
    </>
  );
};
