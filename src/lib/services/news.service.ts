import { New } from "../../types/new.type";
import api from "./api.config";

const NewsService = {
    getAllNews: () => {
        return api.get('/news');
    },
    createNew: (newData: New) => {
        return api.post('/news', newData);
    },
    createDraft: (newData: New) => {
        return api.post('/draft', newData);
    }
};

export default NewsService;