import { getSession } from "next-auth/react";
import singleProduct from "../../../components/Models/SingleProduct";

import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = getSession({ req });

  if (!session) {
    return res.status(401).send("you are not authorized to view this page");
  }

  const { slug } = req.query;

  db.connect();
  const product = await singleProduct.findOne({ id: slug });
  res.status(201).send(product);
};

export default handler;
