import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  Grid,
  Box,
  FormControlLabel,
  Switch,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const SkillsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [skills, setSkills] = useState([""]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [jobTitles, setJobTitles] = useState([]); // State for API job titles

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch job titles first
        const titlesRes = await axios.get("http://localhost:5000/api/job-title");
        setJobTitles(titlesRes.data);

        // Then fetch the skill data to edit
        const skillsRes = await axios.get(`http://localhost:5000/api/skills-add/${id}`);
        const data = skillsRes.data;

        setSkills(data.skills || [""]);
        setJobTitle(data.job_title || "");
        setJobDescription(data.job_description || "");
        setIsActive(data.is_active === 1);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setSnackbar({ open: true, message: "Failed to load data", severity: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleUpdate = async () => {
    if (!jobTitle.trim() || !skills[0].trim()) {
      setSnackbar({
        open: true,
        message: "Job Title and at least one Skill are required",
        severity: "warning",
      });
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        skills,
        job_title: jobTitle,
        job_description: jobDescription,
        is_active: isActive ? 1 : 0,
      };

      await axios.put(`http://localhost:5000/api/skills-add/${id}`, payload);
      setSnackbar({ open: true, message: "Skills updated successfully", severity: "success" });

      setTimeout(() => {
        navigate("/dashboard/skills");
      }, 1000);
    } catch (err) {
      console.error("Update failed:", err);
      setSnackbar({ open: true, message: "Failed to update skills", severity: "error" });
    } finally {
      setSubmitting(false);
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
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Skill:</Typography>

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

              <Typography variant="body1" fontWeight="bold">Job Title*</Typography>
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

              <Typography variant="body1" fontWeight="bold">Job Description*</Typography>
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

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Control:</Typography>
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
        <Button variant="contained" color="primary" sx={{ px: 40 }} onClick={handleUpdate} disabled={submitting}>
          {submitting ? "Updating..." : "Update"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};