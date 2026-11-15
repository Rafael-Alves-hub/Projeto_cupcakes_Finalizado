import axios from "axios";

const api = axios.create({
    // As APIs são servidas pelo mesmo projeto Next.js. Uma URL relativa
    // funciona localmente e na Vercel, sem criar uma origem diferente.
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? '',
    timeout: 300000,
    withCredentials: true,
})


export default api;
