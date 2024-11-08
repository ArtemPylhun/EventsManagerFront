import { HttpClient } from "../utils/http/HttpClient";

export class CategoryService {
  constructor(signal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    this.httpClient = new HttpClient({
      baseURL: `${apiUrl}/categories`,
      timeout: 10000,
      signal,
    });
  }

  async getAllCategories() {
    return await this.httpClient.get("");
  }

  async getCategoryById() {
    return await this.httpClient.get(`/${id}`);
  }

  /*
  async getPaginatedTodos(limit, skip) {
    return await this.httpClient.get(
      `?limit=${limit}&skip=${skip}`
    );
  }
  */

  async createCategory(category) {
    return await this.httpClient.post("", category);
  }

  async updateCategory(category) {
    return await this.httpClient.put("", category);
  }

  async deleteCategoryById(id) {
    return await this.httpClient.delete(`/${id}`);
  }
}
