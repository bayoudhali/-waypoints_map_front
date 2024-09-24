import "./App.css";
import Map from "./components/map";
import "leaflet/dist/leaflet.css";
import ListRoutes from "./components/Routes/listRoutes";
import AddRoute from "./components/Routes/addRoute";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";
import { useGlobalContext } from "./context/useGlobalContext";
import EditRoute from "./components/Routes/editRoute";

const App = observer(() => {
  const { routesStore } = useGlobalContext();

  const layoutComponents = [
    { component: <ListRoutes />, layoutIndex: 0 },
    { component: <AddRoute />, layoutIndex: 1 },
    { component: <EditRoute />, layoutIndex: 2 },
  ];

  return (
    <div className="app">
      <div className="mapContainer">
        <Map />
      </div>
      <div className="routeLeftContainer">
        <div>
          {layoutComponents.map(({ component, layoutIndex }) => (
            <CSSTransition
              key={layoutIndex}
              in={routesStore.switchLayout === layoutIndex}
              timeout={0}
              classNames="fade"
              unmountOnExit
            >
              {component}
            </CSSTransition>
          ))}
        </div>
      </div>
    </div>
  );
});

export default App;
