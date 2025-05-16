import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const JobTitleEdit = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    job_title: "",
    job_description: "",
    active_status: true,
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchJobTitle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/job-title/${id}`);
        const data = res.data;

        setJobData({
          job_title: data.job_title || "",
          job_description: data.job_description || "",
          active_status: data.active_status === 1,
        });
      } catch (err) {
        console.error("Failed to fetch job title:", err);
        setSnackbar({ open: true, message: "Failed to load job title", severity: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchJobTitle();
  }, [id]);

  const handleChange = (field) => (e) => {
    const value = field === "active_status" ? e.target.checked : e.target.value;
    setJobData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!jobData.job_title.trim()) {
      setSnackbar({
        open: true,
        message: "Job Title is required",
        severity: "warning",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        ...jobData,
        active_status: jobData.active_status ? 1 : 0,
      };

      await axios.put(`http://localhost:5000/api/job-title/${id}`, payload);
      setSnackbar({ open: true, message: "Job Title updated successfully", severity: "success" });
    


      setTimeout(() => {
        navigate("/dashboard/settings/jobTitle"); 
      }, 1000);
    } catch (error) {
      console.error("Update failed:", error);
      setSnackbar({
        open: true,
        message: "Failed to update job title",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Edit Job Title
              </Typography>

              <TextField
                label="Job Title*"
                fullWidth
                margin="normal"
                value={jobData.job_title}
                onChange={handleChange("job_title")}
                error={!jobData.job_title.trim() && isSubmitting}
                helperText={!jobData.job_title.trim() && isSubmitting && "Job Title is required"}
              />

              <TextField
                label="Job Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={jobData.job_description}
                onChange={handleChange("job_description")}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Control:
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={jobData.active_status}
                    onChange={handleChange("active_status")}
                  />
                }
                label="Active Status*"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 40 }}
          onClick={handleUpdate}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
