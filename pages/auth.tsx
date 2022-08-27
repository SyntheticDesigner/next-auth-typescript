import { NextPage } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";

const AuthPage: NextPage = () => {
  //Client side authentication handling
  //if the user is authenticated we don't want them to be able to visit this page.
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <AuthForm />;
};

export default AuthPage;
