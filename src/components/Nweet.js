import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService, storageService } from "fbase";

import { deleteObject, ref } from "firebase/storage";

const Nweet = ({ nweetObj, isOwner }) => {
  const [edit, setEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete this nweet?");

    if (ok) {
      await deleteDoc(NweetTextRef);
      await deleteObject(ref(storageService, nweetObj.attachURL));
    }
  };
  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(nweetObj, newNweet);
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEdit(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='Edit your Nweet'
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type='submit' value='Update Nweet'></input>
          </form>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachURL && (
            <>
              <img src={nweetObj.attachURL} width='50px' height='50px' />
            </>
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEdit}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
