import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from "./LoginForm"
import RegisterForm from './RegisterForm'
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/home-page.css'
import '../css/forms-style.css'

function LoginAndRegisterController() {

    return (
        <div className="background-wrapper">
            <Router>
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Routes>
                                <Route exact path="/" element={<LoginForm />} />
                                <Route path="/sign-in" element={<LoginForm />} />
                                <Route path="/sign-up" element={<RegisterForm />} />
                            </Routes>
                        </div>
                    </div>
            </Router>
        </div>
    );
}

export default LoginAndRegisterController;