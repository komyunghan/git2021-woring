import React, { Component } from "react";
// import { Grid, Typography } from "@material-ui/core";
import RangeSlider from "./RangeSlider";

class Range extends Component {
  render() {
    const price = this.props.rooms.map((p) => p.price);
    return (
      <Grid container justify="center">
        <Grid item xs={12} lg={8}>
          <RangeSlider price={price} />
        </Grid>
      </Grid>
    );
  }
}

export default Range;