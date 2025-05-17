import React, { useState } from "react";
import { Card, CardContent, TextField, Typography, Switch, FormControlLabel, Button, Grid, Box, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const InterviewStatusAdd = () => {
  const navigate = useNavigate();
  // State variables for form data
  const [statusName, setStatusName] = useState("");
  const [description, setDescription] = useState("");
  const [activeStatus, setActiveStatus] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Handle form submission
  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/interview-statuses/create", {
        status_name: statusName,
        job_description: description,
        control: "Internal", // You can adjust this field as per your requirement
        active_status: activeStatus
      });
      
      // Show success message
      setSnackbar({ open: true, message: "Interview Status added successfully!", severity: "success" });
      setTimeout(() => {
        navigate("/dashboard/settings/InterviewStatus");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      // Show error message
      setSnackbar({ open: true, message: "Failed to add Interview Status", severity: "error" });
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form - Add Interview Status */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Add Interview Status
              </Typography>
              <TextField
                label="Interview Status*"
                fullWidth
                margin="normal"
                value={statusName}
                onChange={(e) => setStatusName(e.target.value)}
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
                control={<Switch checked={activeStatus} onChange={(e) => setActiveStatus(e.target.checked)} />}
                label="Active Status*"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Button - Centered at Bottom */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant="contained" color="primary" sx={{ px: 10 }} onClick={handleSave}>
          Save
        </Button>
      </Box>

      {/* Snackbar for success/error message */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
