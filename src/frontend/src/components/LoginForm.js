import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/home-page.css'
import '../css/forms-style.css'

function LoginForm() {
    return (
        <div className="background-wrapper">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>

                        <div className="mb-3">
                            <label>UIC</label>
                            <input
                                type="uic"
                                className="form-control"
                                placeholder="Enter UIC"
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
                                Submit
                            </button>
                        </div>
                        <p className="text-right">
                            Don't have an account? <a href="/sign-up">Register here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;