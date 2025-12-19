import axios from 'axios';
import config  from '../config.js';

class Api {
    
    constructor() {
        this.axios = axios.create({
            baseURL: 'http://localhost:8080/system-api/v1',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        this.axios.interceptors.request.use(
            (reqConfig) => {
                reqConfig.headers['x-api-key'] = config.authKey;
                return reqConfig;
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