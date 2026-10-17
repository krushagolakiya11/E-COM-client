import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// attach token to every request automatically
// interceptors - function that runs automatically before a request is sent or after a response is received.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // get token from local storage
    if(token){
        config.headers.Authorization = `Bearer ${token}` // attach token to request
    }
    return config;
})

//if token is expired/invalid, log out
api.interceptors.response.use((response) => response, (error) => {
    const isLoginRequest = error.config?.url?.includes("/login"); // check if request is for login
    if(error.response?.status === 401 && !isLoginRequest){ // if token is expired/invalid
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }
    return Promise.reject(error);
});
export default api;