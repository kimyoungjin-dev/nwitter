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
      </li>
      <span>{userObj.displayName}</span>
      <li>
        <Link to="/profile">
          <div>
            <img src={userObj.photoURL} />
          </div>
        </Link>
      </li>
    </ul>
    <div className="no-mobile">
      <span>크기를 줄이거나 핸드폰으로 접속하세요</span>
    </div>
  </nav>
);
export default Navigation;
