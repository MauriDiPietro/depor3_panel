import axios from "axios";

const baseUrl = 'http://localhost:8080/api'

const procesarError = (err: any) => {
  if (err.response?.data) {
    return err.response.data.errors?.map((x: any) => x.message);
  } else {
    return err.message || "Error desconocido";
  }
};

const api = {
  get: async (url: string, params: any = {}, headers: any = {}) => {
    try {
      const response = await axios.get(`${baseUrl}${url}`, { params, headers });
      return response.data;
    } catch (err) {
      return procesarError(err);
    }
  },
  post: async (url: string, data: any = {}, headers: any = {}) => {
    try {
      const response = await axios.post(`${baseUrl}${url}`, data, { headers });
      return response.data;
    } catch (err) {
      return procesarError(err);
    }
  },
  put: async (url: string, data: any = {}, headers: any = {}) => {
    try {
      const response = await axios.put(`${baseUrl}${url}`, data, { headers });
      return response.data;
    } catch (err) {
      return procesarError(err);
    }
  },
  delete: async (url: string, params: any = {}, headers: any = {}) => {
    try {
      const response = await axios.delete(`${baseUrl}${url}`, { params, headers });
      return response.data;
    } catch (err) {
      return procesarError(err);
    }
  },
};

export default api;

