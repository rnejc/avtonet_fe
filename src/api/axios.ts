import axios from "axios";

const API_BASE_URL = "http://localhost:3000/";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,  // Set a timeout of 10 seconds
});

// Request Interceptor to attach Authorization token if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    // Handle request error
    return Promise.reject(error);
});

// Response Interceptor to handle response errors (e.g., Unauthorized access)
api.interceptors.response.use(
    (response) => {
        return response;  // Return the response as-is if it's successful
    },
    (error) => {
        // If the error is a 401 (Unauthorized), we might want to log the user out
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            // You can trigger a redirect to login here if needed (using Navigate or React Router)
            window.location.href = "/login";  // or use Navigate if inside React component
        }
        return Promise.reject(error);
    }
);

export default api;
