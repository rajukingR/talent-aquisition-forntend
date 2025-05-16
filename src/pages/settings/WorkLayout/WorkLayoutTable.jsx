import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import DynamicTable from "../../../components/table-format/DynamicTable";

export const WorkLayoutTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: "id", label: "No." },
    { id: "work_layout", label: "Work Layout" },
    { id: "description", label: "Description" },
  ];

  useEffect(() => {
    const fetchWorkLayouts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/work-layouts");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching work layouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkLayouts();
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Work Layouts
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <DynamicTable columns={columns} data={data} />
      )}
    </>
  );
};
