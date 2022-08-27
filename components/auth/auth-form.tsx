import React, { FormEvent, useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import classes from "./auth-form.module.css";

async function createUser(email: string, password: string) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //optional add validation
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      });
      if (!result.error) {
        router.replace("/profile");
      }
    } else {
      try {
        const result = await createUser(
          emailInputRef.current.value,
          passwordInputRef.current.value
        );
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            ref={passwordInputRef}
            type='password'
            id='password'
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
