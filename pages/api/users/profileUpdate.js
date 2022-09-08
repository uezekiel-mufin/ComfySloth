import { getSession } from "next-auth/react";
import User from "../../../components/Models/User";
import db from "../../../utils/db";
import bcryptjs from "bcryptjs";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("You are not authorized to view this page");
  }

  const { newData } = req.body;

  db.connect();
  await User.updateMany(
    { email: session.user.email },
    {
      $set: {
        email: newData.email,
        password: bcryptjs.hashSync(newData.password),
        name: newData.name,
      },
    }
  );
  db.disconnect();

  res.status(201).send(newData);
};

export default handler;
