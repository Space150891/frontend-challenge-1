import { makeAutoObservable, observable } from "mobx";
import { uploadsService } from "~/services/uploadsService";

export class UploadedFilesData {
  data = observable<{ name: string; content: { last_updated_on: string } }>([]);
  isFetching = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  public fetchData = () => {
    this.isFetching = true;
    uploadsService
      .getUploadedFiles()
      .then((response) => {
        this.data.replace(response.data);
        this.isFetching = false;
      })
      .catch((err) => {
        this.error = err;
        this.isFetching = false;
      });
  };
}

export const uploadedFilesData = new UploadedFilesData();
