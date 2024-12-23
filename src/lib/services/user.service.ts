import { UserLogin, UserType } from "../../types/user.type";
import api from "./api.config";

const UserService = {
    registerUser: (user: UserType) => {
        return api.post('/users/register', user)
    },

    loginUser: (user: UserLogin) => {
        return api.post('/users/login', user)
    }
};

export default UserService;