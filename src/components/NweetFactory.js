import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");

  const [attach, setAttach] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachURL = "";
    if (attach !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attach, "data_url");
      attachURL = await getDownloadURL(response.ref);
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      createorId: userObj.uid,
      attachURL,
    };

    await addDoc(collection(dbService, "nweets"), nweetObj);
    setNweet("");
    setAttach("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (f) => {
      const {
        currentTarget: { result },
      } = f;
      setAttach(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttach = (e) => {
    setAttach(null);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='what is on your mind?'
        maxLength={120}
        value={nweet}
        onChange={onChange}
      />
      <input type='file' accept='image/*' onChange={onFileChange} />
      <input type='submit' value='Nweet' />
      {attach && (
        <div>
          <img src={attach} width='50px' height='50px' />
          <button onClick={onClearAttach}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
