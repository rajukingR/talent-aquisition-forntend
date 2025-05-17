import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import DynamicTable from "../../../components/table-format/DynamicTable";

export const SkillsTable = () => {
  const [data, setData] = useState([]);

  const columns = [
    { id: "id", label: "No." },
    { id: "skill", label: "Skill" },
    { id: "job_title", label: "Job Title" },
    { id: "job_description", label: "Job Description" },
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/skills-add");
        console.log("API Response:", response.data); // ← Check the structure here
  
        const formattedData = response.data.map((item, index) => ({
          id: index + 1,
          skill: item.skills?.join(", ") || "N/A",
          job_title: item.job_title || "N/A",
          job_description: item.job_description || "N/A",
        }));
  
        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };
  
    fetchSkills();
  }, []);
  

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Skills Overview
      </Typography>

      <DynamicTable columns={columns} data={data} />
    </>
  );
};
