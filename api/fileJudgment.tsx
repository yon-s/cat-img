import axios from 'axios';

export const Judgment = async (image: File) : Promise<any>=> {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await axios.post('http://localhost:3000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error:any) {
    throw new Error('Image upload error: ' + error.message);
  }
};
