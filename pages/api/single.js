import axios from "axios";
import SingleProduct from "../../components/Models/SingleProduct";
import { single_product_url as url } from "../../utils/constants";
import db from "../../utils/db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    res.status(200).json(url);
  } else if (req.method === "POST") {
    const newId = req.body.id;

    const response = await axios.get(`${url}${newId}`);
    const product = response.data;
    // await db.connect();

    // await singleProduct.deleteMany();
    // await singleProduct.insertMany(product);

    if (product) {
      await SingleProduct.deleteMany();
      await SingleProduct.insertMany(product);
    }
    db.disconnect();
    res.status(201).send(product);
  }
};

export default handler;
