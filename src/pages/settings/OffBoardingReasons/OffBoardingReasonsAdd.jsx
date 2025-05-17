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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const OffBoardingReasonsAdd = () => {
  const [reasonName, setReasonName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!reasonName.trim()) {
      setSnackbar({
        open: true,
        message: "OffBoarding Reason is required",
        severity: "error"
      });
      return;
    }

    try {
      const payload = {
        ReasonName: reasonName,
        Description: description,
        IsActive: isActive ? 1 : 0,
      };

      const response = await axios.post(
        "http://localhost:5000/api/offboarding-reasons/create", 
        payload
      );

      setSnackbar({
        open: true,
        message: "OffBoarding Reason Created Successfully",
        severity: "success"
      });

      setTimeout(() => {
        navigate('/dashboard/settings/OffBoardingReasons');
      }, 2000);

      setReasonName("");
      setDescription("");
      setIsActive(true);
    } catch (error) {
      console.error("Error creating OffBoardingReason:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to create OffBoarding Reason",
        severity: "error"
      });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
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
                Create OffBoarding Reason
              </Typography>
              <TextField
                label="OffBoarding Reason*"
                placeholder="Enter OffBoarding Reason"
                fullWidth
                margin="normal"
                value={reasonName}
                onChange={(e) => setReasonName(e.target.value)}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
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