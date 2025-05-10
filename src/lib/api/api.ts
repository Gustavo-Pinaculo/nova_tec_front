import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { browser } from "$app/environment";

class ApiService{
    private axiosInstance: AxiosInstance;
    private readonly URL: string;

    constructor(){
        this.URL = PUBLIC_BACKEND_URL ?? 'http://localhost:8000';
        this.axiosInstance = axios.create({
            baseURL: this.URL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.axiosInstance.interceptors.request.use(this.handleRequest,);
    }

    private handleRequest( config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> {
        if(!browser){
            throw new Error("Componente não renderizado ao lado do cliente para pegar o localstorage")
        }
        if(!localStorage.getItem("nova-tec-token")) return config;
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("nova-tec-token")}`;
        return config;
    }

    public async makeRequest(method: string, url: string, data?: any, config?: any):Promise<[any,any]>{
        let res = null;
        let err = null;
        try{
            if(config) res = await this.axiosInstance.request({method, url, data, ...config});
            res = await this.axiosInstance.request({method, url, data});
        }catch(e){
            err = e;
           
            if (e instanceof AxiosError && e.response?.data.code === 'token_not_valid') {
                const formData = new FormData();
                formData.append('refresh', localStorage.getItem("nova-tec-refresh") || '');
                const[res, err] = await this.makeRequest('post', '/user/token/refresh/', formData, {headers:{'Content-Type': 'multipart/form-data'}});

                if(err){
                    return [null, err];
                }
                localStorage.setItem("nova-tec-token", res.data.access);  
                this.makeRequest(method, url, data, config); 
            }
        }
        return [res, err];
    }

    public async get(url: string):Promise<[any,any]>{
        return await this.makeRequest('get', url);
    }

    public async post(url: string, data: any):Promise<[any,any]>{
        return await this.makeRequest('post', url, data);
    }

    public async patch(url: string, data: any):Promise<[any,any]>{
        return await this.makeRequest('patch', url, data);
    }

    public async put(url: string, data: any):Promise<[any,any]>{
        return await this.makeRequest('put', url, data);
    }

    public async delete(url: string):Promise<[any,any]>{
        return await this.makeRequest('delete', url);
    }

    public async postFormData(url: string, data: FormData):Promise<[any,any]>{
        return await this.makeRequest('post', url, data, {headers:{'Content-Type': 'multipart/form-data'}});
    }
    public async patchFormData(url: string, data: FormData):Promise<[any,any]>{
        return await this.makeRequest('patch', url+'/', data, {headers:{'Content-Type': 'multipart/form-data'}});
    }
}

const apiService = new ApiService();
export default apiService;