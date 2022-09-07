import { getSession } from "next-auth/react";
import Order from "../../../components/Models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  const { user } = session;

  if (!session) {
    return res.status(401).send("you are not authorized to view this page");
  }

  if (session) {
    db.connect();
    const orders = await Order.find({ user: user?._id });
    db.disconnect();

    res.status(201).send(orders);
  }
};
export default handler;
