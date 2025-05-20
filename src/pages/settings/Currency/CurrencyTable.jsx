import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";
import axios from "axios";

export const CurrencyTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: "id", label: "No." },
    { id: "currency_name", label: "Currency Type" },
    { id: "description", label: "Description" },
  ];

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/currency");
        
        const formattedCurrencies = response.data.map((currency, index) => ({
          serial: index + 1,
          id: currency.id,
          currency_name: currency.currency_name,
          description: currency.description,
          status: currency.active_status ? "Active" : "Inactive", // Assuming active_status exists
        }));

        setData(formattedCurrencies);
      } catch (error) {
        console.error("Failed to fetch currency data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencyData();
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Currency List
      </Typography>
      {loading ? <CircularProgress /> : <DynamicTable columns={columns} data={data} />}
    </>
  );
};