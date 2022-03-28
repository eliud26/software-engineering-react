import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;


const api = axios.create({
    withCredentials: true
});

export const userTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const userTuitDisLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/unlikes/${tid}`)
        .then(response => response.data);