import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

const AuthPage = () => {
  const message = useMessage();
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, request, error, clearError } = useHttp();
  const auth = useContext(AuthContext);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registrationHandler = async () => {
    try {
      const data = await request("/api/auth/registration", "POST", { ...form });
      message(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>URL Shortener</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
          </div>
          <div className="input-field" style={{ margin: "10px" }}>
            <input
              placeholder="Type email..."
              id="email"
              type="email"
              name="email"
              className="yellow-input"
              value={form.email}
              onChange={changeHandler}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field" style={{ margin: "10px" }}>
            <input
              id="password"
              type="password"
              name="password"
              className="yellow-input"
              value={form.password}
              onChange={changeHandler}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div
            className="card-action"
            style={{ display: "flex", justifyContent: "space-evenly" }}
            disabled={loading}
          >
            <button className="btn yellow darken-4" onClick={loginHandler}>
              Log in
            </button>
            <button
              className="btn grey  lighten-2 black-text"
              onClick={registrationHandler}
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
