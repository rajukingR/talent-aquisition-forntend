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

export const CurrencyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currency, setCurrency] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchCurrency();
  }, [id]);

  const fetchCurrency = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/currency/${id}`);
      setCurrency(res.data.currency_name);
      setDescription(res.data.description);
      setIsActive(res.data.active_status);
    } catch (err) {
      console.error("Failed to fetch currency data:", err);
      setSnackbar({
        open: true,
        message: "Error fetching currency data",
        severity: "error",
      });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/currency/${id}`, {
        currency_name: currency,
        description,
        active_status: isActive,
      });

      setSnackbar({
        open: true,
        message: "Currency updated successfully",
        severity: "success",
      });

      setTimeout(() => navigate("/dashboard/settings/CurrencyTable"), 1200);
    } catch (err) {
      console.error("Error updating currency:", err);
      setSnackbar({
        open: true,
        message: "Error updating currency",
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
        {/* Left Form - Edit Currency */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Edit Currency
              </Typography>
              <TextField
                label="Currency Name*"
                fullWidth
                margin="normal"
                placeholder="Enter Currency Name"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
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
