import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <li>
        <Link
          to="/"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 10,
            border: "1px solid white",
            borderRadius: "10px",
            padding: 5,
            marginLeft: 0,
          }}
        >
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            fontSize: 8,
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 10,
            color: "black",
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="3x" />
          <span style={{ marginTop: 10 }}>
            {userObj.displayName ? `${userObj.displayName}` : "Profile"}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
