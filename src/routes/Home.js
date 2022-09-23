import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";

import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  //   const getNweets = async () => {
  //     const dbNweets = await getDocs(collection(dbService, "nweets"));
  //     dbNweets.forEach((document) => {
  //       const nweetObject = {
  //         ...document.data(),
  //         id: document.id,
  //       };
  //       setNweets((prev) => [nweetObject, ...prev]);
  //     });
  //   };
  useEffect(() => {
    // getNweets();
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((e) => (
          <Nweet
            key={e.id}
            nweetObj={e}
            isOwner={e.createorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
