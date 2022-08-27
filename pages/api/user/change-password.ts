// /api/user/change-password
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });
  //get session will look into the req see if a session cookie has been validated
  //we should only be able to get the session if the user has been authenticated
  //if we don't get the session that means authentication failed
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const userCollection = client.db().collection("users");

  const user = await userCollection.findOne({ email: userEmail });
  //we can get the user email from the session storage since we encoded it into the auth cookie

  if (!user) {
    //its pretty strange if we cant find a user with the encoded email how did they get authenticated in the first place.
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
  console.log(passwordsAreEqual);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid Password" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  //   console.log(result);
  //$set is a special keyword recognized by mongodb, it takes the update object, if the key does not match a key in the object it will make a new one
  client.close();
  res.status(200).json({ message: "Password updated" });
};

export default handler;
