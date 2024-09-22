import { action, makeAutoObservable, observable } from "mobx";
import { KeyPoints } from "../types/routes.type";
import {
  IRoutesPoints,
  IWaypointsList,
} from "../interfaces/pages/routes.interface";

class RoutesStore {
  @observable switchLayout: boolean = false;
  @observable index = -1;

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

  @observable routesWayPoints: IWaypointsList[] = [
    {
      id: 1,
      name: "My First Route",
      waypoints: [
        {
          lat: 0,
          lng: 0,
        },
        {
          lat: 0,
          lng: 0,
        },
      ],
    },
    {
      id: 2,
      name: "Brest - St-Nazaire",
      waypoints: [
        {
          lat: 0,
          lng: 0,
        },
        {
          lat: 0,
          lng: 0,
        },
      ],
    },
    {
      id: 3,
      name: "Le Havre - Rotterdam",
      waypoints: [
        {
          lat: 0,
          lng: 0,
        },
        {
          lat: 0,
          lng: 0,
        },
      ],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setSwitchLayout(value: boolean) {
    this.switchLayout = value;
  }
  // Action to create Route.
  @action async createRouteStore(object: any) {
    try {
      this.routesWayPoints.push(object);
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
  }
}
const routesStore = new RoutesStore();
export default routesStore;