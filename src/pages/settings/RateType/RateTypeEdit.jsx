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

export const RateTypeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchRateType();
  }, [id]);

  const fetchRateType = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/rate-types/${id}`);
      console.log("API Response:", res.data); // <- Add this
      setTitle(res.data.rate_type);
      setDescription(res.data.description);
      setIsActive(res.data.active_status);
    } catch (err) {
      console.error("Failed to fetch rate type data:", err);
      setSnackbar({
        open: true,
        message: "Error fetching rate type data",
        severity: "error",
      });
    }
  };
  

const handleSave = async () => {
  try {
    await axios.put(`http://localhost:5000/api/rate-types/${id}`, {
      rate_type: title, // <- FIXED: send correct field name
      description,
      active_status: isActive,
    });

    setSnackbar({
      open: true,
      message: "Rate Type updated successfully",
      severity: "success",
    });

    setTimeout(() => navigate("/dashboard/settings/RateType"), 1200);
  } catch (err) {
    console.error("Error updating rate type:", err);
    setSnackbar({
      open: true,
      message: "Error updating rate type",
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
        {/* Left Form - Edit Rate Type */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Edit Rate Type
              </Typography>
              <TextField
                label="Rate Type*"
                fullWidth
                margin="normal"
                placeholder="Enter Rate Type"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                placeholder="Enter Description"
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
