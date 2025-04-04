import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export class HTTPClientError<T = any, D = any> extends Error {
    public data: T | undefined
    message: string
    code?: string
    config?: InternalAxiosRequestConfig<D>
    request?: any
    response?: AxiosResponse<T, D>
    name: string
    status?: number

    constructor(
        message: string,
        code?: string,
        config?: InternalAxiosRequestConfig<D>,
        request?: any,
        response?: AxiosResponse<T, D>,
        status?: number
    ) {
        super()
        this.name = 'HTTP error'
        this.data = response?.data
        this.response = response
        this.message = message
        this.code = code
        this.config = config
        this.request = request
        this.status = status
    }
}
