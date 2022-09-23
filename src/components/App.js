import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import "./App.css";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        // if (user.displayName === null) {
        //   const name = user.email.split("@")[0];
        //   user.displayName = name;
        // }
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);

  const refreshUser = () => {
    // setUserObj(authService.currentUser);
    const user = authService.currentUser;
    console.log(authService.currentUser);
    setUserObj({ ...user });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "...Initializing"
      )}
      <footer>&copy;{new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
