import React from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../../app/Store";
import { fetchProductss } from "../../Slices/productSlice";
import ProductFilters from "../../components/ProductFilters";
import ProductsSorts from "../../components/ProductsSorts";
import ProductsGridView from "../../components/ProductsGridView";
import ProductsListView from "../../components/ProductsListView";
import HeroSection from "../../components/HeroSection";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { useLayoutEffect } from "react";
import { Circles } from "react-loader-spinner";

const Products = () => {
  const products = useSelector((state) => state.productSlice.filtered_products);
  const grid_view = useSelector((state) => state.productSlice.grid_view);
  const list_view = useSelector((state) => state.productSlice.list_view);
  const products_loading = useSelector(
    (state) => state.productSlice.products_loading
  );
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchProductss());
  }, [dispatch]);

  const handleScrollToTop = () => {
    const top = document.getElementById("window__top");
    top.scrollIntoView({ behavior: "smooth" });
  };
  if (products_loading) {
    return (
      <Layout>
        <div className='w-full h-screen flex justify-center items-center  bg-[#f3f0ee] '>
          <Circles
            height='150'
            width='150'
            color='#cea792'
            ariaLabel='circles-loading'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      </Layout>
    );
  }

  return (
    <div id='window__top'>
      <Layout title='products'>
        <HeroSection title='products' />
        <div className='relative productPageViewSmall productPageView md:pl-32 md:pr-8 gap-8  md:gap-16 mt-4 md:mt-20 '>
          <div className='md:mb-8 md:sticky md:h-screen top-4'>
            <ProductFilters />
          </div>
          <div className=' '>
            <ProductsSorts />

            {products.length < 1 ? (
              <h4 className='italic bold mt-32'>
                No products for match the search result, try another search
                query....
              </h4>
            ) : (
              <div className='relative  mx-4   '>
                {grid_view && <ProductsGridView />}
                {list_view && <ProductsListView />}
              </div>
            )}
            <span
              className='text-4xl absolute bottom-0 right-8'
              onClick={handleScrollToTop}
            >
              <BsArrowUpCircleFill />
            </span>
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
