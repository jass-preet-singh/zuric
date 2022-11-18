import React, { useState, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';

import LoginImg from "../../assets/images/login-img.jpeg";

import AuthService from "../../shared/Services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [succesful, setSuccessful] = useState(false)

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    // form.current.validateAll();

    if (checkBtn.current) {
      console.log(username, password)
      AuthService.login(username, password).then(
        (response) => {
          console.log(response)
          setMessage(response.message)
          navigate("/");
          setSuccessful(true);
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="login-section row h-100 justify-content-center">
        <div className="col-12 col-md-6 _bg-dark p-0">
          <div className="d-flex align-items-center h-100 ">
            <img src={LoginImg} alt="login-img" width="80%" />
          </div>
        </div>
        <div className="col-12 col-md-6 p-0">
          <div className=" d-flex align-items-center h-100 justify-content-center">
            <div className="w-75">
              <h1 className='font-weight-bold --primary-text'>Login</h1>
              <form onSubmit={handleLogin} ref={form}>
                <div className="form-group">
                  <label htmlFor="username" className="--primary-text">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="--primary-text">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                  />
                </div>

                <div className="form-group mt-4">
                  <button className="btn btn-primary btn-block --primary-bg" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span className="text-white">Login</span>
                  </button>
                   <p className="font-weight-800 mt-2 text-center">{"Don't have an account?"} <Link to="/register"><span className=" --primary-text font-weight-bold" > Register Now </span></Link></p>
                </div>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                <button style={{ display: "none" }} ref={checkBtn} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;
