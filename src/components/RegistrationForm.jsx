import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Link, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2"; 
import DialogBox from "./DialogBox.jsx";


const RegistrationForm = ({ cleanForm, onSubmitForm }) => {
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassowrdError] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    comparePasswordError: "",
  });

  useEffect(() => {
    if (cleanForm) {
        setFormFields({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setOpenDialog(false); 
    }
}, [cleanForm])

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formFields);

    let isThereErrors = false;
    for (let property in errors) {
      if (errors[property] !== "") {
        isThereErrors = true;
      }
    }
    if (!isThereErrors) {
      const dataToInsert = {
        user_first_name: formFields.firstName,
        user_last_name: formFields.lastName,
        email: formFields.email,
        password: formFields.password,
      };
      onSubmitForm(dataToInsert);
      setOpenDialog(true);
    } else {
        
       alert("There is still some errors")
    } 
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleComparePassword = () => {
    if (formFields.confirmPassword !== "") {
      if (formFields.confirmPassword !== formFields.password) {
        setErrors({
          ...errors,
          comparePasswordError: "Passwords are not matching!",
        });
        setPassowrdError(true);
      } else {
        setErrors({
          ...errors,
          comparePasswordError: "",
        });
        setPassowrdError(false);
      }
    } else {
      setPassowrdError(true);
    }
  };
  const handleFirstNameBlur = (event) => {
    if (formFields.firstName !== "") {
      const firstNameValidation = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
      if (!firstNameValidation.test(event.target.value)) {
        setErrors({
          ...errors,
          firstNameError: "You can use only letters and spaces!",
        });
        setFirstNameError(true);
      } else {
        setErrors({
          ...errors,
          firstNameError: "",
        });
        setFirstNameError(false);
      }
    } else {
      setFirstNameError(true);
    }
  };

  const handleLastNameBlur = (event) => {
    if (formFields.lastName !== "") {
      const lastNameValidation = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
      if (!lastNameValidation.test(event.target.value)) {
        setErrors({
          ...errors,
          lastNameError: "You use only letters and spaces!",
        });
        setLastNameError(true);
      } else {
        setErrors({
          ...errors,
          lastNameError: "",
        });
        setLastNameError(false);
      }
    } else {
      setLastNameError(true);
    }
  };

  const handleEmailBlur = (event) => {
    if (formFields.email !== "") {
      const emailValidation =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailValidation.test(event.target.value)) {
        setErrors({
          ...errors,
          emailError: "Email format is invalid!",
        });
        setEmailError(true);
      } else {
        setErrors({
          ...errors,
          emailError: "",
        });
        setEmailError(false);
      }
    } else {
      setEmailError(true);
    }
  };


  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", 
        gap: 4,
        py: 4,
        px: 4,
        width: "100%",
        height: "100%", 
        boxSizing: "border-box",
        borderRadius: "10px",
        backgroundColor: "#141E27", 
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        flexGrow: 1, 
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "#ffffff", fontWeight: "600"}}>
        LET'S CREATE AN ACCOUNT!
      </Typography>
  
      {/* Input Fields */}
      <Box sx={{ position: "relative", width: {
          xs: "90%",
          sm: "85%",
          md: "85%",
          lg: "85%",
        }}}>
        <TextField
          value={formFields.firstName}
          name="firstName"
          onChange={handleChange}
          onBlur={handleFirstNameBlur}
          id="firstName"
          label="First Name"
          variant="outlined"
          required
          size="small"
          sx={{
            width: "100%",
            backgroundColor: "#1F2A38", 
            input: { color: "#ffffff" }, 
            label: { color: "#cccccc" }, 
            fieldset: { borderColor: "#444" }, 
            "&:hover fieldset": { borderColor: "#888" }, 
            "&.Mui-focused fieldset": { borderColor: "#ffffff" }, 
          }}
          error={firstNameError}
        />
        {errors.firstNameError && (
          <Typography
            variant="p"
            sx={{
              color: "red",
              position: "absolute",
              bottom: "-20px",
              left: "0",
              fontSize: "0.8rem",
            }}
          >
            {errors.firstNameError}
          </Typography>
        )}
      </Box>

      {/* Last Name */}
      <Box sx={{ position: "relative", width: {
          xs: "90%",
          sm: "85%",
          md: "85%",
          lg: "85%",
        } }}>
        <TextField
          value={formFields.lastName}
          onChange={handleChange}
          onBlur={handleLastNameBlur}
          name="lastName"
          id="lastName"
          label="Last Name"
          variant="outlined"
          required
          size="small"
          sx={{
            width: "100%",
            backgroundColor: "#1F2A38", 
            input: { color: "#ffffff" }, 
            label: { color: "#cccccc" }, 
            fieldset: { borderColor: "#444" }, 
            "&:hover fieldset": { borderColor: "#888" }, 
            "&.Mui-focused fieldset": { borderColor: "#ffffff" }, 
          }}
          error={lastNameError}
        />
        {errors.lastNameError && (
          <Typography
            variant="p"
            sx={{
              color: "red",
              position: "absolute",
              bottom: "-20px",
              left: "0",
              fontSize: "0.8rem",
            }}
          >
            {errors.lastNameError}
          </Typography>
        )}
      </Box>

      {/* Email */}
      <Box sx={{ position: "relative", width: {
          xs: "90%",
          sm: "85%",
          md: "85%",
          lg: "85%",
        } }}>
        <TextField
          value={formFields.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          name="email"
          id="email"
          label="Email"
          variant="outlined"
          required
          size="small"
          sx={{
            width: "100%",
            backgroundColor: "#1F2A38", 
            input: { color: "#ffffff" }, 
            label: { color: "#cccccc" }, 
            fieldset: { borderColor: "#444" }, 
            "&:hover fieldset": { borderColor: "#888" }, 
            "&.Mui-focused fieldset": { borderColor: "#ffffff" }, 
          }}
          error={emailError}
        />
        {errors.emailError && (
          <Typography
            variant="p"
            sx={{
              color: "red",
              position: "absolute",
              bottom: "-20px",
              left: "0",
              fontSize: "0.8rem",
            }}
          >
            {errors.emailError}
          </Typography>
        )}
      </Box>

      {/* Password */}
      <Box sx={{ position: "relative", width: {
          xs: "90%",
          sm: "85%",
          md: "85%",
          lg: "85%",
        }}}>
      <TextField
        value={formFields.password}
        onChange={handleChange}
        onBlur={handleComparePassword}
        name="password"
        id="password"
        label="Password"
        variant="outlined"
        required
        size="small"
        sx={{
          width: "100%",
          backgroundColor: "#1F2A38", 
          input: { color: "#ffffff" }, 
          label: { color: "#cccccc" }, 
          fieldset: { borderColor: "#444" }, 
          "&:hover fieldset": { borderColor: "#888" }, 
          "&.Mui-focused fieldset": { borderColor: "#ffffff" }, 
        }}
        error={passwordError}
        />
        </Box>
      

      {/* Confirm Password */}
      <Box sx={{ position: "relative", width: {
          xs: "90%",
          sm: "85%",
          md: "85%",
          lg: "85%",
        }}}>
        <TextField
          value={formFields.confirmPassword}
          onChange={handleChange}
          onBlur={handleComparePassword}
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm password"
          variant="outlined"
          required
          size="small"
          sx={{
            width: "100%",
            backgroundColor: "#1F2A38", 
            input: { color: "#ffffff" }, 
            label: { color: "#cccccc" },
            fieldset: { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#888" }, 
            "&.Mui-focused fieldset": { borderColor: "#ffffff" },
          }}
          error={passwordError}
        />
        {errors.comparePasswordError && (
          <Typography
            variant="p"
            sx={{
              color: "red",
              fontSize: "0.8rem",
            }}
          >
            {errors.comparePasswordError}
          </Typography>
        )}
      </Box>

      {/* Submit Button */}
      <Button type="submit" variant="contained" size="large" sx={{ backgroundColor: "#FFC107", color: "#141E27", fontWeight: "500", '&:hover': { backgroundColor: "#e0a800" } }}>
        Sign up
      </Button>
  
      {/* Login Link */}
      <Typography variant="p" sx={{ color: "#ffffff" }} gutterBottom>
        Already have an account?{" "}
        <Link component={RouterLink} to="/" sx={{ color: "#66B2FF" }}>
          Sign in 
        </Link>
      </Typography>
    </Grid>
  );
};

export default RegistrationForm;
