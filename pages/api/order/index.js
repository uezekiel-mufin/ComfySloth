import { getSession } from "next-auth/react";
import Order from "../../../components/Models/Order";
import User from "../../../components/Models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });

  console.log(session);
  if (!session?.user) {
    return res.status(401).send("you are not authenticated, signin required");
  }

  if (session?.user) {
    await db.connect();
    const user = await User.findOne({ email: session.user.email });

    const newOrder = new Order({
      ...req.body,
      user: user._id,
    });

    const order = await newOrder.save();
    res.status(201).send(order);
  }
};
export default handler;
