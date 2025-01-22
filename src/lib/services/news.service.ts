import { New } from "../../types/new.type";
import api from "./api.config";

const NewsService = {
    getAllNews: () => {
        return api.get('/news');
    },
    getNewById: (id: string) => {
        return api.get(`/news/${id}`);
    },
    createNew: (newData: New) => {
        return api.post('/news', newData);
    },
    updateNew: (id: string, newData: New) => {
        return api.put(`/news/${id}`, newData);
    },
    createDraft: (newData: New) => {
        return api.post('/draft', newData);
    },
    deleteNewById: (id: string) => {
        return api.delete(`/news/${id}`);
    },
};

export default NewsService;