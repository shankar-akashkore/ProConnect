import axios from "axios"

export const BASE_URL = "https://proconnect-2-u8xn.onrender.com/";

export const clientServer = axios.create({
    baseURL: BASE_URL,
})