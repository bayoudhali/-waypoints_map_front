import React from "react";
import "../../styles/components/addRoute.css";
import { Button, IconButton, TextField } from "@material-ui/core";
import { ChevronLeft, Delete, Add } from "@mui/icons-material";

function AddRoute() {
  return (
    <>
      <div className="titleContainer">
        <IconButton className="iconButton">
          <ChevronLeft />
        </IconButton>
        <h4 className="title">My First Route</h4>
      </div>
      <div className="wayPointsContainer">
        <h4 className="step">Route Name</h4>
        <TextField className="routeName" variant="outlined" />
      </div>
      <div className="wayPointsContainer">
        <h4 className="step">Step</h4>
        <h4 className="latitude">Latitude</h4>
        <h4 className="longitude">Longitude</h4>
      </div>
      <div className="wayPointsContainer">
        <h4 className="step">WP1</h4>
        <TextField className="inputText" variant="outlined" />
        <TextField className="inputTextLon" variant="outlined" />
        <IconButton className="deleteButton">
          <Delete />
        </IconButton>
      </div>
      <div className="wayPointsContainer">
        <h4 className="step">WP1</h4>
        <TextField className="inputText" variant="outlined" />
        <TextField className="inputTextLon" variant="outlined" />
        <IconButton className="deleteButton">
          <Delete />
        </IconButton>
      </div>
      <div className="wayPointsContainer">
        <h4 className="step">WP1</h4>
        <TextField className="inputText" variant="outlined" />
        <TextField className="inputTextLon" variant="outlined" />
        <IconButton className="deleteButton">
          <Delete />
        </IconButton>
      </div>
      <Button variant="contained" className="addButton" startIcon={<Add />}>
        Add New Route
      </Button>
    </>
  );
}

export default AddRoute;
