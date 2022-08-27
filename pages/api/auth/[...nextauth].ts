//[...nextauth] is a catch all slug for requests sent to the auth api
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  //sessions is a setting used by next auth here we can tell it to use json web tokens
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string }) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        //check the database to see isf the user logging in exists
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log in!");
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
