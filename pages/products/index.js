import React from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";

const Products = () => {
  const products = useSelector((state) => state.productSlice.products);
  console.log(products);
  return (
    <div>
      <Layout title='products'>Products</Layout>
    </div>
  );
};

export default Products;
