import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import error404 from "./assets/404.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "90vh",
    height: "100%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 20px",
    },
  },
  img: {
    width: "300px",
    height: "auto",
  },
  text2: {
    fontFamily: "'Poppins', sans-serif",
    paddingBottom: "13px",
    fontWeight: "500",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },
  text3: {
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    paddingBottom: "13px",
    fontWeight: "200",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
      textAlign: "center",
    },
  },
}));

function NotFound(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className={classes.root}>
      <img src={error404} alt={"error 404"} className={classes.img} />
      <Typography variant="h5" className={classes.text2}>
        Opps! page not found
      </Typography>
      <Typography variant="subtitle1" className={classes.text3}>
        The page you were looking for doesn't exist.
        <br /> You may have misspelled the address or the page has been moved
      </Typography>
      <br />
      <Button
        component={Link}
        to="/"
        variant="outlined"
        color="primary"
        size={matches ? "small" : "medium"}
      >
        Go back to home
      </Button>
    </div>
  );
}

export default NotFound;
