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
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const OffBoardingReasonsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reason_name: "",
    description: "",
    active_status: true,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(true);

  // Fetch existing offboarding reason
  useEffect(() => {
    const fetchReason = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/offboarding-reasons/${id}`
        );
        setFormData({
          reason_name: response.data.ReasonName || response.data.reason_name,
          description: response.data.Description || response.data.description || "",
          active_status: response.data.IsActive || response.data.active_status,
        });
      } catch (error) {
        console.error("Error fetching reason:", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch offboarding reason",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReason();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.reason_name.trim()) {
      setSnackbar({
        open: true,
        message: "OffBoarding Reason is required",
        severity: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ReasonName: formData.reason_name,
        Description: formData.description,
        IsActive: formData.active_status ? 1 : 0,
      };

      await axios.put(
        `http://localhost:5000/api/offboarding-reasons/${id}`,
        payload
      );

      setSnackbar({
        open: true,
        message: "OffBoarding Reason updated successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/dashboard/settings/OffBoardingReasons");
      }, 1500);
    } catch (error) {
      console.error("Error updating reason:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to update OffBoarding Reason",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form - Edit OffBoarding Reason */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Edit OffBoarding Reason
              </Typography>
              <TextField
                name="reason_name"
                label="OffBoarding Reason*"
                placeholder="Enter OffBoarding Reason"
                fullWidth
                margin="normal"
                value={formData.reason_name}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                name="description"
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
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
                    name="active_status"
                    checked={formData.active_status}
                    onChange={handleChange}
                    disabled={loading}
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
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Box>

      {/* Custom Green Snackbar at Bottom-Right */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#4caf50",
            color: "#fff",
          },
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            backgroundColor: "transparent",
            color: "#fff",
            "& .MuiAlert-icon": {
              color: "#fff",
            },
          }}
          iconMapping={{
            success: <CheckCircleOutlineIcon sx={{ color: "#fff" }} />,
            error: <ErrorOutlineIcon sx={{ color: "#fff" }} />,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};