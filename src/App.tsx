import "./App.css";
import Map from "./components/map";
import "leaflet/dist/leaflet.css";
import ListRoutes from "./components/Routes/listRoutes";
import { useState } from "react";
import AddRoute from "./components/Routes/addRoute";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";
import { useGlobalContext } from "./context/useGlobalContext";

const App = observer(() => {
  const { routesStore } = useGlobalContext();
  // const toggleComponent = () => {
  //   setShowFirst(!showFirst);
  // };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "75%" }}>
        <Map />
      </div>
      <div style={{ width: "25%", backgroundColor: "#152534" }}>
        <div className="App">
          <CSSTransition
            in={!routesStore.switchLayout}
            timeout={0}
            classNames="fade"
            unmountOnExit
          >
            <ListRoutes />
          </CSSTransition>

          <CSSTransition
            in={routesStore.switchLayout}
            timeout={0}
            classNames="fade"
            unmountOnExit
          >
            <AddRoute />
          </CSSTransition>
        </div>
      </div>
    </div>
  );
});

export default App;
