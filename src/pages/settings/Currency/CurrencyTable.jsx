import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";
import axios from "axios";

export const CurrencyTable = () => {
  const [data, setData] = useState([]);

  const columns = [
    { id: "id", label: "No." },
    { id: "currency_name", label: "Currency Type" },
    { id: "description", label: "Description" },
  ];

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/currency");
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch currency data:", err);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Currency List
      </Typography>

      <DynamicTable columns={columns} data={data} />
    </>
  );
};
