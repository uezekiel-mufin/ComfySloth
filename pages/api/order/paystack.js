import axios from "axios";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = getSession({ req });

  if (!session) {
    return res.status(401).send("Authentication required for this page");
  }
  const { reference } = req.body;

  if (reference) {
    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      res.status(201).send(response.data);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  //   res.status(201).send(reference);
};

export default handler;
