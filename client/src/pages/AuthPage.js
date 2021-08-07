import React, { useState } from "react";

const AuthPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
              onChange={changeHandler}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div
            className="card-action"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button className="btn yellow darken-4">Log in</button>
            <button className="btn grey  lighten-2 black-text">
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
