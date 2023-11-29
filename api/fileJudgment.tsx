import axios from 'axios';

export const Judgment = async (image: File) : Promise<{ tags: string[] }>=> {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await axios.post('https://api.judging-cats.com/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data)
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response && e.response.status === 400) {
      throw new Error('400 Error!!');
    }else {
      throw e;
    }
  }
};
