import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";

export default function Title({ children, color }) {
  return (
    <Typography component="h2" variant="h6" style={{ color }} gutterBottom>
      {children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
