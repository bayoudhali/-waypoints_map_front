import { action, makeAutoObservable, observable } from "mobx";
import { KeyPoints } from "../types/routes.type";
import {
  IRoutesPoints,
  IWaypoints,
} from "../interfaces/pages/routes.interface";
import routeService from "../services/routes.service";

class RoutesStore {
  @observable switchLayout: number = 0;
  @observable index = -1;
  @observable routes = [];

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

  @action setRoutes(value: []) {
    this.routes = value;
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
      return response;
    } catch (err) {
      throw err;
    }
  }
  // Action to create Route.
  @action async createRouteStore(route: IWaypoints) {
    try {
      await routeService.createRoute(route);
    } catch (err) {}
  }
  // Action to update Route.
  @action async updateRouteStore(id: string, route: IWaypoints) {
    try {
      await routeService.updateRoute(id, route);
    } catch (err) {}
  }

  setChangeWayPoint(index: number, key: KeyPoints, value: number) {
    this.routesPoints[index][key] = value;
  }
  setChangeIndex(index: number) {
    this.index = index;
  }

  // Remove a waypoint by index
  removeWayPoint(index: number) {
    if (index >= 0 && index < this.routesPoints.length) {
      this.routesPoints.splice(index, 1);
    }
  }
  // Remove a waypoint by index
  removeRoute(index: number) {
    if (index >= 0 && index < this.routesWayPoints.length) {
      this.routesWayPoints.splice(index, 1);
    }
  }

  @action resetSotre() {
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
    this.routes = [];
  }
}
const routesStore = new RoutesStore();
export default routesStore;
