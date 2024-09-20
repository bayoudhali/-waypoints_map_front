import "./App.css";
import Map from "./components/map";
import "leaflet/dist/leaflet.css";
import ListRoutes from "./components/Routes/listRoutes";
import { useState } from "react";
import AddRoute from "./components/Routes/addRoute";
import { CSSTransition } from "react-transition-group";

function App() {
  const [showFirst, setShowFirst] = useState(true);

  const toggleComponent = () => {
    setShowFirst(!showFirst);
  };
  const [routes, setRoutes] = useState([
    { id: 1, name: "My First Route" },
    { id: 2, name: "Brest - St-Nazaire" },
    { id: 3, name: "Le Havre - Rotterdam" },
  ]);
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "75%" }}>
        <Map />
      </div>
      <div style={{ width: "25%", backgroundColor: "#152534" }}>
        <div className="App">
          <button onClick={toggleComponent}>Toggle Components</button>

          <CSSTransition
            in={!showFirst}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <ListRoutes routes={routes} />
          </CSSTransition>

          <CSSTransition
            in={showFirst}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <AddRoute />
          </CSSTransition>
        </div>
      </div>
    </div>
  );
}

export default App;
