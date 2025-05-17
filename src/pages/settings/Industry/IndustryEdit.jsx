import React, { useEffect, useState } from "react";
import { Typography, IconButton, Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import DynamicTable from "../../../components/table-format/DynamicTable";

export const IndustryEdit = () => {
  const [data, setData] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const columns = [
    { id: "id", label: "No." },
    { id: "industry_name", label: "Industry" },
    { id: "description", label: "Sector" },
    {
      id: "actions",
      label: "Actions",
      render: (row) => (
        <IconButton onClick={() => handleEdit(row.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  // Fetch industries on load
  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/industries");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching industries:", err);
      setSnackbar({
        open: true,
        message: "Failed to load industries",
        severity: "error",
      });
    }
  };

  const handleEdit = async (id) => {
    try {
      // Fetch specific industry
      const res = await axios.get(`http://localhost:5000/api/industries/${id}`);
      const industry = res.data;

      const updatedName = prompt("Edit Industry Name:", industry.industry_name);
      const updatedDesc = prompt("Edit Description:", industry.description);

      if (updatedName && updatedDesc) {
        await axios.put(`http://localhost:5000/api/industries/${id}`, {
          industry_name: updatedName,
          description: updatedDesc,
        });

        setSnackbar({
          open: true,
          message: "Industry updated successfully",
          severity: "success",
        });
        fetchIndustries(); // Refresh the table
      }
    } catch (err) {
      console.error("Error editing industry:", err);
      setSnackbar({
        open: true,
        message: "Failed to update industry",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Industry Sectors
      </Typography>

      <DynamicTable columns={columns} data={data} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};