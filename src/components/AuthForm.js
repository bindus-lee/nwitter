import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    console.log(value);
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className='authSub'>
        <input
          name='email'
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        />
        <input type='submit' value={newAccount ? "Create Account" : "Login"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Signin" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
