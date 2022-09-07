import axios from "axios";
import { getSession } from "next-auth/react";
import Order from "../../../components/Models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = getSession({ req });

  if (!session) {
    return res.status(401).send("Authentication required for this page");
  }
  const { order } = req.body;

  if (order.reference) {
    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${order.reference.reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      db.connect();
      await Order.updateOne({ _id: order._id }, { $set: { isPaid: true } });
      db.disconnect();
      res.status(201).send(response.data);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  res.status(201).send(order);
};

export default handler;
