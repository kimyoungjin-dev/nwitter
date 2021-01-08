import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form className="container nweetEdit" onSubmit={onSubmit}>
            <input
              className="formInput"
              onChange={onChange}
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              autoFocus
              required
            />
          </form>
          <div className="nweetEdit-updateAndCancle">
            <input
              className="nweetEdit-update"
              type="submit"
              value="Update Nweet"
            />
            <span className="nweetEdit-cancle" onClick={toggleEditing}>
              Cancel
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="nweetList">
            <FontAwesomeIcon icon={faListAlt} />
            <span className="nweet-Tweet-list">내가 작성한 트윗목록</span>
          </div>
          <div className="nweet-creation-screen">
            <img src={nweetObj.photoURL} />
            <h4>{nweetObj.text}</h4>

            {nweetObj.attachmentUrl && (
              <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
            )}
          </div>
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
