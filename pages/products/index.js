import React from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import db from "../../utils/db";
import Product from "../../components/Models/Products";

const Products = ({ products }) => {
  // const products = useSelector((state) => state.productSlice.products);
  console.log(products);
  return (
    <div>
      <Layout title='products'>
        
      </Layout>
    </div>
  );
};

export default Products;

export async function getServerSideProps() {
  db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
