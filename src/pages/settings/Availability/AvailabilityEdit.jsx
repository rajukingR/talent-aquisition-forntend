import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

export const AvailabilityEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [description, setDescription] = useState("");
  const [activeStatus, setActiveStatus] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchAvailabilityStatus();
  }, [id]);

  const fetchAvailabilityStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/availability-status/${id}`);
      const data = res.data;
      setAvailabilityStatus(data.availability_status);
      setDescription(data.description);
      setActiveStatus(data.active_status);
    } catch (err) {
      console.error("Failed to fetch availability status:", err);
      setSnackbar({
        open: true,
        message: "Error fetching data",
        severity: "error",
      });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/availability-status/${id}`, {
        availability_status: availabilityStatus,
        description,
        active_status: activeStatus,
      });
      setSnackbar({
        open: true,
        message: "Availability status updated successfully",
        severity: "success",
      });

      setTimeout(() => navigate("/dashboard/settings/Availability"), 1200);
    } catch (err) {
      console.error("Error updating status:", err);
      setSnackbar({
        open: true,
        message: "Error updating data",
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
        {/* Left Form */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Edit Availability Status
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

        {/* Right Form */}
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

      {/* Save Button */}
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
