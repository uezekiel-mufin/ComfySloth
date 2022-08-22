import Product from "../../components/Models/Products";
import User from "../../components/Models/User";
import data from "../../utils/data";
import db from "../../utils/db";
import axios from "axios";
import { products_url as url, single_product_url } from "../../utils/constants";
import SingleProduct from "../../components/Models/SingleProduct";

const handler = async (req, res) => {
  const response = await axios.get(url);
  const products = response.data;
  const generateShipping = (arr) => {
    arr.forEach((arr) => !arr.shipping && (arr.shipping = false));
  };
  generateShipping(products);

  // const resp = await axios.get(`${single_product_url}recm7wC8TBVdU9oEL`);
  // const product = resp.data;

  await db.connect();

  await User.deleteMany();
  await User.insertMany(data.users);
  if (products) {
    await Product.deleteMany();
    await Product.insertMany(products);
  }
  db.disconnect();
  res.status(201).send({ message: "seeded successfully" });
};
export default handler;
