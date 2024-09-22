import { IWaypoints } from "../interfaces/pages/routes.interface";
import { ApiPaths } from "../utils/constants/APIs";
import { get, post } from "../utils/functions/httpMethods";

class RouteService {
  async getListRoutes() {
    try {
      const result: IWaypoints[] = await get(ApiPaths.ROUTE, {});
      return result;
    } catch (error: any) {
      throw error;
    }
  }
  async createRoute(payload: IWaypoints) {
    try {
      const result = await post(ApiPaths.ROUTE, payload, {});
      return result;
    } catch (error: any) {
      throw error;
    }
  }
}

const routeService = new RouteService();
export default routeService;
