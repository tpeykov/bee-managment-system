import React, {useContext} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/home-page.css'
import '../css/forms-style.css'
import {loginUser} from "../shared/services/user.service";
import AuthContext from "../shared/contexts/auth.context";
import NotificationContext from "../shared/contexts/notification.context";
import {Link, useNavigate} from "react-router-dom";
import {storeAuthToken} from "../shared/services/auth.service";

function LoginView() {

    const {userAuth, updateUserAuth} = useContext(AuthContext);
    const {setNotification} = useContext(NotificationContext);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        loginUser(data)
            .then((response) => {
                storeAuthToken(response.data.id_token);
                // updateUserAuth({...userAuth, isAuthenticated: true, user: { role: getUserRole, username: getUserName}});
                updateUserAuth({ ...userAuth, isAuthenticated: true });
                setNotification({message: 'Succesfull sign in!', active: true, severity: 'success'});
                navigate('/');
            })
            .catch(() => setNotification({active: true, message: "Wrong credentials", severity: 'error'}));
    };


    return (
        <div className="background-wrapper">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={handleSubmit}>
                        <h3>Sign In</h3>

                        <div className="mb-3">
                            <label>UIC</label>
                            <input
                                type="text"
                                name="uic"
                                required
                                className="form-control"
                                placeholder="Enter UIC"
                            />
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="form-control"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="text-right">
                            Don't have an account? <Link to={'/register'}>Register here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginView;
