import React, { useEffect, useState } from "react";
import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { observer } from "mobx-react";
import { useGlobalContext } from "../../context/useGlobalContext";

const Map = observer(() => {
  const { routesStore } = useGlobalContext();

  useEffect(() => {
    if (routesStore.index !== -1) {
      const updatedRoutes = routesStore.routesPoints.map((route, index) => {
        return L.latLng(route.lat || 0, route.lng || 0);
      });

      routesStore.setRoutes(updatedRoutes);
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
      waypoints: routesStore.routes,
      draggableWaypoints: true,
      createMarker: function (i, waypoint, n) {
        return L.marker(waypoint.latLng, {
          icon: DefaultIcon,
          draggable: true,
        });
      },
      lineOptions: {
        styles: [{ color: "#757de8" }],
      },
    });

    return routingControl;
  };

  const RoutingMachine = createControlComponent(createRoutingMachineLayer);
  return (
    <MapContainer
      center={[37.0902, -95.7129]}
      zoom={3}
      zoomControl={false}
      style={{ height: "100vh", width: "100%", padding: 0 }}
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
