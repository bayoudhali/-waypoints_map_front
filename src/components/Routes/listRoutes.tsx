import React, { useEffect } from "react";
import "../../styles/components/listRoutes.css";
import { Button } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../../context/useGlobalContext";
import { observer } from "mobx-react";

const ListRoutes = observer(() => {
  const { routesStore } = useGlobalContext();
  useEffect(() => {
    routesStore.getListOfRoutes();
  }, []);

  const handleEdit = (id: string) => {
    routesStore.removeWaypointsMap();
    routesStore.setSwitchLayout(2);
    routesStore.getRouteById(id);
  };

  const handleDelete = async (id: string) => {
    try {
      await routesStore.removeRoute(id);
      await routesStore.getListOfRoutes();
    } catch (error) {}
  };

  return (
    <>
      <div className="titleContainerList">
        <h4 className="title">Routes</h4>
        <Button variant="contained" className="add-button">
          Add
        </Button>
      </div>
      {routesStore.routesWayPoints.map((route, index) => (
        <div key={route.id} className="routesContainer">
          <div className="routeNameList">{route.name}</div>

          <EditIcon
            onClick={() => handleEdit(route.id)}
            className="editButton"
          />
          <DeleteIcon
            onClick={() => handleDelete(route.id)}
            className="deleteButton"
          />
        </div>
      ))}
      <Button
        variant="contained"
        className="createButton"
        onClick={() => routesStore.setSwitchLayout(1)}
      >
        + Add New Route
      </Button>
    </>
  );
});

export default ListRoutes;
