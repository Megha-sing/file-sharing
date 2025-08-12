import axios from "axios";
 
export const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "development"
      ? "http://localhost:8000" // Dev API
      : "https://file-sharing-vky4.onrender.com" // Prod API
  
});

export const uploadFile = async (data) => {
  try {
    const response = await axiosInstance.post("/upload", data);
    return response.data;
  } catch (error) {
    console.error("Error while calling the API", error.message);
    throw error;
  }
};
