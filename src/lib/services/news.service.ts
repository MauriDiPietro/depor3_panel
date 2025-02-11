import { New } from "../../types/new.type";
import api from "./api.config";

const NewsService = {
  getAllNews: (page, limit, title, category) => {
    if (!title && !category)
      return api.get(`/news?page=${page}&limit=${limit}`);
    if (title)
      return api.get(`/news?page=${page}&limit=${limit}&title=${title}`);
    if (category)
      return api.get(`/news?page=${page}&limit=${limit}&category=${category}`);
  },
  getAllNewsPatio: (page, limit, title) => {
    if (!title) return api.get(`/news/patio?page=${page}&limit=${limit}`);
    if (title)
      return api.get(`/news/patio?page=${page}&limit=${limit}&title=${title}`);
  },
  getNewById: (id: string) => {
    return api.get(`/news/${id}`);
  },
  getNewPatioById: (id: string) => {
    return api.get(`/news/patio/${id}`);
  },
  createNew: (newData: New) => {
    return api.post("/news", newData);
  },
  updateNew: (id: string, newData: New) => {
    return api.put(`/news/${id}`, newData);
  },
  deleteNewById: (id: string) => {
    return api.delete(`/news/${id}`);
  },
  deleteNewPatioById: (id: string) => {
    return api.delete(`/news/patio/${id}`);
  },
  createDraft: (newData: New) => {
    return api.post("/draft", newData);
  },
  getAllDrafts: (page, limit, title, category) => {
    if (!title && !category)
      return api.get(`/draft?page=${page}&limit=${limit}`);
    if (title)
      return api.get(`/draft?page=${page}&limit=${limit}&title=${title}`);
    if (category)
      return api.get(`/draft?page=${page}&limit=${limit}&category=${category}`);
  },
  getDraftById: (id: string) => {
    return api.get(`/draft/${id}`);
  },
  updateDraft: (id: string, newData: New) => {
    return api.put(`/draft/${id}`, newData);
  },
  deleteDraftById: (id: string) => {
    return api.delete(`/draft/${id}`);
  },
};

export default NewsService;
