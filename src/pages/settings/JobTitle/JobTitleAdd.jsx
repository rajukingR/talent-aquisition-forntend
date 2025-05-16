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

  const [formData, setFormData] = useState({
    job_title: "",
    job_description: "",
    active_status: true,
  });

  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: "", 
    severity: "success" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      active_status: e.target.checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.job_title.trim()) {
        setSnackbar({ 
          open: true, 
          message: "Job Title is required", 
          severity: "error" 
        });
        return;
      }

      const payload = {
        job_title: formData.job_title,
        job_description: formData.job_description,
        active_status: formData.active_status ? 1 : 0,
      };

      const response = await axios.post(
        "http://localhost:5000/api/job-title/create", 
        payload
      );

      setSnackbar({ 
        open: true, 
        message: "Job Title created successfully", 
        severity: "success" 
      });
      navigate("/dashboard/settings/JobTitle"); 


      // Reset form after successful submission
      setFormData({ 
        job_title: "", 
        job_description: "", 
        active_status: true 
      });

      // // Navigate after delay to show success message
      // setTimeout(() => {
      //   navigate("/dashboard/settings/job-title"); 
      // }, 1500);

    } catch (error) {
      console.error("Error creating job title:", error);
      setSnackbar({ 
        open: true, 
        message: error.response?.data?.message || "Error creating job title", 
        severity: "error" 
      });
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form - Job Title */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Job Title:
              </Typography>
              
              <Typography sx={{ mt: 1, mb: 0.5 }} fontWeight="500">
                Job Title*
              </Typography>
              <TextField
                fullWidth
                margin="dense"
                name="job_title"
                placeholder="Enter Job Title"
                value={formData.job_title}
                onChange={handleChange}
                required
              />

              <Typography sx={{ mt: 2, mb: 0.5 }} fontWeight="500">
                Job Description
              </Typography>
              <TextField
                fullWidth
                margin="dense"
                name="job_description"
                multiline
                rows={3}
                placeholder="Enter Job Description"
                value={formData.job_description}
                onChange={handleChange}
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
                    checked={formData.active_status}
                    onChange={handleSwitchChange}
                  />
                }
                label="Active Status*"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Button - Centered */}
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

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};