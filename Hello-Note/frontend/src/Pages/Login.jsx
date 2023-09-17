import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import login from "../static/images/login.png";
import { useState } from "react";
import { UserAuth } from "../Contexts/AuthContext";
import { useNavigate } from 'react-router-dom';



const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const { signIn, signInGoogle, user } = UserAuth();

  // Get email and password from sign in page
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createUser = async () => {
    const body = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
    }
    console.log(body);
    axios.post("http://localhost:3001/createuser", body)
    .then(res => console.log(res ));
  }


  const { email, password } = formData;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(formData.email, formData.password)
      navigate('/Dashboard')
    } catch (e) {
      console.log(e.message)
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInGoogle()
      createUser();
        
      navigate('/Dashboard')
    } catch (err) {
      console.log("Error", e)
    }

    
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${login})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "0% 85%",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
              Welcome To Hello-Note
            </Typography>
            <Typography
              component="h6"
              variant="body1"
              sx={{ color: "text.disabled" }}
            >
              Sign in your account
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChange}
                value={password}
                autoComplete="current-password"
              />
              <Grid container>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Grid item xs sx={{ textAlign: "right", marginTop: "8px" }}>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ textDecoration: "none" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 5, bgcolor: "#6d8de9" }}
              >
                Sign In
              </Button>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      Sign in with &nbsp;&nbsp;
                      <Link>
                        { }
                        
                        <FcGoogle
                        cursor={ "pointer" }
                        size={30}
                        className="login-button"
                        onClick={handleGoogleSignIn}
                        />
                  
                      </Link>
                      &nbsp;&nbsp;
      
                    </span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <p>
                    Don't have an account?&nbsp;
                    <Link
                      href="/register"
                      color="#2196f3"
                      sx={{ textDecoration: "none" }}
                    >
                      Sign up
                    </Link>
                  </p>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
