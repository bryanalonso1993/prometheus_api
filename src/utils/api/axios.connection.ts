import axios, { AxiosRequestConfig } from "axios";

const client = async (config:AxiosRequestConfig) => await axios(config);

export default client;
