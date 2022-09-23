import React, { useState } from "react";
import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { async } from "@firebase/util";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };
  return (
    <div>
      <AuthForm />
      <div>
        <button name='google' onClick={onSocialClick}>
          Continue with google
        </button>
        <button name='github' onClick={onSocialClick}>
          Continue with github
        </button>
      </div>
    </div>
  );
};
export default Auth;
