import { HttpClient } from "../utils/http/HttpClient";

export class UserService {
  static async login(email, password, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users`,
      timeout: 10000,
      signal,
    });
    return await httpClient.post("/login", { email, password });
  }
}
