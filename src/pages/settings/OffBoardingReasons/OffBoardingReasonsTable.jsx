import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";
import axios from "axios";

export const OffBoardingReasonsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: "ReasonID", label: "No." },
    { id: "ReasonName", label: "Reason" },
    { id: "Description", label: "Description" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/offboarding-reasons")
      .then((response) => {
        // Ensure the response.data matches the required structure
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch offboarding reasons:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Offboarding Reasons
      </Typography>
      {loading ? <CircularProgress /> : <DynamicTable columns={columns} data={data} />}
    </>
  );
};
