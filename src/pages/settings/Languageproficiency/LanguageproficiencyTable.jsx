import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import DynamicTable from "../../../components/table-format/DynamicTable";

export const LanguageProficiencyTable = () => {
  const columns = [
    { id: "id", label: "No." },
    { id: "language", label: "Language" },
    { id: "proficiency_level", label: "Proficiency Level" },
    { id: "description", label: "Description" }, // ✅ Added description column
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/language-proficiency");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching language proficiency data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Language Proficiency
      </Typography>

      <DynamicTable columns={columns} data={data} />
    </>
  );
};
