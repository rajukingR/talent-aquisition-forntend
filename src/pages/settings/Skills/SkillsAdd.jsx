import React, { useState, useEffect } from "react";
import { 
  Card, CardContent, TextField, Typography, 
  Button, MenuItem, Select, Grid, Box, 
  FormControlLabel, Switch, Snackbar, Alert 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SkillsAdd = () => {
  const [skills, setSkills] = useState([""]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [jobTitles, setJobTitles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
  

  // Fetch job titles from API on component mount
  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/job-title/");
        setJobTitles(response.data);
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    };
    fetchJobTitles();
  }, []);

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (!jobTitle || !skills[0]) {
        setSnackbarMessage("Please fill in at least one skill and job title.");
        setIsSuccess(false);
        setSnackbarOpen(true);
        return;
      }

      const payload = {
        skills,
        job_title: jobTitle,
        job_description: jobDescription,
        is_active: isActive
      };

      const response = await axios.post("http://localhost:5000/api/skills-add/create", payload);
      setSnackbarMessage("Skills added successfully!");

      setTimeout(() => {
        navigate("/dashboard/settings/Skills");
      }, 1000);
      setIsSuccess(true);
      setSnackbarOpen(true);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting skills:", error);
      setSnackbarMessage("Failed to add skills.");
      setIsSuccess(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2} justifyContent="flex-start">
        {/* Left Form */}
        <Grid item xs={12} md={5}>  
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Skill:
              </Typography>

              {skills.map((skill, index) => (
                <TextField
                  key={index}
                  label={`Skill ${index + 1}*`}
                  placeholder="Enter Skill"
                  fullWidth
                  margin="normal"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                />
              ))}

              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddSkill}
                sx={{ mt: 1, mb: 2 }}
              >
                Add Skill
              </Button>

              <Typography variant="body1" fontWeight="bold">
                Job Title*
              </Typography>
              <Select
                fullWidth
                displayEmpty
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                sx={{ my: 2 }}
              >
                <MenuItem value=""><em>Select</em></MenuItem>
                {jobTitles.map((job) => (
                  <MenuItem key={job.id} value={job.job_title}>
                    {job.job_title}
                  </MenuItem>
                ))}
              </Select>

              <Typography variant="body1" fontWeight="bold">
                Job Description*
              </Typography>
              <TextField
                placeholder="Enter Job Description"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
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
        <Button variant="contained" color="primary" sx={{ px: 40 }} onClick={handleSubmit}>
          Save
        </Button>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isSuccess ? "success" : "error"}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};