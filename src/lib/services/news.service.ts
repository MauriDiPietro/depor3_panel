import api from "./api.config";

const NewsService = {
    getNoticias: () => {
        return api.get('/news');
    }
};

export default NewsService;