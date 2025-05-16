import React, { useEffect, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import DynamicTable from "../../../components/table-format/DynamicTable";

export const IndustryEdit = () => {
  const [data, setData] = useState([]);

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

        fetchIndustries(); // Refresh the table
      }
    } catch (err) {
      console.error("Error editing industry:", err);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Industry Sectors
      </Typography>

      <DynamicTable columns={columns} data={data} />
    </>
  );
};
