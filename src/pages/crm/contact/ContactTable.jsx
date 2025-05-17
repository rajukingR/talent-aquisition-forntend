import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";
import axios from "axios";
import API_URL from "../../../api/Api_url";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/client-contact-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedContacts = response.data.map((contact, index) => ({
          serial: index + 1,
          id: contact.id,
          client_id: contact.client_id,
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone_number: contact.phone_number,
          company_name: contact.company_name || "N/A",
          industry: contact.industry || "N/A",
          status: contact.active_status ? "Active" : "Inactive",
        }));

        setContacts(formattedContacts);
      } catch (error) {
        console.error("Error fetching client contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const columns = [
    { id: "serial", label: "No." },
    { id: "client_id", label: "Client ID" },
    { id: "first_name", label: "First Name" },
    { id: "last_name", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "phone_number", label: "Phone Number" },
    { id: "company_name", label: "Company Name" },
    { id: "industry", label: "Industry" },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Client Contacts List
      </Typography>

      <DynamicTable columns={columns} data={contacts} />
    </>
  );
};

export default ContactTable;

