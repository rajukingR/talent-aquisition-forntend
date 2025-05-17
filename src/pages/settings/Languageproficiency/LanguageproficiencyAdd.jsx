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

export const LanguageproficiencyAdd = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");
  const [description, setDescription] = useState(""); // ✅ New state
  const [isActive, setIsActive] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async () => {
    if (!language.trim() || !proficiencyLevel.trim()) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    const languageData = {
      language,
      proficiency_level: proficiencyLevel,
      description, // ✅ Include description in payload
      is_active: isActive,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/language-proficiency/create",
        languageData
      );

      setSnackbar({
        open: true,
        message: "Language proficiency created successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/dashboard/settings/LanguageProficiency");
      }, 1500);

      setLanguage("");
      setProficiencyLevel("");
      setDescription(""); // ✅ Reset description
      setIsActive(true);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error creating language proficiency",
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
        {/* Left Form - Add Language Proficiency */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Language Proficiency
              </Typography>
              <TextField
                label="Language*"
                fullWidth
                margin="normal"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
              <TextField
                label="Proficiency Level*"
                fullWidth
                margin="normal"
                value={proficiencyLevel}
                onChange={(e) => setProficiencyLevel(e.target.value)}
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

      {/* Save Button - Centered */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 40 }}
          onClick={handleSubmit}
          disabled={!language || !proficiencyLevel}
        >
          Save
        </Button>
      </Box>

      {/* Snackbar */}
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
