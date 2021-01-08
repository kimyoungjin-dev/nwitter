import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newPhotoURL, setNewPhotoURL] = useState(userObj.photoURL);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
    if (userObj.photoURL !== newPhotoURL) {
      await userObj.updateProfile({
        photoURL: newPhotoURL,
      });
      refreshUser();
    }
  };
  return (
    <div className="container profile-container">
      <img className="profilePhoto" src={userObj.photoURL} />
      <div className="profileModify">
        <span>팔로우</span>
      </div>
      <div className="profile-mainscreen">
        <form className="profileForm" onSubmit={onSubmit}>
          <input
            className="profileInput"
            onChange={onChange}
            type="text"
            autoFocus
            value={newDisplayName}
          />
          <input className="profileInput2" type="submit" value="이름변경" />
        </form>

        <div className="profileChangeBox">
          <span className="">프로필변경</span>
          <FontAwesomeIcon icon={faPencilAlt} id="profileChangeBoxIcon" />
        </div>

        <div className="logOutBox">
          <span className="logOut" onClick={onLogOutClick}>
            Log Out
          </span>
        </div>
      </div>

      <div className="profile-centerTileBox">
        <div className="profile-centerTile">
          <span>트윗</span>
          <span>트윗과 답글</span>
          <span>미디어</span>
          <span>마음에 들어요</span>
        </div>
      </div>
      <div className="profile-bottomTitle">여기에 내 트윗이 표시됩니다.</div>
      <span className="profile-mytweet">
        <Link to="/">첫 트윗 올리기</Link>
      </span>

      <div className="no-mobile">
        <span>크기를 줄이거나 핸드폰으로 접속하세요</span>
      </div>
    </div>
  );
};
