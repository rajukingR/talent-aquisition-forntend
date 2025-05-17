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
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const OverallStatusAdd = () => {
  const [overallStatus, setOverallStatus] = useState("");
  const [description, setDescription] = useState("");
  const [activeStatus, setActiveStatus] = useState(true);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: "", 
    severity: "success" 
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!overallStatus.trim()) {
      setSnackbar({ 
        open: true, 
        message: "Overall Status is required", 
        severity: "error" 
      });
      return;
    }

    const payload = {
      overall_status: overallStatus,
      description,
      active_status: activeStatus,
    };

    try {
      const response = await fetch("http://localhost:5000/api/overall-status/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbar({ 
          open: true, 
          message: "Overall Status created successfully", 
          severity: "success" 
        });
        setTimeout(() => {
          navigate("/dashboard/settings/OverallStatus");
        }, 2000);
        setOverallStatus("");
        setDescription("");
        setActiveStatus(true);
      } else {
        setSnackbar({ 
          open: true, 
          message: data.message || "Failed to create", 
          severity: "error" 
        });
      }
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: "Server error", 
        severity: "error" 
      });
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Add Overall Status
              </Typography>
              <TextField
                label="Overall Status*"
                fullWidth
                margin="normal"
                value={overallStatus}
                onChange={(e) => setOverallStatus(e.target.value)}
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

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Control:
              </Typography>
              <FormControlLabel
                control={<Switch checked={activeStatus} onChange={(e) => setActiveStatus(e.target.checked)} />}
                label="Active Status*"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant="contained" color="primary" sx={{ px: 10 }} onClick={handleSubmit}>
          Save
        </Button>
      </Box>

      {/* Custom Green Snackbar at Bottom-Right */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#4caf50", // Green background
            color: "#fff", // White text
          },
        }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
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