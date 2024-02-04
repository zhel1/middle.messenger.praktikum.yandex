import * as config from "./config.ts";

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type IOptionsRequest = {
    method?: METHODS.GET | METHODS.POST | METHODS.PUT | METHODS.DELETE;
    headers?: Record<string, string>;
    data?: {[key: string]: string} | FormData;
    timeout?: number;
    params?: object;
}

export type TResult<TResponse> = {
    status: number;
    data: TResponse
}

function queryStringify(data: {[key: string]: string}) {
    return "?" + Object.keys(data).map(key => {
        return key + '=' + data[key];
    }).join('&');
}

export class HTTPTransport {
    private apiUrl: string = ''
    constructor(apiPath: string) {
        this.apiUrl = `${config.HOST}${apiPath}`;
    }

    get<TResponse>(url: string, options: IOptionsRequest = {}): Promise<TResult<TResponse>> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: METHODS.GET}, options.timeout);
    };

    post<TResponse>(url: string, options: IOptionsRequest = {}): Promise<TResult<TResponse>> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: METHODS.POST}, options.timeout);
    };

    put<TResponse>(url: string, options: IOptionsRequest = {}): Promise<TResult<TResponse>> {
        return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete<TResponse>(url: string, options: IOptionsRequest = {}) : Promise<TResult<TResponse>> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request<TResponse>(url:string, options: IOptionsRequest = {}, timeout:number = 5000) : Promise<TResult<TResponse>> {
        const { headers = {}, method, data} = options;
        return new Promise<TResult<TResponse>>(function(resolve, reject) {

            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.timeout = timeout;

            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data && !(data instanceof FormData)
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                if (xhr.getResponseHeader('content-type')?.includes('application/json')) {
                    resolve({
                        status: xhr.status,
                        data: JSON.parse(xhr.responseText)
                    });
                } else {
                    resolve({
                        status: xhr.status,
                        data: xhr.responseText as TResponse,
                    });
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
