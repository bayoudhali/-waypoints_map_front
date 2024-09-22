import React from "react";
import { IListRoutes } from "../../interfaces/components/routes.interface";
import "../../styles/components/listRoutes.css";
import { Button } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../../context/useGlobalContext";
import { observer } from "mobx-react";

const ListRoutes = observer(() => {
  const { routesStore } = useGlobalContext();
  return (
    <>
      <div className="titleContainerList">
        <h4 className="title">Routes</h4>
        <Button variant="contained" className="add-button">
          Add
        </Button>
      </div>
      {routesStore.routesWayPoints.map((route) => (
        <div key={route.id} className="routesContainer">
          <div className="routeNameList">{route.name}</div>

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
      <Button
        variant="contained"
        className="createButton"
        onClick={() => routesStore.setSwitchLayout(true)}
      >
        + Add New Route
      </Button>
    </>
  );
});

export default ListRoutes;
