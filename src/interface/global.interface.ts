import { AxiosRequestHeaders } from "axios";

export interface Options {
    method: string;
    url: string;
    withCredentials?: true;
    headers?: AxiosRequestHeaders;
    timeout?: number;
}
