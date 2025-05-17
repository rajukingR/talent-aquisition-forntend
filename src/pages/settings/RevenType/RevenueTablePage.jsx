import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";
import { Check } from "@mui/icons-material";
import axios from "axios";

export const RevenueTablePage = () => {
  const [data, setData] = useState([]);

  const columns = [
    { id: "id", label: "S1No." },
    { id: "revenue_model_name", label: "Revenue Model" },
    { id: "description", label: "Description" },
    {
      id: "active_status",
      label: "Status",
      format: (value) => value ? <Check color="success" /> : null
    }
  ];

  const fetchRevenueModels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/revenue-models/");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch revenue models", error);
    }
  };

  useEffect(() => {
    fetchRevenueModels();
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Revenue Models
      </Typography>

      <DynamicTable
        columns={columns}
        data={data}
        sx={{
          "& .MuiTableCell-root": {
            padding: "12px 16px"
          }
        }}
      />
    </>
  );
};