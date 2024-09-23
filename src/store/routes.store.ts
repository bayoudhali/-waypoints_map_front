import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { KeyPoints } from "../types/routes.type";
import {
  IRoutesPoints,
  IWaypoints,
} from "../interfaces/pages/routes.interface";
import routeService from "../services/routes.service";

class RoutesStore {
  @observable switchLayout: number = 0;
  @observable index: string = "-1";
  @observable routingControlRef: any = null;

  @observable routesPoints: IRoutesPoints[] = [
    {
      index: 0,
      lat: 0,
      lng: 0,
    },
    {
      index: 1,
      lat: 0,
      lng: 0,
    },
    {
      index: 2,
      lat: 0,
      lng: 0,
    },
  ];

  @observable routesWayPoints: IWaypoints[] = [];

  @observable routeWayPoints: IWaypoints = {
    id: "",
    name: "",
    waypoints: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  @action setSwitchLayout(value: number) {
    this.switchLayout = value;
  }

  // Action to get the list of routes
  @action async getListOfRoutes() {
    try {
      const response: IWaypoints[] = await routeService.getListRoutes();
      this.routesWayPoints = response;
      return response;
    } catch (err) {
      throw err;
    }
  }
  // Action to get route by id
  @action async getRouteById(id: string) {
    try {
      const response: IWaypoints = await routeService.getRouteById(id);
      this.routeWayPoints = response;
      const routesWithIndex: IRoutesPoints[] = response.waypoints.map(
        (point, index) => ({
          index: index,
          lat: point.lat,
          lng: point.lng,
        })
      );
      this.routesPoints = routesWithIndex;
      this.setChangeIndex("100");
      return response;
    } catch (err) {
      throw err;
    }
  }
  // Action to create Route.
  @action async createRouteStore(route: IWaypoints) {
    try {
      await routeService.createRoute(route);
      this.removeWaypointsMap();
      this.resetStore();
    } catch (err) {}
  }
  // Action to update Route.
  @action async updateRouteStore(id: string, route: IWaypoints) {
    try {
      await routeService.updateRoute(id, route);
      this.removeWaypointsMap();
      this.resetStore();
    } catch (err) {}
  }

  // Action to Remove a route by id
  @action async removeRoute(id: string) {
    try {
      await routeService.deleteRouteById(id);
    } catch (err) {}
  }

  setChangeWayPoint(index: number, key: KeyPoints, value: number) {
    this.routesPoints[index][key] = value;
    this.routeWayPoints.waypoints = [];
    this.routeWayPoints.waypoints = this.routesPoints;
  }
  setChangeIndex(index: string) {
    this.index = index;
  }

  // Remove a waypoint by index
  removeWayPoint(index: number) {
    if (index >= 0 && index < this.routesPoints.length) {
      this.routesPoints.splice(index, 1);
    }
  }

  setRoutingControlRef(value: any) {
    this.routingControlRef = value;
  }
  @action removeWaypointsMap() {
    const routingControl = this.routingControlRef.current;
    if (routingControl) {
      routingControl.setWaypoints([]);
    }
  }
  @action resetStore() {
    runInAction(() => {
      this.routesPoints = [
        {
          index: 0,
          lat: 0,
          lng: 0,
        },
        {
          index: 1,
          lat: 0,
          lng: 0,
        },
        {
          index: 2,
          lat: 0,
          lng: 0,
        },
      ];

      this.routeWayPoints = {
        id: "",
        name: "",
        waypoints: [],
      };
      this.routesWayPoints = [];
    });
  }
}
const routesStore = new RoutesStore();
export default routesStore;
