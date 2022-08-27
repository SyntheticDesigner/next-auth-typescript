//[...nextauth] is a catch all slug for requests sent to the auth api
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  //sessions is a setting used by next auth here we can tell it to use json web tokens
  providers: [
    Providers.Credentials({
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
