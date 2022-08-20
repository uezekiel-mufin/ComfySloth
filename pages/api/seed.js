import Product from "../../components/Models/Products";
import User from "../../components/Models/User";
import data from "../../utils/data";
import db from "../../utils/db";
import axios from "axios";
import { products_url as url } from "../../utils/constants";

const handler = async (req, res) => {
  const response = await axios.get(url);
  const products = response.data;
  const generateShipping = (arr) => {
    arr.forEach((arr) => !arr.shipping && (arr.shipping = false));
  };
  generateShipping(products);

  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  if (products) {
    await Product.deleteMany();
    await Product.insertMany(products);
  }
  db.disconnect();
  res.send({ message: "seeded successfully", products, data });
};
export default handler;
