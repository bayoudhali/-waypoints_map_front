import "./App.css";
import Map from "./components/map";
import "leaflet/dist/leaflet.css";
import ListRoutes from "./components/Routes/listRoutes";
import { useState } from "react";
import AddRoute from "./components/Routes/addRoute";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";
import { useGlobalContext } from "./context/useGlobalContext";
import EditRoute from "./components/Routes/editRoute";

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
            in={routesStore.switchLayout === 0 ? true : false}
            timeout={0}
            classNames="fade"
            unmountOnExit
          >
            <ListRoutes />
          </CSSTransition>

          <CSSTransition
            in={routesStore.switchLayout === 1 ? true : false}
            timeout={0}
            classNames="fade"
            unmountOnExit
          >
            <AddRoute />
          </CSSTransition>
          <CSSTransition
            in={routesStore.switchLayout === 2 ? true : false}
            timeout={0}
            classNames="fade"
            unmountOnExit
          >
            <EditRoute />
          </CSSTransition>
        </div>
      </div>
    </div>
  );
});

export default App;
