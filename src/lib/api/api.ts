import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

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

    private async makeRequest(method: string, url: string, data?: any):Promise<[any,any]>{
        let res = null;
        let err = null;
        try{
            res = await this.axiosInstance.request({method, url, data});
        }catch(e){
            err = e;
        }
        return [res, err];
    }

    public async get(url: string):Promise<[any,any]>{
        return await this.makeRequest('get', url);
    }

    public async post(url: string, data: any):Promise<[any,any]>{
        return await this.makeRequest('post', url, data);
    }

    public async put(url: string, data: any):Promise<[any,any]>{
        return await this.makeRequest('put', url, data);
    }

    public async delete(url: string):Promise<[any,any]>{
        return await this.makeRequest('delete', url);
    }
}

const apiService = new ApiService();
export default apiService;