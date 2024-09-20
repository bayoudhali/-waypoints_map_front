import "./App.css";
import Map from "./components/map";
import "leaflet/dist/leaflet.css";
import ListRoutes from "./components/Routes/listRoutes";
import { useState } from "react";

function App() {
  const [routes, setRoutes] = useState([
    { id: 1, name: "My First Route" },
    { id: 2, name: "Brest - St-Nazaire" },
    { id: 3, name: "Le Havre - Rotterdam" },
  ]);
  return (
    <div className="App" style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "75%" }}>
        <Map />
      </div>
      <div style={{ width: "25%", backgroundColor: "#152534" }}>
        <ListRoutes routes={routes} />
      </div>
    </div>
  );
}

export default App;
