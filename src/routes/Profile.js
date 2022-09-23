import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const getMyNweets = async () => {
    const nweets = query(
      collection(dbService, "nweets"),
      where("createorId", "==", userObj.uid),
      orderBy("createdAt", "asc")
    );

    const querySnapshot = await getDocs(nweets);

    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
    });
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  useEffect(() => {
    getMyNweets();
    setNewDisplayName(
      userObj.displayName == null
        ? userObj.email.split("@")[0]
        : userObj.displayName
    );
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          onChange={onChange}
          value={newDisplayName}
          placholder='Display name'
        />
        <input type='submit' value='Update Name' />
      </form>
      <button onClick={onLogOutClick}>Logout</button>
    </>
  );
};
export default Profile;
