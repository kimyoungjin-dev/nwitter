import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";
export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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
  };
  return (
    <div className="container profile-container">
      <form className="profileForm" onSubmit={onSubmit}>
        <span>{userObj.displayName}님 오늘도 행복하신가요?</span>
        <input
          className="profileInput"
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value="Change Your Nickname?"
        />
        <input className="profileInput2" type="submit" value="Update Profile" />
      </form>
      <span className="logOut" className="logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      <div className="no-mobile">
        <span>크기를 줄이거나 핸드폰으로 접속하세요</span>
      </div>
    </div>
  );
};
