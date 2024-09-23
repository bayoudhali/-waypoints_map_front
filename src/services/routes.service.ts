import { IWaypoints } from "../interfaces/pages/routes.interface";
import { ApiPaths } from "../utils/constants/APIs";
import { deleteApi, get, post, put } from "../utils/functions/httpMethods";

class RouteService {
  async getListRoutes() {
    try {
      const result: IWaypoints[] = await get(ApiPaths.ROUTE, {});
      return result;
    } catch (error: any) {
      throw error;
    }
  }
  async getRouteById(id: string) {
    try {
      const result: IWaypoints = await get(`${ApiPaths.ROUTE}/${id}`, {});
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
  async updateRoute(id: string, payload: IWaypoints) {
    try {
      const result = await put(`${ApiPaths.ROUTE}/${id}`, payload, {});
      return result;
    } catch (error: any) {
      throw error;
    }
  }
  async deleteRouteById(id: string) {
    try {
      const result = await deleteApi(`${ApiPaths.ROUTE}/${id}`, {}, {});
      return result;
    } catch (error: any) {
      throw error;
    }
  }
}

const routeService = new RouteService();
export default routeService;
