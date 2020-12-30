import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { DOMAIN } from "../../../store/utility";
import { Link } from 'react-router-dom'
import axios from "axios";

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

function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      window.location.replace("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    axios
      .post(`${DOMAIN}/auth/login/`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.key)
        localStorage.setItem("user", JSON.stringify(res.data.user))
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                autoFocus
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
                error={error && error.non_field_errors ? true : false}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
                error={error && error.non_field_errors ? true : false}
                helperText={
                  error && error.non_field_errors
                    ? error && error.non_field_errors[0]
                    : ""
                }
              />
            </Grid>
            <Grid item>
              <Link to="/login/forgot-password">
                Forgot Password?
              </Link>
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
              <Link to="/signup">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LogIn;
