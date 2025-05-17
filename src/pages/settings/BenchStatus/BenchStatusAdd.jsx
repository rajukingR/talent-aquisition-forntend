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

export const BenchStatusAdd = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    employee_name: "",
    status: "",
    description: "",
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
      await axios.post("http://localhost:5000/api/bench-status/create", form);
      setSnackbar({
        open: true,
        message: "Bench status created successfully!",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/dashboard/settings/BenchStatus");
      }, 1000);
    } catch (error) {
      console.error("Error creating bench status:", error);
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Failed to create bench status",
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
                Add Bench Status
              </Typography>
              <TextField
                label="Employee Name*"
                fullWidth
                margin="normal"
                name="employee_name"
                value={form.employee_name}
                onChange={handleChange}
                placeholder="Enter Employee Name"
              />
              <TextField
                label="Status*"
                fullWidth
                margin="normal"
                name="status"
                value={form.status}
                onChange={handleChange}
                placeholder="Enter Status"
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
