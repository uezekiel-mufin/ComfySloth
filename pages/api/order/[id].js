import Order from "../../../components/Models/Order";
import db from "../../../utils/db";
import { getCsrfToken } from "next-auth/react";

const handler = async (req, res) => {
  const csrfToken = await getCsrfToken({ req });

  if (!csrfToken) {
    return res.status(401).send("Sign in required");
  }

  db.connect();
  const order = await Order.findById(req.query.id);
  db.disconnect();

  res.status(201).send(order);
};

export default handler;
