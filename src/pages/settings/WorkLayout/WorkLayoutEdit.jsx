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

export const WorkLayoutEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    work_layout: "",
    description: "",
    active_status: true,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/work-layouts/${id}`);
        setForm(res.data);
      } catch (error) {
        console.error("Failed to fetch layout", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch work layout data",
          severity: "error",
        });
      }
    };
    fetchLayout();
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
      await axios.put(`http://localhost:5000/api/work-layouts/${id}`, form);
      setSnackbar({
        open: true,
        message: "Work layout updated successfully!",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/dashboard/settings/WorkLayout");
      }, 1000);
    } catch (error) {
      console.error("Error updating layout:", error);
      setSnackbar({
        open: true,
        message: "Failed to update work layout",
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
                Edit Work Layout
              </Typography>
              <TextField
                label="Work Layout*"
                fullWidth
                margin="normal"
                name="work_layout"
                value={form.work_layout}
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