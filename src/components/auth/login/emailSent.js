import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

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

function EmailSent(props) {
  const classes = useStyles();

  useEffect(() => {
    if (props.isAuthenticated) {
      window.location.replace("/");
    }
  });

  return (
    <div className={classes.root}>
      <Container className={classes.container} component="main" maxWidth="xs">
        <Box mt={5} className={classes.box}>
          <Typography
            variant="h5"
            color="textSecondary"
            style={{ color: "#2eb82e" }}
          >
            E-mail Sent Successfully!
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary">
            An e-mail with password reset link has been sent to your email
            address,
          </Typography>
          <br />
          <Typography
            component={Link}
            to="/login"
            variant="body2"
            color="textSecondary"
            style={{ color: "#0033cc" }}
          >
            Continue to Login
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default EmailSent;
