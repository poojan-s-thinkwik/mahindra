import axios from 'axios';

class Api {
    
    constructor() {
        this.axios = axios.create({
            baseURL: 'http://localhost:8080/system-api/v1',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        this.axios.interceptors.request.use(
            (config) => {
                config.headers['x-api-key'] = 'a3f7e6d9b2c8a1d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0';
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    request = async (options) => {
        try {
            const resp = await this.axios.request({...options});
            return resp.data;
        } catch(err) {
            throw new Error(err?.response?.data?.message || 'Error');
        }
    }


}


export default Api;