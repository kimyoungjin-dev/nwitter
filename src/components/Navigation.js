import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

//css => navigation.css
const Navigation = ({ userObj }) => (
  <nav className="navigation-nav">
    <ul className="navigation-ul">
      <li className="navigation-li">
        <Link to="/">
          <FontAwesomeIcon
            id="nav-fatwitter-icon"
            icon={faTwitter}
            color={"#04AAFF"}
          />
        </Link>
        <span>홈</span>
      </li>
      <li>
        <Link to="/profile">
          <div>
            <img src={userObj.photoURL} />
          </div>
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
