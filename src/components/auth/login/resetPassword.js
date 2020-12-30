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

function ResetPassword(props) {
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const uid = props.match.params.uid;
    const token = props.match.params.token;
    setUid(uid);
    setToken(token);
  }, [props]);

  useEffect(() => {
    if (props.isAuthenticated) {
      window.location.replace("/");
    }
  });

  useEffect(() => {
    if (success) {
      window.location.replace("/login");
    }
  });

  const handleSubmit = (e) => {
    console.log(newPassword1, newPassword2, uid, token);
    e.preventDefault();
    setLoading(true);
    setError({});
    axios
      .post(`${DOMAIN}/auth/password/reset/confirm/`, {
        new_password1: newPassword1,
        new_password2: newPassword2,
        uid,
        token,
      })
      .then((res) => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(JSON.parse(err.request.response));
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
          Reset Password
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
                id="newPassword1"
                label="New Password"
                name="newPassword1"
                type="password"
                value={newPassword1}
                onChange={(e) => {
                  setNewPassword1(e.target.value);
                }}
                error={error && error.new_password2 ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                name="newPassword2"
                label="Confirm Password"
                type="password"
                id="newPassword2"
                value={newPassword2}
                onChange={(e) => {
                  setNewPassword2(e.target.value);
                }}
                autoComplete="current-password"
                error={error && error.new_password2 ? true : false}
                helperText={
                  error && error.new_password2
                    ? error && error.new_password2[0]
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

export default ResetPassword;
