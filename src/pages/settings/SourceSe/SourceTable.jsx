import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../../components/table-format/DynamicTable";

export const SourceTable = () => {
  const [data, setData] = useState();

  const columns = [
    { id: "id", label: "No." },
    { id: "source_name", label: "Source" },
    { id: "description", label: "Description" },
  ];

  // Fetch data from the API when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sources");
        if (response.ok) {
          const result = await response.json();
          setData(result);  // Assuming API returns data in the format [{ id, Source, company }]
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ color: "#989FA9", mb: 2 }}>
        Job Descriptions
      </Typography>

      <DynamicTable columns={columns} data={data} />
    </>
  );
};
