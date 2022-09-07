import { getSession } from "next-auth/react";
import Product from "../../../components/Models/Products";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = getSession({ req });

  if (!session) {
    return res.status(401).send("You are not authorized to be in this page");
  }

  db.connect();
  const products = await Product.find().lean();

  res.status(201).send(products);
};
export default handler;
