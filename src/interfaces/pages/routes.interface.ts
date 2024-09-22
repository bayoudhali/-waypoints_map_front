export interface IWaypoints {
  id: string;
  name: string;
  waypoints: {
    lat: number;
    lng: number;
  }[];
}
export interface IRoutesPoints {
  index: number;
  lat: number;
  lng: number;
}
