import React, { useState } from "react";
import { Card, CardContent, TextField, Typography, Switch, FormControlLabel, Button, Grid, Box, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AvailabilityAdd = () => {
  const navigate = useNavigate();
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Handle form submit
  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/availability-status/create", {
        availability_status: availabilityStatus,
        description: description,
        active_status: isActive,
      });

      // On success
      setSnackbar({
        open: true,
        message: "Availability status created successfully",
        severity: "success",
      });
      setTimeout(() => {navigate("/dashboard/settings/Availability")}, 2000);
      // Reset form values
      setAvailabilityStatus("");
      setDescription("");
      setIsActive(true);
    } catch (error) {
      console.error("Error creating availability status:", error);
      setSnackbar({
        open: true,
        message: "Error creating availability status",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form - Add Availability Status */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Add Availability Status
              </Typography>
              <TextField
                label="Availability Status*"
                fullWidth
                margin="normal"
                value={availabilityStatus}
                onChange={(e) => setAvailabilityStatus(e.target.value)}
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
        <Button variant="contained" color="primary" sx={{ px: 40 }} onClick={handleSave}>
          Save
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
