import { getSession } from "next-auth/react";
import singleProduct from "../../../components/Models/SingleProduct";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = getSession({ req });

  if (!session) {
    return res.status(401).send("You are not authorized to view this page");
  }

  db.connect();
  const featured = await singleProduct.find({ featured: true });
  db.disconnect();
  res.status(201).send(featured);
};

export default handler;
