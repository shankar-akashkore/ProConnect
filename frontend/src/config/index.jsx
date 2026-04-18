import axios from "axios"

const DEFAULT_BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:9090"
        : "https://proconnect-2-u8xn.onrender.com";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_BASE_URL;

export const clientServer = axios.create({
    baseURL: BASE_URL,
})
