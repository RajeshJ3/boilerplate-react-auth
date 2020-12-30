import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState, useEffect } from "react";
import { DOMAIN } from "../../../store/utility";
import axios from "axios";
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  passwordRules: {
    color: "#888",
  },
}));

function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (props.isAuthenticated) {
      window.location.replace("/");
    }
  });

  useEffect(() => {
    if (success) {
      window.location.replace("/signup/email-sent");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    axios
      .post(`${DOMAIN}/auth/registration/`, {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password1,
        password2,
      })
      .then((res) => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(JSON.parse(err.request.response));
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                size="small"
                id="firstName"
                label="First Name"
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                error={error && error.first_name ? true : false}
                helperText={
                  error && error.first_name ? error && error.first_name[0] : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                id="lastName"
                label="Last Name"
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                error={error && error.last_name ? true : false}
                helperText={
                  error && error.last_name ? error && error.last_name[0] : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={error && error.email ? true : false}
                helperText={error && error.email ? error && error.email[0] : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                error={error && error.username ? true : false}
                helperText={
                  error && error.username ? error && error.username[0] : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password1}
                onChange={(e) => {
                  setPassword1(e.target.value);
                }}
                autoComplete="current-password"
                error={error && error.password1 ? true : false}
                helperText={
                  error && error.password1 ? error && error.password1[0] : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="current-password"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                error={error && error.non_field_errors ? true : false}
                helperText={
                  error && error.non_field_errors
                    ? error && error.non_field_errors[0]
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            size="small"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading || success ? true : false}
          >
            {loading ? "Loading.." : success ? "Success" : "Sign Up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
