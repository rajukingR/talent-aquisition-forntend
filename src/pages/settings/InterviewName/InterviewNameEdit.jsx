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
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export const InterviewNameEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interviewName, setInterviewName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviewName = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/interview-names/${id}`);
        const data = await response.json();
        if (response.ok) {
          setInterviewName(data.interview_name);
          setDescription(data.description);
          setIsActive(data.is_active);
        } else {
          setSnackbar({ open: true, message: data.message || "Failed to fetch interview name", severity: "error" });
        }
      } catch (error) {
        setSnackbar({ open: true, message: "Server error", severity: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewName();
  }, [id]);

  const handleUpdate = async () => {
    if (!interviewName.trim()) {
      setSnackbar({ open: true, message: "Interview Name is required", severity: "error" });
      return;
    }

    const payload = {
      interview_name: interviewName,
      description,
      is_active: isActive,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/interview-names/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbar({ open: true, message: "Interview Name updated successfully", severity: "success" });
        setTimeout(() => {
          navigate("/dashboard/settings/InterviewName"); // Change path as needed
        }, 2000);
      } else {
        setSnackbar({ open: true, message: data.message || "Failed to update", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Server error", severity: "error" });
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Edit Interview Name
              </Typography>
              <TextField
                label="Interview Name*"
                fullWidth
                margin="normal"
                value={interviewName}
                onChange={(e) => setInterviewName(e.target.value)}
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
                control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
                label="Active Status*"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant="contained" color="primary" sx={{ px: 10 }} onClick={handleUpdate}>
          Save
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
