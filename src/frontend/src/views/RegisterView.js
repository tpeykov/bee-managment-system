import React, {useContext} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/home-page.css'
import '../css/forms-style.css'
import {registerUser} from "../shared/services/user.service";
import NotificationContext from "../shared/contexts/notification.context";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterView() {
    const {setNotification} = useContext(NotificationContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        registerUser(data)
            .then((response) => {
                setNotification({ message: 'Successful registration!', active: true, severity: 'success' });
                event.target.reset();
                navigate('/login');
            })
            .catch((error) => {
                setNotification({ message: 'Username is already used!', active: true, severity: 'error' });
            });
    }

    return (
        <div className="background-wrapper">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={handleSubmit} >
                        <h3> Sign Up </h3>
                        <div className="mb-3">
                            <label>UIC</label>
                            <input
                                type="text"
                                name='uic'
                                className="form-control"
                                placeholder="UIC"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Company name</label>
                            <input
                                type="text"
                                name='username'
                                className="form-control"
                                placeholder="Company name"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                name='email'
                                className="form-control"
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name='password'
                                className="form-control"
                                placeholder="Enter password"
                            />
                        </div>

                        <div>
                            <label> Role </label>
                            <div className={'roles-select-container mb-3'}>
                                <select name="role">
                                    <option value="ROLE_MANUFACTURER">Manufacturer</option>
                                    <option value="ROLE_MERCHANT">Merchant</option>
                                </select>
                            </div>
                        </div>


                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Sign Up
                            </button>
                        </div>

                        <p className="text-right">
                            Already registered <Link to={'/login'}>Sign in?</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterView;
