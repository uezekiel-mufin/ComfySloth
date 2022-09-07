import { getSession } from "next-auth/react";
import Order from "../../../components/Models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = getSession({ req });
  if (!session?.user) {
    return res.status(401).send("You are not authorized to view this page");
  }

  const { order } = req.body;

  db.connect();
  await Order.updateOne({ _id: order._id }, { $set: { isPaid: true } });
  db.disconnect();

  res.status(201).send(order);
};
export default handler;
