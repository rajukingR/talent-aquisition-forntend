import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import API_URL from "../../api/Api_url";
import DynamicTable from "../../components/table-format/DynamicTable";

const ResumeBankTable = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/resume-bank`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedResumes = response.data.map((resume, index) => ({
          serial: index + 1,
          id: resume.id,
          candidate_id: resume.candidate_id,
          full_name: `${resume.first_name} ${resume.last_name}`,
          email: resume.email,
          phone: resume.phone_number || "N/A",
          address: resume.address ? JSON.stringify(resume.address) : "N/A",
          source: resume.source || "N/A",
          status: resume.status || "N/A",
          job_title: resume.job_title || "N/A",
          resume_file: resume.resume_file || "N/A",
          total_experience: resume.total_experience
            ? `${resume.total_experience} years`
            : "N/A",
        }));

        setResumes(formattedResumes);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  const columns = [
    { id: "serial", label: "No." },
    { id: "full_name", label: "Candidate Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone Number" },
    { id: "job_title", label: "Job Title" },
    { id: "total_experience", label: "Experience" },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Resume Bank
      </Typography>

      <DynamicTable columns={columns} data={resumes} />
    </>
  );
};

export default ResumeBankTable;
