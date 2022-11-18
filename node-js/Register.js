import React, { useState, useRef } from "react";
import { useNavigate , Link } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../shared/Services/auth.service";
import LoginImg from "../../assets/images/login-img.jpeg";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    // form.current.validateAll();

    if (checkBtn.current) {
      console.log(username, email, password)
      AuthService.register(username, email, password).then(
        (response) => {
          console.log(response)
          setMessage(response.data.message);
          navigate("/login")
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="row h-100">

      <div className="login-section row h-100 justify-content-center">
        <div className="col-12 col-md-6 _bg-dark p-0">
          <div className="d-flex align-items-center h-100 justify-content-center">
            <img src={LoginImg} alt="login-img" width="80%" />
          </div>
        </div>
        <div className="col-12 col-md-6 p-0">
          <div className=" d-flex align-items-center h-100 justify-content-center">
            <div className="w-75">
              <h1 className='_text-dark font-weight-bold --primary-text'>Register</h1>
              <form onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="username" className="--primary-text">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="--primary-text">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
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
                        validations={[required, vpassword]}
                      />
                    </div>

                    <div className="form-group mt-4">
                      <button className="btn btn-primary btn-block --primary-bg">Sign Up</button>
                      <p className="font-weight-800 mt-2 text-center">{"Don't have an account?"} <Link to="/login"><span className=" --primary-text font-weight-bold" > Login Now </span></Link></p>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful ? "alert alert-success" : "alert alert-danger"
                      }
                      role="alert"
                    >
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
};

export default Register;
