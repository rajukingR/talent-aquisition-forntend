import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const AddInterview = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Top-right button */}
      <Grid container justifyContent="flex-end">
        <Button variant="contained" sx={{ mb: 2 }}>
          Send to Candidate
        </Button>
      </Grid>

      <Grid container spacing={3}>
        {/* Left Column: Interview Details */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Interview Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Interview ID*"
                  placeholder="Enter Interview ID"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date*"
                    value={dayjs()}
                    onChange={() => {}}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Interview Name</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="">Select Interview</MenuItem>
                    <MenuItem value="General">General Interview</MenuItem>
                    <MenuItem value="Technical">Technical Interview</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Interview Person*</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="">Select Person</MenuItem>
                    <MenuItem value="Person1">Person 1</MenuItem>
                    <MenuItem value="Person2">Person 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Interview Company Name"
                  placeholder="Enter Company Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Candidate ID*"
                  placeholder="Enter Candidate ID"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Interview Type*</InputLabel>
                  <Select defaultValue="Online">
                    <MenuItem value="Online">Online</MenuItem>
                    <MenuItem value="Offline">Offline</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Meeting Link - Full Width */}
              <Grid item xs={12}>
                <TextField
                  label="Meeting Link*"
                  placeholder="Enter Link"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Interview Start Date & Time*"
                    value={dayjs()}
                    onChange={() => {}}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Interview End Date & Time*"
                    value={dayjs()}
                    onChange={() => {}}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Middle Column: Candidate Details */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Candidate Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Candidate Name"
                  placeholder="Enter Candidate Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number*"
                  placeholder="Enter Phone Number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email ID"
                  placeholder="Enter Email ID"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right Column: Interview Status & Control */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Interview Status
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Select</InputLabel>
              <Select label="Select" defaultValue="">
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Control
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Active Status*
                </Typography>
              </Grid>
              <Grid item>
                <Switch defaultChecked />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Save Button - Centered & Padded */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button variant="contained" size="large" sx={{ px: 40 }}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
