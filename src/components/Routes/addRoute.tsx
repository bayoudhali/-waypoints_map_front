import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
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
import { IWaypoints } from "../../interfaces/pages/routes.interface";

const AddRoute = observer(() => {
  const { routesStore } = useGlobalContext();
  const [routeName, setRouteName] = useState("");
  const [errorMsgExist, setMsgExist] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const createRoute = async (payload: any) => {
    if (routesStore.routesPoints.length < 2) {
      setMsgExist(true);
      return;
    }

    try {
      let routeObjet: IWaypoints = {
        id: uuidv4(),
        name: payload.routeName,
        waypoints: routesStore.routesPoints,
      };
      await routesStore.createRouteStore(routeObjet);
      setMsgExist(false);
      routesStore.setSwitchLayout(0);
    } catch (error) {}
  };

  return (
    <>
      <div className="titleContainer">
        <IconButton
          className="iconButton"
          onClick={() => {
            routesStore.setSwitchLayout(0);
            routesStore.resetStore();
          }}
        >
          <ChevronLeft />
        </IconButton>
        <h4 className="title">{routeName}</h4>
      </div>
      <div className="wayPointsContainer">
        <h4 className="step">Route Name</h4>
        <div className="routeNameContainer">
          <Controller
            control={control}
            name={"routeName"}
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
                value={value}
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

      {routesStore.routesPoints.length !== 0 &&
        routesStore.routesPoints.map((route: any, index: number) => (
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
                    routesStore.setChangeIndex(uuidv4());
                    routesStore.setChangeWayPoint(
                      index,
                      "lat",
                      parseFloat(event.target.value)
                    );
                    routesStore.setChangeIndex(uuidv4());
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
                    routesStore.setChangeIndex(uuidv4());
                    routesStore.setChangeWayPoint(
                      index,
                      "lng",
                      parseFloat(event.target.value)
                    );
                    routesStore.setChangeIndex(uuidv4());
                  }}
                />
              )}
            />
            <IconButton
              className="deleteButton"
              onClick={() => {
                routesStore.setChangeIndex(uuidv4());
                routesStore.removeWayPoint(index);
              }}
            >
              <Delete />
            </IconButton>
          </div>
        ))}

      {errorMsgExist && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FormHelperText error className="error-input">
            <ErrorOutline /> The route contains 2 waypoints in minimum
          </FormHelperText>
        </div>
      )}
      <Button
        variant="contained"
        onClick={handleSubmit(createRoute)}
        className="addButton"
        startIcon={<Add />}
      >
        Add New Route
      </Button>
    </>
  );
});

export default AddRoute;
