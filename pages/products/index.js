import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../../app/Store";
import ProductFilters from "../../components/ProductFilters";
import ProductsSorts from "../../components/ProductsSorts";
import ProductsGridView from "../../components/ProductsGridView";
import ProductsListView from "../../components/ProductsListView";
import HeroSection from "../../components/HeroSection";
import { useSession } from "next-auth/react";

const Products = () => {
  const products = useSelector((state) => state.productSlice.filtered_products);
  const grid_view = useSelector((state) => state.productSlice.grid_view);
  const list_view = useSelector((state) => state.productSlice.list_view);
  const dispatch = useDispatch();

  const { data: session } = useSession();
  console.log(session);
  useEffect(() => {
    // dispatch(fetchProducts());
    dispatch(fetchProductss());
  }, [dispatch]);

  console.log(products);
  return (
    <div>
      <Layout title='products'>
        <HeroSection title='products' />
        <div className='productPageViewSmall productPageView md:pl-32 md:pr-8 relative gap-16 mt-20 '>
          <div className='md:h-screen mb-8'>
            <ProductFilters />
          </div>
          <div className=' '>
            <div>
              <ProductsSorts />
            </div>
            {products.length < 1 ? (
              <h4 className='italic bold mt-32'>
                No products for match the search result, try another search
                query....
              </h4>
            ) : (
              <div className='md:h-screen mx-4 md:overflow-auto  '>
                {grid_view && <ProductsGridView />}
                {list_view && <ProductsListView />}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Products;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    console.log(context);
    store.dispatch(fetchProductss());

    return {
      props: {},
    };
  }
);
