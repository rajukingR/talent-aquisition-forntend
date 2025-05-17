import React, { useState, useEffect } from "react";
import { Card, CardContent, TextField, Typography, Switch, FormControlLabel, Button, Grid, Box, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const LanguageproficiencyEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from route params
  const [language, setLanguage] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");
  const [description, setDescription] = useState(""); // Added description field
  const [isActive, setIsActive] = useState(true);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch existing data based on the ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/language-proficiency/${id}`);
        setLanguage(response.data.language);
        setProficiencyLevel(response.data.proficiency_level);
        setDescription(response.data.description);
        setIsActive(response.data.is_active);
      } catch (error) {
        console.error("Error fetching language proficiency data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const languageData = {
      language,
      proficiency_level: proficiencyLevel,
      description, // Added description field
      is_active: isActive,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/language-proficiency/${id}`,
        languageData
      );

      setSnackbar({
        open: true,
        message: "Language proficiency updated successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/dashboard/settings/LanguageProficiency");
      }, 1500);

      setLanguage("");
      setProficiencyLevel("");
      setDescription(""); // Reset description
      setIsActive(true);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error updating language proficiency",
        severity: "error",
      });
      console.error(error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left Form - Edit Language Proficiency */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Edit Language Proficiency
              </Typography>
              <TextField
                label="Language*"
                fullWidth
                margin="normal"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              />
              <TextField
                label="Proficiency Level*"
                fullWidth
                margin="normal"
                value={proficiencyLevel}
                onChange={(e) => setProficiencyLevel(e.target.value)}
                required
              />
              <TextField
                label="Description*"
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
                control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
                label="Active Status*"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Button - Centered */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 40 }}
          onClick={handleSubmit}
          disabled={!language || !proficiencyLevel || !description}
        >
          Save
        </Button>
      </Box>

      {/* Snackbar - Success or Error */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: snackbar.severity === "success" ? "#4caf50" : "#f44336", // Green for success, Red for error
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
