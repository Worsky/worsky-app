import { apiURLToken } from "~/services/api";
import { getToken } from "~/services/asyncStorageToken";

const api = {
  loadCategories: async () =>
    apiURLToken((await getToken()).token).get("/point-type"),

  loadPosts: async (
    latitude1,
    longitude1,
    latitude2,
    longitude2,
    zoom,
    point_type_id
  ) => {
    const { token } = await getToken();

    const params = new URLSearchParams();
    params.append("lat1", latitude1);
    params.append("lng1", longitude1);
    params.append("lat2", latitude2);
    params.append("lng2", longitude2);
    params.append("zoom", Math.round(zoom));
    if (point_type_id) params.append("point_type_id", point_type_id);

    const callUrl = `/map/nearby?${params.toString()}`;

    return apiURLToken(token).get(callUrl, {});
  },

  loadSearch: async (search, latitude, longitude) => {
    const { token } = await getToken();
    return apiURLToken(token).post("/v2/search", null, {
      params: { search, lat: latitude, lng: longitude }
    });
  }
};

export default api;
