import * as config from "./config.ts";

export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type IOptionsRequest = {
    method?: METHODS.GET | METHODS.POST | METHODS.PUT | METHODS.DELETE;
    headers?: Record<string, string>;
    //data?: {[key: string]: string | number } | FormData | object;
    data?: object | FormData;
    timeout?: number;
    params?: object;
}

export type TResult<TResponse> = {
    status: number;
    data: TResponse
}

// function queryStringify(data: Record<string, unknown>) {
//     if (typeof data !== "object") {
//         throw Error('Input must be an object')
//     }
//
//     return "?" + Object.keys(data).map(key => {
//         return key + '=' + data[key];
//     }).join('&');
// }

export const isObject = (object: object | unknown) => {
    return object != null && typeof object === "object";
};

export const objToString = (keyItog: string, value: object, resultArray: string[]) => {
    Object.entries(value).map(([key, value]) => {
        valueToString(`${keyItog}[${key}]`, value, resultArray)
    })
}

export const arrayToString = (key: string, value: Array<unknown>, resultArray: string[]) => {
    value.map((item, index) => {
        valueToString(`${key}[${String(index)}]`, item, resultArray)
    })
}

export const valueToString = (key: string, value: unknown, result: string[]) => {
    if (Array.isArray(value))
        return arrayToString(key, value, result);
    if (isObject(value))
        return objToString(key, value as NonNullable<unknown>, result);
    result.push(`${key}=${String(value)}`);
}

export function queryStringify(data: object) {
    if (!isObject(data)) {
        throw Error('Input must be an object')
    }
    const result: string[] = [];
    Object.entries(data).map(([key, value]) => {
        valueToString(key, value, result)
    })
    return '?' + result.join("&");
}

type HTTPMethod = <R = unknown>(path: string, options?: IOptionsRequest) => Promise<TResult<R>>

export class HTTPTransport {
    private readonly apiUrl: string = ''
    constructor(apiPath: string) {
        this.apiUrl = `${config.HOST}${apiPath}`;
    }

    get: HTTPMethod = (path, options) => {
        return this.request(`${this.apiUrl}${path}`, {...options, method: METHODS.GET}, options?.timeout);
    }

    post: HTTPMethod = (path, options) => {
        return this.request(`${this.apiUrl}${path}`, {...options, method: METHODS.POST}, options?.timeout);
    }

    put: HTTPMethod = (path, options ) => {
        return this.request(`${this.apiUrl}${path}`, {...options, method: METHODS.PUT}, options?.timeout);
    }

    delete: HTTPMethod = (path, options) => {
        return this.request(`${this.apiUrl}${path}`, {...options, method: METHODS.DELETE}, options?.timeout);
    }

    request<TResponse>(url:string, options: IOptionsRequest = {}, timeout: number = 5000) : Promise<TResult<TResponse>> {
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
            }else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
