import React, { useEffect, useState } from "react";
import { Typography, Avatar, Box } from "@mui/material";
import axios from "axios";
import API_URL from "../../api/Api_url";
import DynamicTable from "../../components/table-format/DynamicTable";

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/candidate-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedCandidates = response.data.map((candidate, index) => ({
          serial: index + 1,
          id: candidate.id,
          candidate_id: candidate.candidate_id,
          full_name: (
            <Box display="flex" alignItems="center">
              <Avatar
                src={candidate.profile_picture || "https://via.placeholder.com/50"}
                alt={candidate.full_name}
                sx={{ width: 40, height: 40, mr: 1 }}
              />
              {`${candidate.first_name} ${candidate.last_name}`}
            </Box>
          ),
          email: candidate.email,
          phone: candidate.phone_number || "N/A",
          years_of_experience: candidate.years_of_experience
            ? `${candidate.years_of_experience} years`
            : "N/A",
        }));

        setCandidates(formattedCandidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const columns = [
    { id: "serial", label: "No." },
    { id: "full_name", label: "Candidate Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone Number" },
    { id: "years_of_experience", label: "Experience" },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Candidate Details
      </Typography>

      <DynamicTable columns={columns} data={candidates} />
    </>
  );
};

export default CandidateTable;
