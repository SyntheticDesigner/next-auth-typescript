import { NextApiHandler } from "next";
import { connectToDatabase } from "../../../lib/db";
import { Db } from "mongodb";
import { hashPassword } from "../../../lib/auth";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password }: { email: string; password: string } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should be at least 7 characters long",
      });
      return;
    }
    const client = await connectToDatabase();
    const db: Db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created user!" });
  }
};

export default handler;
