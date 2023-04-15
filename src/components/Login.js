import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Router } from "react-router-dom";
import './Login.css';
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";



function Login(props) {

    const [showText, setShowText] = useState(true)
    const [validate, setValidate] = useState({ status: true })
    const [redirect, setRedirect] = useState(false)
    const dispatch = useDispatch();
    const Submitform = async (e) => {
        // debugger;
        e.preventDefault();
        let formdata = {}
        const data = new FormData(e.target);
        for (let [key, value] of data.entries()) {
            formdata[key] = value
        }
        let res = await validatefn(formdata)
        setValidate(res)
        if (res.status == true) {
            dispatch({ type: 'ORGID', payload: "5f055ce5-3015-4531-a202-85f1fb98d9a5" })
            dispatch({ type: 'LOGGEDINUSERID', payload: "cb675b1c-3b1a-4b9f-ae19-82de1b169d9f" })
            setRedirect(true)
        }
    }

    const validatefn = (data) => {
        let a = { ...validate };
        let res = a
        let count = 0;
        if (data['login-email'] == undefined || data['login-email'] == "") {
            res['loginemail'] = "Enter the email";
            res.status = false
            count++;
        }
        else if (data['login-email'] != "test@test.com") {
            res['loginemail'] = "Invalid Mail";
            res.status = false
            count++;
        }
        else {
            res['loginemail'] = "";
            res.status = true
        }
        if (data['login-password'] == undefined || data['login-password'] == "") {
            res['loginpassword'] = "Enter the password";
            res.status = false
        }
        else if (data['login-password'] != "123456") {
            res['loginpassword'] = "Invalid Password ";
            res.status = false
            count++;
        }
        else {
            res['loginpassword'] = "";
            res.status = count > 0 ? false : true;
        }
        return res;
    }

    const handlePassword = () => {
        setShowText(!showText)
    }
    if (redirect === true) {
        return <Navigate to="/dashboard" />
    }
    return (
        <section className="Login-pg">
            <div className="container h-100">
                <div className="row align-items-center justify-content-center h-100">
                    <div className="col-sm-6">
                        <form className="p-lg-4 p-md-3 p-2" onSubmit={Submitform}>
                            <div className="pb-5">
                                <h2 className="text-center">Login</h2>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="LoginInputEmail" name="login-email" />
                                <label htmlFor="LoginInputEmail" className="form-label">Email address</label>
                                {
                                    !validate.status ?
                                        <span className="text-err">{validate.loginemail}</span> :
                                        <></>
                                }
                            </div>
                            <div className="form-floating mb-3 position-relative">
                                <input type={showText ? 'password' : 'text'} className="form-control" id="LoginInputPassword" name="login-password" />
                                <span className="d-inline-block eye-icon" onClick={() => (setShowText(!showText))}>
                                    {
                                        showText ?
                                            <FaEye /> :
                                            <FaEyeSlash />
                                    }
                                </span>
                                <label htmlFor="LoginInputPassword" className="form-label">Password</label>
                                {
                                    !validate.status ?
                                        <span className="text-err">{validate.loginpassword}</span> :
                                        <></>
                                }
                            </div>
                            <div className="mb-3 text-end">
                                <a href="#">Forget Password</a>
                            </div>
                            <button type="submit" className="btn btn-theme d-block w-100">Submit</button>
                            <div className="my-3 text-center">
                                <span className="me-2">or Create a account</span>
                                <a href="#">Signin</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;