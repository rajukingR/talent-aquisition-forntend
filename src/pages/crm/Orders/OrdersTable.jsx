import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import API_URL from "../../../api/Api_url";
import DynamicTable from "../../../components/table-format/DynamicTable";

const OrdersTable = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedData = response.data.map((order, index) => ({
          serial: index + 1,
          id: order.id,
          company_name: order.company_name,
          contact_person: order.contact_person,
          phone_number: order.phone_number,
          mail_id: order.mail_id,
          total: `Rs.${parseFloat(order.total).toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}`,
          order_date: order.order_date,
        }));

        setOrderDetails(formattedData);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  const columns = [
    { id: "serial", label: "No." },
    { id: "company_name", label: "Company Name" },
    { id: "contact_person", label: "Client Name" },
    { id: "phone_number", label: "Phone Number" },
    { id: "mail_id", label: "Email" },
    { id: "total", label: "Total Amount" },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Order Details List
      </Typography>

      <DynamicTable columns={columns} data={orderDetails} />
    </>
  );
};

export default OrdersTable;

