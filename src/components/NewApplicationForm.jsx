import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import AuthContext from "../core/AuthContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircleIcon from "@mui/icons-material/Circle";

  const NewApplicationForm = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const [status, setStatus] = useState("waiting for response");
    const [source, setSource] = useState("");
    const [customSource, setCustomSource] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [customEmploymentType, setCustomEmploymentType] = useState("");
  
    const [formData, setFormData] = useState({
      position_name: "",
      employer_name: "",
      application_date: "",
      employment_type: "",
      source: "",
      job_description: "",
      job_link: "",
      status: "waiting for response", 
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleStatusChange = (event) => {
      setStatus(event.target.value);
      setFormData({
        ...formData,
        status: event.target.value,
      });
    };
  
    const handleSourceChange = (event) => {
      const selectedValue = event.target.value;
      setSource(selectedValue);
      setFormData({
        ...formData,
        source: selectedValue,
      });
  
      if (selectedValue !== "other") {
        setCustomSource("");
      }
    };
  
    const handleEmploymentTypeChange = (event) => {
      const selectedValue = event.target.value;
      setEmploymentType(selectedValue);
      setFormData({
        ...formData,
        employment_type: selectedValue,
      });
  
      if (selectedValue !== "other") {
        setCustomEmploymentType("");
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const applicationData = {
        ...formData,
        user_id: user.user_id,
        employment_type: employmentType === "other" ? customEmploymentType : employmentType,
        source: source === "other" ? customSource : source,
      };
  
   
      if (!applicationData.position_name || !applicationData.employer_name || !applicationData.application_date) {
        alert("Please fill in all required fields.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/new-application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(applicationData),
        });
  
        if (response.ok) {
          navigate("/home"); 
          setFormData({
            position_name: "",
            employer_name: "",
            application_date: "",
            employment_type: "",
            source: "",
            job_description: "",
            job_link: "",
            status: "waiting for response",
          });
        } else {
          alert("Failed to submit application. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting application:", error);
        alert("Error submitting application. Please try again.");
      }
    };
  
    return (
      <Box sx={{ padding: 3, maxWidth: 700, margin: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Add New Application
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            label="Job title:"
            name="position_name"
            value={formData.position_name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Employer:"
            name="employer_name"
            value={formData.employer_name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Application date:"
            name="application_date"
            type="date"
            value={formData.application_date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
  
          <FormControl fullWidth>
            <InputLabel id="employment-type-label">Employment type:</InputLabel>
            <Select
              labelId="employment-type-label"
              value={employmentType}
              onChange={handleEmploymentTypeChange}
              label="Employment type"
            >
              <MenuItem value="full-time">Full-time</MenuItem>
              <MenuItem value="part-time">Part-time</MenuItem>
              <MenuItem value="minijob">Minijob</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
              <MenuItem value="temporary">Temporary</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
  
            {employmentType === "other" && (
              <TextField
                fullWidth
                margin="normal"
                label="Enter employment type here:"
                value={customEmploymentType}
                onChange={(e) => setCustomEmploymentType(e.target.value)}
              />
            )}
          </FormControl>
  
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormLabel id="work-mode-label">Work mode:</FormLabel>
            <RadioGroup
              row
              aria-labelledby="work-mode-label"
              name="work_mode"
            >
              <FormControlLabel
                value="On-site"
                control={<Radio />}
                label="On-site"
              />
              <FormControlLabel
                value="Hybrid"
                control={<Radio />}
                label="Hybrid"
              />
              <FormControlLabel
                value="Remote"
                control={<Radio />}
                label="Remote"
              />
            </RadioGroup>
          </FormControl>
  
          <FormControl fullWidth>
            <InputLabel id="job-search-source-label">Source:</InputLabel>
            <Select
              labelId="job-search-source-label"
              value={source}
              onChange={handleSourceChange}
              label="Source"
            >
              <MenuItem value="stepstone">StepStone</MenuItem>
              <MenuItem value="indeed">Indeed</MenuItem>
              <MenuItem value="linkedin">LinkedIn</MenuItem>
              <MenuItem value="xing">Xing</MenuItem>
              <MenuItem value="arbeitsagentur">Arbeitsagentur</MenuItem>
              <MenuItem value="monster">Monster</MenuItem>
              <MenuItem value="join">Corporate website</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
  
            {source === "other" && (
              <TextField
                fullWidth
                margin="normal"
                label="Enter source here:"
                value={customSource}
                onChange={(e) => setCustomSource(e.target.value)}
              />
            )}
          </FormControl>
  
          <TextField
            label="Job description:"
            name="job_description"
            value={formData.job_description}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={4}
          />
  
          <TextField
            label="Job link:"
            name="job_link"
            value={formData.job_link}
            onChange={handleChange}
            fullWidth
          />
  
          <FormControl fullWidth required>
            <InputLabel id="status-select-label">Application status:</InputLabel>
            <Select
              labelId="status-select-label"
              value={status}
              label="Application status"
              onChange={handleStatusChange}
            >
              <MenuItem value="waiting for response">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircleIcon fontSize="small" sx={{ color: "#FFC107" }} />
                  <span>Waiting for response</span>
                </Box>
              </MenuItem>
              <MenuItem value="rejected">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircleIcon fontSize="small" sx={{ color: "#E53935" }} />
                  <span>Rejected</span>
                </Box>
              </MenuItem>
              <MenuItem value="interview">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircleIcon fontSize="small" sx={{ color: "#43A047" }} />
                  <span>Interview</span>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
  
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add new application
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default NewApplicationForm;