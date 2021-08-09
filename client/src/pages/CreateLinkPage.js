import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

const CreateLinkPage = () => {
  const auth = useContext(AuthContext);
  const [link, setLink] = useState("");
  const { request } = useHttp();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (e) => setLink(e.target.value);

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/links/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        console.log("CreateLink:", data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="row">
      <h1>Create Link Page</h1>
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field" style={{ margin: "10px" }}>
          <input
            placeholder="Insert link here..."
            id="link"
            type="text"
            value={link}
            onChange={changeHandler}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Enter</label>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkPage;
