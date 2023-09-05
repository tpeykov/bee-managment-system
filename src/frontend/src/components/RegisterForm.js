import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/home-page.css'
import '../css/forms-style.css'

function RegisterForm() {
    return (
        <div className="background-wrapper">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign Up</h3>

                        <div className="mb-3">
                            <label>UIC</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="UIC"
                            />
                        </div>

                        <div className="mb-3">
                            <label>Company name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Company name"
                            />
                        </div>

                        <div className="mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Sign Up
                            </button>
                        </div>
                        <p className="text-right">
                            Already registered <a href="/sign-in">Sign in?</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;