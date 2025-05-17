import React from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";

const OrdersTable = () => {
  const columns = [
    { id: "order_id", label: "Order ID" },
    { id: "quotation_id", label: "Quotation ID"},
    { id: "job_description_id", label: "Job Description ID" },
    { id: "client_name", label: "Client Name" },
    { id: "email_address", label: "Email Address" },
    { id: "phone_number", label: "Phone Number" },
    { id: "executive", label: "Executive" },
    { 
      id: "move_to_next", 
      label: "Move to Next",
    },
  ];

  const data = [
    { 
      order_id: "ORD-001", 
      quotation_id: "QUOT-001", 
      job_description_id: "JOB-001", 
      client_name: "ABC Corp", 
      email_address: "abc@example.com", 
      phone_number: "123-456-7890", 
      executive: "John Doe",
      move_to_next: "", 
    },
    { 
      order_id: "ORD-002", 
      quotation_id: "QUOT-002", 
      job_description_id: "JOB-002", 
      client_name: "XYZ Ltd.", 
      email_address: "xyz@example.com", 
      phone_number: "987-654-3210", 
      executive: "Jane Smith",
      move_to_next: "",
    },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Orders List
      </Typography>
      <DynamicTable columns={columns} data={data} />
    </>
  );
};

export default OrdersTable;