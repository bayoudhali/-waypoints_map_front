import axios from "axios";

const Base_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
const Api_URL = "/api";

const axionsInstance = axios.create({
  baseURL: Base_URL + Api_URL,
});

// Get method
export const get = async (url: string, options: any) => {
  try {
    const { data } = await axionsInstance.get(url, options);
    return data;
  } catch (error: any) {
    throw error;
  }
};

// Post method
export const post = async (url: string, payload: any, options: any) => {
  try {
    const { data } = await axionsInstance.post(url, payload, options);
    return data;
  } catch (error: any) {}
};

// Put method
export const put = async (url: string, payload: any, options: any) => {
  try {
    const { data } = await axionsInstance.put(url, payload, options);
    return data;
  } catch (error: any) {}
};
export const deleteApi = async (url: string, payload: any, options: any) => {
  try {
    const { data } = await axionsInstance.delete(url, {
      data: payload,
      headers: options,
    });
    return data;
  } catch (error: any) {
    // handle error
  }
};
