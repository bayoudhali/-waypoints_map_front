import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import L from "leaflet";
import "../../styles/components/addRoute.css";
import {
  Button,
  FormHelperText,
  IconButton,
  TextField,
} from "@material-ui/core";
import { ChevronLeft, Delete, Add, ErrorOutline } from "@mui/icons-material";
import { useGlobalContext } from "../../context/useGlobalContext";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const EditRoute = observer(() => {
  const { routesStore } = useGlobalContext();
  const [routeName, setRouteName] = useState(routesStore.routeWayPoints.name);
  const [errorMsgExist, setMsgExist] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    const updatedRoutes: any = routesStore.routesPoints.map((route, index) => {
      return L.latLng(route.lat || 0, route.lng || 0);
    });
    routesStore.setRoutes(updatedRoutes);
  }, []);

  const updateRoute = async (payload: any) => {
    if (routesStore.routesPoints.length < 2) {
      setMsgExist(true);
      return;
    }

    try {
      let routeObjet = {
        id: uuidv4(),
        name: payload.routeName,
        waypoints: routesStore.routesPoints,
      };
      await routesStore.updateRouteStore(
        routesStore.routeWayPoints.id,
        routeObjet
      );
      setMsgExist(false);
      routesStore.setSwitchLayout(0);
      routesStore.resetSotre();
    } catch (error) {}
  };

  return (
    <>
      <div className="titleContainer">
        <IconButton
          className="iconButton"
          onClick={() => routesStore.setSwitchLayout(0)}
        >
          <ChevronLeft />
        </IconButton>
        <h4 className="title">
          {routeName || routesStore.routeWayPoints.name}
        </h4>
      </div>
      <div className="wayPointsContainer">
        <h4 className="step">Route Name</h4>
        <div className="routeNameContainer">
          <Controller
            control={control}
            name={"routeName"}
            defaultValue={routesStore.routeWayPoints.name}
            rules={{
              required: {
                value: true,
                message: `The route name required`,
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                placeholder="Entre Route Name"
                className="routeName"
                variant="outlined"
                value={value || routesStore.routeWayPoints.name}
                onChange={(event) => {
                  onChange(event);
                  setRouteName(event.target.value);
                }}
              />
            )}
          />
          {errors?.routeName &&
            typeof errors.routeName.message === "string" && (
              <FormHelperText error className="error-input">
                <ErrorOutline /> {errors?.routeName.message}
              </FormHelperText>
            )}
        </div>
      </div>

      <div className="wayPointsContainer">
        <h4 className="step">Step</h4>
        <h4 className="latitude">Latitude</h4>
        <h4 className="longitude">Longitude</h4>
      </div>

      {routesStore.routeWayPoints &&
        routesStore.routeWayPoints.waypoints.map(
          (route: any, index: number) => (
            <div className="wayPointsContainer">
              <h4 className="step">WP{`${index + 1}`}</h4>
              <Controller
                control={control}
                name={`lat-${index + 1}`}
                defaultValue={route.lat}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className="inputText"
                    variant="outlined"
                    value={value}
                    onChange={(event) => {
                      onChange(event);
                      routesStore.setChangeIndex(index);
                      routesStore.setChangeWayPoint(
                        index,
                        "lat",
                        parseFloat(event.target.value)
                      );
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name={`lng-${index + 1}`}
                defaultValue={route.lng}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className="inputTextLon"
                    variant="outlined"
                    value={value}
                    onChange={(event) => {
                      onChange(event);
                      routesStore.setChangeIndex(index + 1);
                      routesStore.setChangeWayPoint(
                        index,
                        "lng",
                        parseFloat(event.target.value)
                      );
                    }}
                  />
                )}
              />
              <IconButton
                className="deleteButton"
                onClick={() => {
                  routesStore.setChangeIndex(index);
                  routesStore.removeWayPoint(index);
                }}
              >
                <Delete />
              </IconButton>
            </div>
          )
        )}

      {errorMsgExist && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FormHelperText error className="error-input">
            <ErrorOutline /> The route contains 2 waypoints in minimum
          </FormHelperText>
        </div>
      )}
      <Button
        variant="contained"
        onClick={handleSubmit(updateRoute)}
        className="addButton"
        startIcon={<Add />}
      >
        Edit Route
      </Button>
    </>
  );
});

export default EditRoute;
