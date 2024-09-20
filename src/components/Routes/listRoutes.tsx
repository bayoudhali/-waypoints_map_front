import React from "react";
import { IListRoutes } from "../../interfaces/components/routes.interface";
import "../../styles/components/listRoutes.css";
import { Button, IconButton } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ListRoutes(props: IListRoutes) {
  const { routes } = props;
  return (
    <>
      <div className="titleContainer">
        <h4 className="title">Routes</h4>
        <Button variant="contained" className="add-button">
          Add
        </Button>
      </div>
      {routes.map((route) => (
        <div key={route.id} className="routesContainer">
          <div className="routeName ">{route.name}</div>

          <EditIcon
            //   onClick={() => editRoute(route.id)}
            className="editButton"
          />
          <DeleteIcon
            // onClick={() => deleteRoute(route.id)}
            className="deleteButton"
          />
        </div>
      ))}
      <Button variant="contained" className="createButton">
        + Add New Route
      </Button>
    </>
  );
}

export default ListRoutes;
