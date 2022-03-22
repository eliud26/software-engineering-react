import axios from "axios";

//const TUITS_API = "https://software-node-spring22.herokuapp.com/tuits";
//const TUITS_API = "http://localhost:4000/tuits";
//const USERS_API = "https://software-node-spring22.herokuapp.com/users";
//const USERS_API = "http://localhost:4000/users";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
})

export const findAllTuits = () =>
    api.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    api.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findTuitsByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuit = (uid, tuit) =>
    api.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

export const updateTuit = (tid, tuit) =>
    api.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    api.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const deleteByUsernameAndTuit = (usernameAndTuit) =>
    api.delete(`${TUITS_API}/delete`, usernameAndTuit)
        .then(response => response.data);

export const deleteAllTuits = () =>
    api.delete(`${TUITS_API}/delete/all`)
        .then(response => response.data);