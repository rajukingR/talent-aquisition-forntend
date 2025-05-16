import React, { useEffect, useState } from "react";
import {Card,CardContent,TextField,Typography,Switch,FormControlLabel,Button,Grid,Box,CircularProgress,Snackbar,Alert,} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom"; // to get the ID from URL
import { useNavigate } from "react-router-dom";
export const RevenueModelEdit = () => {
    const navigate = useNavigate();
  
  const { id } = useParams(); // Assuming route is like /revenue-models/edit/:id
  const [revenueModel, setRevenueModel] = useState({
    revenue_model_name: "",
    description: "",
    active_status: true,
  });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchRevenueModel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/revenue-model/${id}`);
        const data = response.data;

        setRevenueModel({
          revenue_model_name: data.revenue_model_name || "",
          description: data.description || "",
          active_status: data.active_status === 1, // convert 1/0 to true/false
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching revenue model:", error);
        setSnackbar({ open: true, message: "Failed to load data", severity: "error" });
        setLoading(false);
      }
    };

    fetchRevenueModel();
  }, [id]);

  const handleChange = (field) => (event) => {
    const value = field === "active_status" ? event.target.checked : event.target.value;
    setRevenueModel((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!revenueModel.revenue_model_name.trim()) {
      setSnackbar({ open: true, message: "Revenue Model Name is required", severity: "warning" });
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        ...revenueModel,
        active_status: revenueModel.active_status ? 1 : 0,
      };
      await axios.put(`http://localhost:5000/api/revenue-model/${id}`, payload);
      setSnackbar({ open: true, message: "Revenue model updated successfully", severity: "success" });
      navigate("/dashboard/settings/RevenType");

      setIsSubmitting(false);
    } catch (error) {
      console.error("Update error:", error);
      setSnackbar({ open: true, message: error.response?.data?.message || "Failed to update revenue model", severity: "error" });
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Edit Revenue Model
              </Typography>
              <TextField
                label="Revenue Model*"
                fullWidth
                margin="normal"
                value={revenueModel.revenue_model_name}
                onChange={handleChange("revenue_model_name")}
                error={!revenueModel.revenue_model_name.trim() && isSubmitting}
                helperText={!revenueModel.revenue_model_name.trim() && isSubmitting && "Revenue Model Name is required"}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={revenueModel.description}
                onChange={handleChange("description")}
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
                    checked={revenueModel.active_status}
                    onChange={handleChange("active_status")}
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
          onClick={handleUpdate}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </Box>

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
