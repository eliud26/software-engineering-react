import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as service from "../../services/auth-service";
import * as serviceU from "../../services/users-service";
import React from "react";
import {UserList} from "./user-list";
import Signup from "./signup";

export const Login = () => {
    const [existingUsers, setExistingUsers] = useState([]);
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();
    const deleteUser = (uid) =>
        serviceU.deleteUser(uid)
            .then(findAllUsers)

    const findAllUsers = () => {
        serviceU.findAllUsers()
            .then(users => {
                setExistingUsers(users)
            })
    }

    const login = () =>
        service.login(loginUser)
            .then((user) => {
                navigate(`/profile/mytuits`)
            });
    useEffect(findAllUsers, []);
    return (
        <div>
            <h1>Register</h1>
            <Signup/>

            <h1>Login</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, username: e.target.value})}
                   placeholder="Username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, password: e.target.value})}
                   placeholder="password" type="Password"/>
            <button onClick={login} className="btn btn-primary mb-5">Login</button>

            <h1>Login As</h1>

            <UserList users={existingUsers} deleteUser={deleteUser}/>

        </div>
    );
};