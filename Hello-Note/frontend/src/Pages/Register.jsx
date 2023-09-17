import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import register from "../static/images/register.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../Contexts/AuthContext";
const theme = createTheme();

const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    backgroundImage: `url(${register})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
  },
}));

export default function SignUp() {
  const navigate = useNavigate();
  const { createUser, updateDisplayName } = UserAuth();
  

  
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = async (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const displayName = firstName + " " + lastName;

  const addUserToDB = async () => {
    axios.post("http://localhost:3001/createuser",)
    .then(res => console.log(res ));
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password)
      const x = async () => {
        await updateDisplayName(displayName);
      }
      x();
      navigate('/');
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <Root>
      <ThemeProvider theme={theme}>
        <Grid
          container
          sx={{ height: "100vh", p: 2, justifyContent: "left", pl: 4 }}
          component="main"
        >
          <Grid item xs={12} md={6} elevation={3}>
            <Container maxWidth="xs" justifycontent="flex-end">
              <CssBaseline />

              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                }}
              >
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ fontWeight: "bold" }}
                >
                  Welcome To HelloNote
                </Typography>

                <Typography
                  component="h6"
                  variant="body1"
                  sx={{ color: "text.disabled" }}
                >
                  Already have an account?{" "}
                  <Link
                    href="login"
                    color="#2196f3"
                    sx={{ textDecoration: "none" }}
                  >
                    Log in.
                  </Link>
                </Typography>
                <Box component="form" noValidateç sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={firstName}
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        autoComplete="family-name"
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        type="text"
                        id="userEmail"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="new-password"
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value="allowExtraEmails" color="primary" />
                        }
                        label="I agree to the Terms, Privacy Policy and Fees."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 3, mb: 2, bgcolor: "#6d8de9" }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Root>
  );
}
