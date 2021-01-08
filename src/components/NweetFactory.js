import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShopware } from "@fortawesome/free-brands-svg-icons";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";

import {
  faPlus,
  faTimes,
  faHome,
  faEnvelopeSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    if (nweet === "") {
      return;
    }

    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
      photoURL: userObj.photoURL,
      email: userObj.email,
      displayName: userObj.displayName,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment("");
  return (
    <>
      <form className="factoryForm" onSubmit={onSubmit}>
        <nav className="nweet-nav">
          <ul className="nweet-ul">
            <li>
              <FontAwesomeIcon icon={faHome} />
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelopeSquare} />
            </li>
            <li>
              <FontAwesomeIcon icon={faShopware} />
            </li>
            <li>
              <FontAwesomeIcon icon={faUser} />
            </li>
          </ul>
        </nav>
        <div className="factoryInput__container">
          <input //nweet입력칸
            className="factoryInput__input"
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="당신의 트윗을 작성해보세요"
            maxLength={120}
          />
        </div>
        <div className="nweetfactory-imgAndPhoto">
          <label htmlFor="attach-file">
            <span>사진추가하기</span>
            <FontAwesomeIcon icon={faPlus} />
          </label>
          <input type="submit" value="트윗" />
        </div>

        <div className="nweetList">
          <FontAwesomeIcon icon={faListAlt} />
          <span className="nweet-Tweet-list">내가 작성한 트윗목록</span>
        </div>

        <input //+버튼을 누르면 나오는 사진 첨부컨텐츠
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ opacity: 0 }}
        />

        {attachment && ( //미리 보기 사진
          <div className="factoryForm__attachment">
            <img src={attachment} style={{ backgroundImage: attachment }} />

            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>취소</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </>
  );
};
export default NweetFactory;
