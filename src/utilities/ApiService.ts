import axios from "axios";

class ApiService {
  static async getApi<T>(url: string) {
    const response = await axios({
      method: "GET",
      url: "http://localhost:3004/" + url,
    });

    return response.data as T;
  }

  static async putApi<T>(url: string, data: any) {
    const response = await axios({
      method: "PUT",
      url: "http://localhost:3004/" + url,
      data: data,
    });

    return response.data as T;
  }

  static async postApi<T>(url: string, data: any) {
    const response = await axios({
      method: "POST",
      url: "http://localhost:3004/" + url,
      data: data,
    });

    return response.data as T;
  }

  static async deleteApi<T>(url: string, data: any) {
    const response = await axios({
      method: "DELETE",
      url: "http://localhost:3004/" + url,
      data: data,
    });

    return response.data as T;
  }
}

export default ApiService;
