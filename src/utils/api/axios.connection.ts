import axios, { AxiosRequestConfig } from "axios";

const client = async (config:AxiosRequestConfig) => axios(config);

export default client;
