import { New } from "../../types/new.type";
import api from "./api.config";

const NewsService = {
  getAllNews: (page, limit, title) => {
    if (!title) return api.get(`/news?page=${page}&limit=${limit}`);
    else return api.get(`/news?page=${page}&limit=${limit}&title=${title}`);
  },
  getNewById: (id: string) => {
    return api.get(`/news/${id}`);
  },
  createNew: (newData: New) => {
    return api.post("/news", newData);
  },
  updateNew: (id: string, newData: New) => {
    return api.put(`/news/${id}`, newData);
  },
  createDraft: (newData: New) => {
    return api.post("/draft", newData);
  },
  deleteNewById: (id: string) => {
    return api.delete(`/news/${id}`);
  },
};

export default NewsService;
