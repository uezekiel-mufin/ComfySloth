import { getSession } from "next-auth/react";
import Order from "../../../components/Models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = getSession({ req });

  if (!session) {
    return res.status(401).send("Sign in required");
  }

  db.connect();
  const order = await Order.findById(req.query.id);
  db.disconnect();

  res.status(201).send(order);
};

export default handler;
