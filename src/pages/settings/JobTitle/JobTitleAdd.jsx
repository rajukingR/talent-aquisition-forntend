import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

export const JobTitleAdd = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    job_title: "",
    job_description: "",
    active_status: true,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    setForm((prev) => ({ ...prev, active_status: e.target.checked }));
  };

  const handleSubmit = async () => {
    try {
      if (!form.job_title.trim()) {
        setSnackbar({
          open: true,
          message: "Job Title is required",
          severity: "error",
        });
        return;
      }

      await axios.post("http://localhost:5000/api/job-title/create", {
        ...form,
        active_status: form.active_status ? 1 : 0,
      });

      setSnackbar({
        open: true,
        message: "Job title created successfully!",
        severity: "success",
      });
      
      setTimeout(() => {
        navigate("/dashboard/settings/JobTitle");
      }, 1000);
    } catch (error) {
      console.error("Error creating job title:", error);
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Failed to create job title",
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
                Add Job Title
              </Typography>
              <TextField
                label="Job Title*"
                fullWidth
                margin="normal"
                name="job_title"
                value={form.job_title}
                onChange={handleChange}
                placeholder="Enter Job Title"
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                name="job_description"
                value={form.job_description}
                onChange={handleChange}
                placeholder="Enter Description"
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
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 40 }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};