import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import DynamicTable from "../../../components/table-format/DynamicTable";

export const IndustryTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: "id", label: "No." },
    { id: "industry_name", label: "Industry" },
    { id: "description", label: "Description" }, // you can change to 'sector' if needed
  ];

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/industries");
        setRows(res.data); // assuming it's an array of industries
      } catch (err) {
        console.error("Failed to fetch industries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  if (loading) {
    return <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>Loading...</Typography>;
  }

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Industry Sectors
      </Typography>

      <DynamicTable columns={columns} data={rows} />
    </>
  );
};
