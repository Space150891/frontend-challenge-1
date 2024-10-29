import axios from "axios";

class UploadsService {
  private readonly apiBaseUrl = "http://localhost:8080";

  public async uploadFile(payload: FormData) {
    return await axios.post(this.apiBaseUrl + "/mrf/upload", payload);
  }

  public async getUploadedFiles() {
    return await axios.get(this.apiBaseUrl + "/mrf/list");
  }
}

export const uploadsService = new UploadsService();
