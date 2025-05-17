import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";

export const SourceEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // assumes /edit/:id route
  const [sourceName, setSourceName] = useState("");
  const [description, setDescription] = useState("");
  const [activeStatus, setActiveStatus] = useState(true);
  const [control, setControl] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch existing source data
  useEffect(() => {
    const fetchSource = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sources/${id}`);
        const data = response.data;
        setSourceName(data.source_name);
        setDescription(data.description);
        setControl(data.control);
        setActiveStatus(data.active_status);
      } catch (error) {
        setSnackbar({ open: true, message: "Failed to load source data", severity: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchSource();
  }, [id]);

  const handleUpdate = async () => {
    const payload = {
      source_name: sourceName,
      description,
      control,
      active_status: activeStatus,
    };

    try {
      await axios.put(`http://localhost:5000/api/sources/${id}`, payload);
      setSnackbar({ open: true, message: "Source updated successfully!", severity: "success" });
      setTimeout(() => {
        navigate("/dashboard/settings/SourceSe"); // Fixed navigation path
      }, 2000);
    } catch (error) {
      setSnackbar({ open: true, message: "Update failed. Try again.", severity: "error" });
    }
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Edit Source
              </Typography>
              <TextField
                label="Source*"
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
        <Button variant="contained" color="primary" sx={{ px: 10 }} onClick={handleUpdate}>
          Save
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
