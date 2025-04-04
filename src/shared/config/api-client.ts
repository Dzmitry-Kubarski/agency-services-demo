import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { ROUTES } from '../routes'

const BASE_API_URL = `${globalConfig.API_ENDPOINT}`

import { HTTPClientError } from './errors'
import { globalConfig } from './global-config'

const INSTANCE_TIMEOUT = 60000
const token = localStorage.getItem('authToken')

const INSTANCE_HEADERS = {
    Accept: 'application/json, text/plain, */*',
    Authorization: token ? token : undefined
}

class ApiClient {
    private _instance: AxiosInstance

    constructor() {
        this._instance = axios.create({
            baseURL: BASE_API_URL,
            timeout: INSTANCE_TIMEOUT,
            headers: INSTANCE_HEADERS
        })

        this._instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 500 || error.code === 'ECONNABORTED') {
                    window.location.href = ROUTES.SERVER_ERROR
                }
                return Promise.reject(error)
            }
        )
    }

    public get instance(): AxiosInstance {
        return this._instance
    }

    handleRequestError = (error: unknown): Error | HTTPClientError => {
        if (error instanceof AxiosError) {
            throw new HTTPClientError(error.message, error.code, error.config, error.request, error.response, error.status)
        }
        throw error
    }

    async get<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this._instance.get(endpoint, options)
            return response.data
        } catch (e) {
            throw this.handleRequestError(e)
        }
    }

    async patch<T, D>(endpoint: string, data?: D, options?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T, D> = await this._instance.patch(endpoint, data, options)
            return response.data
        } catch (e) {
            throw this.handleRequestError(e)
        }
    }

    async post<T, D>(endpoint: string, data?: D, options?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T, D> = await this._instance.post(endpoint, data, options)
            return response.data
        } catch (e) {
            throw this.handleRequestError(e)
        }
    }

    async put<T, D>(endpoint: string, data?: D, options?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T, D> = await this._instance.put(endpoint, data, options)
            return response.data
        } catch (e) {
            throw this.handleRequestError(e)
        }
    }

    async delete<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this._instance.delete(endpoint, options)
            return response.data
        } catch (e) {
            throw this.handleRequestError(e)
        }
    }
}

export const apiClient = new ApiClient()
