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

export const CandidateStatusEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    status: "",
    description: "",
    active_status: true,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchCandidateStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/candidate-status/${id}`);
        setForm(res.data);
      } catch (error) {
        console.error("Failed to fetch candidate status", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch candidate status data",
          severity: "error",
        });
      }
    };
    fetchCandidateStatus();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    setForm((prev) => ({ ...prev, active_status: e.target.checked }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/candidate-status/${id}`, form);
      setSnackbar({
        open: true,
        message: "Candidate status updated successfully!",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/dashboard/settings/CandidateStatus");
      }, 1000);
    } catch (error) {
      console.error("Error updating candidate status:", error);
      setSnackbar({
        open: true,
        message: "Failed to update candidate status",
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
                Edit Candidate Status
              </Typography>
              <TextField
                label="Status*"
                fullWidth
                margin="normal"
                name="status"
                value={form.status}
                onChange={handleChange}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
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
                    checked={form.active_status}
                    onChange={handleSwitchChange}
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
        <Button variant="contained" color="primary" sx={{ px: 40 }} onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
