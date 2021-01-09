import React, { useState } from "react";
import { authService, storageService } from "fbase";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCamera } from "@fortawesome/free-solid-svg-icons";
import {
  faCheckSquare,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";

import { Link } from "react-router-dom";
export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [attachment, setAttachment] = useState();

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
    if (userObj.photoURL !== attachment) {
      await userObj.updateProfile({
        photoURL: attachment,
      });
      refreshUser();
      setAttachment(null);
    }
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = async (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      const attachRef = storageService.ref().child(`${userObj.uid}`);
      const response = await attachRef.putString(result, "data_url");
      const attachmentUrl = await response.ref.getDownloadURL();
      setAttachment(attachmentUrl);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment("");

  return (
    <div className="container profile-container">
      <div className="profile-left">
        <img
          className="profilePhoto"
          src={userObj.photoURL}
          value={userObj.photoURL}
        />
        <label htmlFor="attach-file">
          <FontAwesomeIcon id="attach-file-icon" icon={faCamera} />
        </label>
        <input
          id="attach-file"
          type="file"
          onChange={onFileChange}
          style={{ opacity: 0 }}
        />
      </div>
      <div className="profile-center">
        {attachment && (
          <>
            <div className="profile-attachment">
              <img src={attachment} width="80px" height="80px" />
              <div className="profile-checkBox">
                <div className="profileIconBox">
                  <form onSubmit={onSubmit}>
                    <label htmlFor="attach-checkIcon">
                      <FontAwesomeIcon icon={faCheckSquare} />
                    </label>
                    <input
                      id="attach-checkIcon"
                      type="submit"
                      value="변경"
                      style={{ opacity: 1 }}
                    />
                    <label htmlFor="attach-cancleIcon">
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </label>
                    <input
                      id="attach-cancleIcon"
                      type="text"
                      value="취소"
                      onClick={onClearAttachment}
                    />
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
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
