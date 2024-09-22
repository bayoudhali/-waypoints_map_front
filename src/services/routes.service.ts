import { IWaypointsList } from "../interfaces/pages/routes.interface";
import { ApiPaths } from "../utils/constants/APIs";
import { get } from "../utils/functions/httpMethods";

class RouteService {
  async getListRoutes() {
    try {
      const result: IWaypointsList[] = await get(ApiPaths.GET_ALL_ROUTES, {});
      return result;
    } catch (error: any) {
      throw error;
    }
  }
}

const routeService = new RouteService();
export default routeService;
