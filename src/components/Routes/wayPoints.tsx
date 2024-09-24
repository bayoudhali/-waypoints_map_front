import { IconButton, TextField } from "@material-ui/core";
import { Delete } from "@mui/icons-material";
import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IWayPoints } from "../../interfaces/components/routes.interface";

const WayPoints = observer((props: IWayPoints) => {
  const { routesStore } = props;
  const debounceRef = useRef<any>(null);
  const { control, setValue } = useForm<any>();
  const handleDebouncedInputChange = (event: any, callback: any) => {
    const value = event.target.value;

    if (debounceRef.current) {
      routesStore.removeWaypointsMap();
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      callback(value);
    }, 20);
  };

  useEffect(() => {
    routesStore.routesPoints.forEach((route: any, index: number) => {
      setValue(`lat-${index + 1}`, route.lat);
      setValue(`lng-${index + 1}`, route.lng);
    });
  }, [setValue, routesStore.isDraggble]);

  return (
    <div>
      {" "}
      {routesStore.routesPoints.length !== 0 &&
        routesStore.routesPoints.map((route: any, index: number) => (
          <div className="wayPointsContainer" key={index}>
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
                  value={value || route.lat}
                  onChange={(event) => {
                    onChange(event);
                    routesStore.setChangeIndex(uuidv4());
                    handleDebouncedInputChange(event, (val: any) => {
                      routesStore.setChangeWayPoint(
                        index,
                        "lat",
                        parseFloat(val)
                      );
                    });
                    routesStore.setChangeIndex(uuidv4());
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name={`lng-${index + 1}`}
              defaultValue={route.lng || route.lat}
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
                    handleDebouncedInputChange(event, (val: any) => {
                      routesStore.setChangeWayPoint(
                        index,
                        "lng",
                        parseFloat(val)
                      );
                    });
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
    </div>
  );
});

export default WayPoints;
