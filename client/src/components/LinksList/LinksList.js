import React from "react";
import { Link } from "react-router-dom";

const LinksList = ({ links }) => {
  if (links.length < 0)
    return (
      <p className="center" style={{ paddingTop: "2rem" }}>
        No links yet...
      </p>
    );

  return (
    <table style={{ paddingTop: "2rem" }}>
      <thead>
        <tr>
          <th>№</th>
          <th>Base link</th>
          <th>Shortened link</th>
          <th>Link</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>{<Link to={`/detail/${link._id}`}>Open</Link>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinksList;
