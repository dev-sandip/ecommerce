import a from "axios";
a.defaults.withCredentials = true;
const axios = a.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1",
    withCredentials: true,
});

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/login";
        }


        return Promise.reject(error);
    }
);

export default axios;
