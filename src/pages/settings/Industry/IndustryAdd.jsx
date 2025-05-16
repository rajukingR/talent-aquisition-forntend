import React, { useState } from "react";
import { Card, CardContent, TextField, Typography, Switch, FormControlLabel, Button, Grid, Box } from "@mui/material";
import axios from "axios";

export const IndustryAdd = () => {
  const [industryName, setIndustryName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Handle form submission
  const handleSubmit = async () => {
    const industryData = {
      industry_name: industryName,
      description,
      is_active: isActive,
    };

    try {
      // Make API request to create a new industry
      const response = await axios.post("http://localhost:5000/api/industries/create", industryData);
      
      // If successful, you can handle the response
      alert("Industry created successfully!");
      console.log(response.data);
    } catch (error) {
      // Handle error
      alert("Error creating industry: " + error.message);
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form - Create Industry */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Create Industry
              </Typography>
              <TextField
                label="Industry Name*"
                fullWidth
                margin="normal"
                value={industryName}
                onChange={(e) => setIndustryName(e.target.value)}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Right Form - Control */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Control:
              </Typography>
              <FormControlLabel
                control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
                label="Active Status*"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Button - Centered at Bottom */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant="contained" color="primary" sx={{ px: 40 }} onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
