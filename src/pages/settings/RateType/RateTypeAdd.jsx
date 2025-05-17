import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Alert 
} from "@mui/material";
import axios from "axios";

export const RateTypeAdd = () => {
  const navigate = useNavigate();
  const [rateType, setRateType] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const handleSubmit = async () => {
    // Validate required fields
    if (!rateType.trim()) {
      setSnackbar({
        open: true,
        message: "Rate Type is required",
        severity: "error"
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/api/rate-types/create", {
        rate_type: rateType,
        description: description,
        active_status: isActive
      });

      setSnackbar({
        open: true,
        message: "Rate Type created successfully!",
        severity: "success"
      });
      setTimeout(() => navigate("/dashboard/settings/RateType"), 1200);


      // Reset form
      setRateType("");
      setDescription("");
      setIsActive(true);

    } catch (error) {
      console.error("Error creating rate type:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to create Rate Type",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form - Add Rate Type */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Add Rate Type
              </Typography>
              <TextField
                label="Rate Type*"
                fullWidth
                margin="normal"
                placeholder="Enter Rate Type"
                value={rateType}
                onChange={(e) => setRateType(e.target.value)}
                // error={!rateType.trim()}
                // helperText={!rateType.trim() ? "This field is required" : ""}
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
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ px: 40 }}
          onClick={handleSubmit}
          disabled={loading || !rateType.trim()}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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