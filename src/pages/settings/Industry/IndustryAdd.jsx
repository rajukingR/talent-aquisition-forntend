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
import { useParams, useNavigate } from "react-router-dom";


export const IndustryAdd = () => {
  const [industryName, setIndustryName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
    const navigate = useNavigate();
  

  const handleSubmit = async () => {
    if (!industryName.trim()) {
      setSnackbar({
        open: true,
        message: "Industry Name is required",
        severity: "warning",
      });
      return;
    }

    const industryData = {
      industry_name: industryName,
      description,
      is_active: isActive ? 1 : 0,
    };

    try {
      setSubmitting(true);
      const response = await axios.post("http://localhost:5000/api/industries/create", industryData);

      setSnackbar({
        open: true,
        message: "Industry created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/dashboard/settings/Industry"), 1200);


      // Reset form (optional)
      setIndustryName("");
      setDescription("");
      setIsActive(true);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error creating industry",
        severity: "error",
      });
      console.error("Error creating industry:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Create Industry
              </Typography>
              <TextField
                label="Industry Name*"
                fullWidth
                margin="normal"
                value={industryName}
                onChange={(e) => setIndustryName(e.target.value)}
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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 40 }}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
