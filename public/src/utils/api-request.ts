import axios from "axios";

// Utility function to delay the response
const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const errorDelayMs =1500; // Set delay in milliseconds (e.g., 2000ms = 2 seconds)

// Create an Axios instance
const apiClient = axios.create({
    baseURL: "http://localhost:5000", // Change as needed
    headers: { "Content-Type": "application/json" }
});

// Add Axios request interceptor to attach token and warehouseId
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const warehouseId = localStorage.getItem("warehouseId");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (warehouseId) {
            config.headers["X-Warehouse-Id"] = warehouseId;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

async function apiRequest(options: any) {
    try {
        // Make the API request
        const response = await apiClient.request({ ...options });
        await delay(errorDelayMs);
        return response.data;
    } catch (error: any) {
        // Delay before returning an error
        await delay(errorDelayMs);

        // If unauthorized (401), redirect to login
        if (error?.response?.status === 401) {
            window.location.href = "/#/login";
        }

        // Return the actual error response, or a fallback error message
        throw new Error(error?.response?.data?.message || "An error occurred");
    }
}

export default apiRequest;
