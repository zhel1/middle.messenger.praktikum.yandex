enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type IOptionsRequest = {
    method?: METHODS.GET | METHODS.POST | METHODS.PUT | METHODS.DELETE;
    headers?: Record<string, string>;
    data?: {[key: string]: string};
    timeout?: number;
    params?: object;
}

type HTTPMethod = (url: string, options?: IOptionsRequest) => Promise<unknown>

function queryStringify(data: {[key: string]: string}) {
    return "?" + Object.keys(data).map(key => {
        return key + '=' + data[key];
    }).join('&');
}

export class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url:string, options: IOptionsRequest = {}, timeout:number = 5000) => {
        const {headers = {}, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
