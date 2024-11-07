import { HttpClient } from "../utils/http/HttpClient";

export class CategoryService {
  /**
   * @param {AbortSignal} signal
   */
  static async getAllCategories(signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/categories`,
      timeout: 10000,
      signal,
    });
    return await httpClient.get("");
  }

  /**
   * @param {number} id
   * @param {AbortSignal} signal
   */
  static async getCategoryById(id, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/categories`,
      timeout: 10000,
      signal,
    });
    return await httpClient.get(`/${id}`);
  }

  /**
   * @param {number} limit
   * @param {number} skip
   * @param {AbortSignal} signal
   */
  /*
  static async getPaginatedTodos(limit, skip, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/categories`,
      timeout: 10000,
      signal,
    });
    return await httpClient.get(
      `?limit=${limit}&skip=${skip}`
    );
  }
  */

  /**
   * @param {object} category
   * @param {AbortSignal} signal
   */
  static async createCategory(category, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/categories`,
      timeout: 10000,
      signal,
    });
    return await httpClient.post("", category);
  }

  /**
   * @param {object} category
   * @param {AbortSignal} signal
   */
  static async updateCategory(category, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/categories`,
      timeout: 10000,
      signal,
    });
    return await httpClient.put("", category);
  }

  /**
   * @param {number} id
   * @param {AbortSignal} signal
   */
  static async deleteCategoryById(id, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/categories`,
      timeout: 10000,
      signal,
    });
    return await httpClient.delete(`/${id}`);
  }
}
