import { environment } from "../app/environments/environment";

const BASE_URL = environment.baseUrl;

const PATHS = {
    AUTH: `${BASE_URL}/auth`,
};

export const API_ENDPOINTS = {
    LOGIN_USER: `${PATHS.AUTH}/login`,
    REGISTER_USER: `${PATHS.AUTH}/register`,
    USER_DETAILS: `${PATHS.AUTH}/user/`,
};