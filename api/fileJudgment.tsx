import { axiosInstance } from "../utils/axios";
import axios from "axios";

export const Judgment = async (image: File) : Promise<{ tags: string[] }>=> {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await axiosInstance.post('/api/upload', formData);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response && e.response.status === 400) {
      throw new Error('400 Error!!');
    }else {
      throw e;
    }
  }
};
