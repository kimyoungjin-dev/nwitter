import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
//css => navigation.css
const Navigation = ({ userObj }) => (
  <nav className="navigation-nav">
    <ul className="navigation-ul">
      <li className="navigation-li">
        <Link to="/profile">
          <div>
            <img src={userObj.photoURL} />
            <span>
              {userObj.displayName ? `${userObj.displayName}` : "Profile"}
            </span>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/">
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" />
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
