import React, { useEffect, useRef, useState } from "react";
import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { observer } from "mobx-react";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "../../context/useGlobalContext";

const Map = observer(() => {
  const { routesStore } = useGlobalContext();
  const [routes, setRoutes] = useState([]);

  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (routesStore.index !== "-1" && routesStore.routesPoints.length !== 0) {
      routesStore.removeWaypointsMap();
      const updatedRoutes = routesStore.routesPoints.map((route, index) => {
        if (route.lat !== 0 && route.lng !== 0) {
          return L.latLng(route.lat || 0, route.lng || 0);
        }
      });

      setRoutes(updatedRoutes);
    }
  }, [routesStore.index, routesStore.routesPoints]);

  const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const createRoutingMachineLayer = () => {
    const routingControl = L.Routing.control({
      position: "topleft",
      display: "none",
      waypoints: routes,
      draggableWaypoints: true,
      createMarker: function (index, waypoint, n) {
        const marker = L.marker(waypoint.latLng, {
          icon: DefaultIcon,
          draggable: true,
        });
        marker.on("dragend", function (event) {
          const newCoords = event.target.getLatLng();
          console.log(
            `Waypoint ${index + 1} has been dragged to:`,
            newCoords.lat,
            newCoords.lng
          );
          routesStore.setChangeWayPoint(index, "lat", newCoords.lat);
          routesStore.setChangeWayPoint(index, "lng", newCoords.lng);
        });

        return marker;
      },

      lineOptions: {
        styles: [{ color: "#757de8" }],
      },
    });
    routingControlRef.current = routingControl;
    routesStore.setRoutingControlRef(routingControlRef);
    return routingControl;
  };

  const RoutingMachine = createControlComponent(createRoutingMachineLayer);

  // Function to remove waypoints
  // const removeWaypoints = () => {
  //   const routingControl = routingControlRef.current;
  //   if (routingControl) {
  //     routingControl.setWaypoints([]); // Remove all waypoints
  //   }
  // };

  return (
    <MapContainer
      center={[37.0902, -95.7129]}
      zoom={3}
      zoomControl={false}
      style={{ height: "100vh", width: "100%", padding: 0 }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <RoutingMachine />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Map">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  );
});

export default Map;
