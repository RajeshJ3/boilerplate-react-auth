import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { DOMAIN } from "../../../store/utility";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fafafa",
    height: "100vh",
  },
  container: {
    position: "relative",
    height: "80%",
  },
  box: {
    backgroundColor: "#f1f1f1",
    position: "absolute",
    top: "50%",
    minWidth: "85%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "15px",
    borderRadius: "5px",
  },
}));

function SignUpSuccess(props) {
  const classes = useStyles();

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (props.isAuthenticated) {
      window.location.replace("/");
    }
  });

  useEffect(() => {
    const key = props.match.params.key;
    axios
      .post(`${DOMAIN}/auth/registration/account-confirm-email/`, {
        key,
      })
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);

  return (
    <div className={classes.root}>
      <Container className={classes.container} component="main" maxWidth="xs">
        <Box mt={5} className={classes.box}>
          <Typography variant="h5" color="textPrimary" align="center">
            Verifying email
            <br />
            <br />
            {success ? null : <CircularProgress color="secondary" />}
          </Typography>
          {success ? (
            <Typography variant="h6" color="textSecondary" align="center">
              Email Successfully verified!
              <Typography
                component={Link}
                to="/login"
                variant="body2"
                color="textSecondary"
                style={{ color: "#0033cc" }}
                align="center"
              >
                <br />
                Continue to Login
              </Typography>
            </Typography>
          ) : null}
        </Box>
      </Container>
    </div>
  );
}

export default SignUpSuccess;
