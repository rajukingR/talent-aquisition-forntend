import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import API_URL from "../../../api/Api_url";
import DynamicTable from "../../../components/table-format/DynamicTable";

const QuotationTable = () => {
  const [quotationDetails, setQuotationDetails] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuotationDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/quotations-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedData = response.data.map((quotation, index) => ({
          serial: index + 1,
          id: quotation.id,
          client_company: quotation.client_company,
          client_name: quotation.client_name,
          phone_number: quotation.phone_number,
          email: quotation.email,
          project_type: quotation.project_type,
          
        }));

        setQuotationDetails(formattedData);
      } catch (error) {
        console.error("Error fetching quotation details:", error);
      }
    };

    fetchQuotationDetails();
  }, []);

  const columns = [
    { id: "serial", label: "No." },

    { id: "client_company", label: "Client Company" },
    { id: "client_name", label: "Client Name" },
    { id: "phone_number", label: "Phone Number" },
    { id: "email", label: "Email" },
    { id: "project_type", label: "Project Type" },
   
  ];

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Quotation Details List
      </Typography>

      <DynamicTable columns={columns} data={quotationDetails} />
    </>
  );
};

export default QuotationTable;