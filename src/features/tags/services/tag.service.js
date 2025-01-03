import { HttpClient } from "../../../utils/http/HttpClient";

export class TagService {
  /**
   * @param {AbortSignal} signal
   */
  static async getAllTags(signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/tags`,
      signal,
    });
    return await httpClient.get("");
  }

  /**
   * @param {number} id
   * @param {AbortSignal} signal
   */
  static async getTagById(id, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/tags`,
      signal,
    });
    return await httpClient.get(`/${id}`);
  }

  /**
   * @param {object} tag
   * @param {AbortSignal} signal
   */
  static async createTag(tag, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/tags`,
      signal,
    });
    return await httpClient.post("add", tag);
  }

  /**
   * @param {object} tag
   * @param {AbortSignal} signal
   */
  static async updateTag(tag, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/tags`,
      signal,
    });
    return await httpClient.put("update", tag);
  }
  /**
   * @param {number} id
   * @param {AbortSignal} signal
   */
  static async deleteTagById(id, signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/tags`,
      signal,
    });
    return await httpClient.delete(`delete/${id}`);
  }
}
