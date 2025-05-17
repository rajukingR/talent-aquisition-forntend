import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

export const CandidateStatusAdd = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async () => {
    try {
      const payload = {
        status,
        description,
        isActive,
      };
      const response = await axios.post("http://localhost:5000/api/candidate-status/create", payload);
      alert("Candidate Status created successfully!");


      setTimeout(() => {
        navigate("/dashboard/settings/CandidateStatus");
      }, 2000);
      setStatus("");
      setDescription("");
      setIsActive(true);
    } catch (error) {
      console.error("Error creating candidate status:", error);
      alert("Failed to create candidate status.");
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form - Create Candidate Status */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Create Candidate Status
              </Typography>
              <TextField
                label="Status*"
                fullWidth
                margin="normal"
                placeholder="Enter Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                placeholder="Enter Description"
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
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
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
