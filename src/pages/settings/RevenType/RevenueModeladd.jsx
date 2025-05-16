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

export const RevenueModelAdd = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    revenue_model_name: "",
    description: "",
    active_status: true,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

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
      const payload = {
        ...formData,
        active_status: formData.active_status ? 1 : 0,
      };
      const response = await axios.post("http://localhost:5000/api/revenue-model/create", payload);
      setSnackbar({ open: true, message: "Revenue model created successfully", severity: "success" });
      navigate("/dashboard/settings/RevenType");

      setFormData({ revenue_model_name: "", description: "", active_status: true });

    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Error creating revenue model", severity: "error" });
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form - Add Revenue Model */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Add Revenue Model
              </Typography>
              <TextField
                label="Revenue Model*"
                name="revenue_model_name"
                fullWidth
                margin="normal"
                placeholder="Enter Revenue Model"
                value={formData.revenue_model_name}
                onChange={handleChange}
              />
              <TextField
                label="Description"
                name="description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                placeholder="Enter Description"
                value={formData.description}
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

      {/* Save Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant="contained" color="primary" sx={{ px: 40 }} onClick={handleSubmit}>
          Save
        </Button>
      </Box>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
