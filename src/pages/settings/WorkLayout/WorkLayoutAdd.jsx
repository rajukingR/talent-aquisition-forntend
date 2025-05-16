import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ make sure this is present

export const WorkLayoutAdd = () => {
  const [workLayout, setWorkLayout] = useState("");
  const [description, setDescription] = useState("");
  const [activeStatus, setActiveStatus] = useState(true);
  const navigate = useNavigate(); // ✅ this must be inside the component body

  const handleSubmit = async () => {
    try {
      const payload = {
        work_layout: workLayout,
        description: description,
        active_status: activeStatus,
      };

      const response = await axios.post("http://localhost:5000/api/work-layouts/create", payload);
      alert("Work Layout created successfully!");
      navigate("/dashboard/settings/WorkLayout");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating work layout:", error);
      alert("Failed to create work layout.");
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form - Create Work Layout */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Create Work Layout
              </Typography>
              <TextField
                label="Work Layout*"
                fullWidth
                margin="normal"
                value={workLayout}
                onChange={(e) => setWorkLayout(e.target.value)}
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
                control={
                  <Switch
                    checked={activeStatus}
                    onChange={(e) => setActiveStatus(e.target.checked)}
                  />
                }
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
