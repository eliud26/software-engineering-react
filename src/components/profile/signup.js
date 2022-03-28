import {useState} from "react";
import * as service
    from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const signup = () =>
        service.signup(newUser)
            .then(() => navigate('/profile'))
            .catch(e => alert(e));
    return (
        <div>
            <input onChange={(e) =>
                setNewUser({...newUser,
                    username: e.target.value})} className="form-control mb-2" placeholder={"Username"}/>
            <input onChange={(e) =>
                setNewUser({...newUser,
                    password: e.target.value})} className="form-control mb-2"
                   type={"password"} placeholder={"Password"}/>
            <input onChange={(e) =>
                setNewUser({...newUser,
                    email: e.target.value})} className="form-control mb-2" placeholder={"Email"}/>
            <button onClick={signup} className="btn btn-primary mb-5">Register</button>
        </div>
    );
}
export default Signup;