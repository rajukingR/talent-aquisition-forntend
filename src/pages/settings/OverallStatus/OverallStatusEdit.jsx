import React, { useState, useEffect } from "react";
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

export const OverallStatusEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchOverallStatus();
  }, [id]);

  const fetchOverallStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/overall-status/${id}`);
      setStatus(res.data.overall_status);
      setDescription(res.data.description);
      setIsActive(res.data.active_status);
    } catch (err) {
      console.error("Failed to fetch overall status data:", err);
      setSnackbar({
        open: true,
        message: "Error fetching overall status data",
        severity: "error",
      });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/overall-status/${id}`, {
        status_name: status,
        description,
        active_status: isActive,
      });

      setSnackbar({
        open: true,
        message: "Overall status updated successfully",
        severity: "success",
      });

      setTimeout(() => navigate("/dashboard/settings/OverallStatus"), 1200);
    } catch (err) {
      console.error("Error updating overall status:", err);
      setSnackbar({
        open: true,
        message: "Error updating overall status",
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
        {/* Left Form - Edit Overall Status */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Edit Overall Status
              </Typography>
              <TextField
                label="Overall Status*"
                fullWidth
                margin="normal"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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