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

export const SourceAdd = () => {
  const navigate = useNavigate();
  const [sourceName, setSourceName] = useState("");
  const [description, setDescription] = useState("");
  const [control, setControl] = useState("Default");
  const [activeStatus, setActiveStatus] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async () => {
    if (!sourceName.trim()) {
      setSnackbar({
        open: true,
        message: "Source name is required",
        severity: "error",
      });
      return;
    }

    const payload = {
      source_name: sourceName,
      description,
      control,
      active_status: activeStatus,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sources/create", 
        payload
      );
      
      setSnackbar({ 
        open: true, 
        message: "Source created successfully!", 
        severity: "success" 
      });

      setTimeout(() => {
        navigate("/dashboard/settings/SourceSe"); // Fixed navigation path
      }, 2000);

      // Clear form
      setSourceName("");
      setDescription("");
      setControl("Default");
      setActiveStatus(true);
    } catch (error) {
      console.error("Error creating source:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error creating source. Please try again.",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Create Source
              </Typography>
              <TextField
                label="Enter Source*"
                fullWidth
                margin="normal"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
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
              <TextField
                label="Control"
                fullWidth
                margin="normal"
                value={control}
                onChange={(e) => setControl(e.target.value)}
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
                    checked={activeStatus}
                    onChange={(e) => setActiveStatus(e.target.checked)}
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
          sx={{ px: 10 }} 
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