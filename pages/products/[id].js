import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import HeroSection from "../../components/HeroSection";
import Image from "next/image";
import { fetchProduct } from "../../Slices/productSlice";
import { BiCheck } from "react-icons/bi";
import { formatPrice } from "../../utils/helpers";
import Stars from "../../components/Stars";
import { addToCart, removeFromCart } from "../../Slices/cartSlice";
import axios from "axios";
import db from "../../utils/db";
import SingleProduct from "../../components/Models/SingleProduct";
import { wrapper } from "../../app/Store";
import { FiMinus } from "react-icons/fi";
import { HiPlusSm } from "react-icons/hi";
import { BiCircle } from "react-icons/bi";
import Cookies from "js-cookie";

const SingleProductPage = () => {
  const product = useSelector((state) => state.productSlice.product);
  const cart = useSelector((state) => state.cartSlice.cart.cartItems);
  console.log(cart);

  const {
    images,
    name,
    stars,
    company,
    colors,
    featured,
    price,
    description,
    available,
    category,
    shipping,
    stock,
    reviews,
  } = product;
  const [quantityOrdered, setQuantityOrdered] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);

  const [viewImage, setViewImage] = useState("/hero-bcg.jpeg");
  useEffect(() => {
    images && setViewImage(images[0].url);
  }, [images]);

  const [selectedColor, setSelectedColor] = useState("");
  const handleColorSet = (color) => {
    setSelectedColor(color);
    console.log(selectedColor);
    console.log(product);
  };
  console.log(product);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
      })
    );
  };

  useEffect(() => {
    console.log(Cookies.get("cart"));
  }, [cart]);

  return (
    <div>
      <Layout title={`Product ${id}`}>
        <HeroSection singleProduct={product} />
        <div className='p-24'>
          <button className='bg-[#ab7a5f] transition-all duration-300 ease-linear hover:scale-105 hover:bg-[#cea792] text-white px-6 md:px-8 tracking-widest mb-10 rounded-md py-1 mt-4 md:py-2'>
            back to product
          </button>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='h-11/12 w-11/12'>
              <Image
                src={viewImage}
                alt={name}
                height={100}
                width={100}
                layout='responsive'
                className='rounded-lg'
              />
              <div className='flex gap-4 mt-4'>
                {images?.map((item, index) => (
                  <div key={item.id} className='h-15 flex-1'>
                    <Image
                      src={item.url}
                      alt={item.name}
                      height={100}
                      width={100}
                      layout='responsive'
                      className='rounded-lg'
                      onClick={() => setViewImage(images[index].url)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col'>
              <h3 className='flex-1 font-bold'>{name}</h3>
              <h4 className='flex-1 flex gap-4'>
                <Stars stars={stars} /> ({reviews} customer reviews)
              </h4>
              <div className='flex-1 font-semibold text-[#ab7a5f]'>
                {formatPrice(price)}
              </div>
              <div className='flex-2 '>{description}</div>
              <div className='flex capitalize items-center flex-1 gap-8'>
                <span className='font-bold'>Available:</span>
                {stock > 1 ? <h6>In Stock</h6> : <h6>Out of Stock</h6>}
              </div>
              <div className='flex-1 flex capitalize gap-8'>
                <span className='font-bold'>SKU:</span> <span>{id}</span>
              </div>
              <div className='flex-1 flex capitalize gap-8'>
                <span className='font-bold'>Brand:</span> {company}
              </div>
              <hr />
              <div className='flex capitalize items-center gap-8 flex-1 '>
                <span className='font-bold'>Colors:</span>
                <div className='flex gap-2'>
                  {colors?.map((color) => (
                    <span
                      key={color}
                      className={` flex justify-center rounded-full text-white  items-center `}
                      onClick={() => handleColorSet(color)}
                    >
                      {selectedColor === color ? (
                        <BiCheck
                          style={{
                            background: color,
                            height: "1.5rem",
                            width: "1.5rem",
                            borderRadius: "50%",
                            opacity: 1,
                          }}
                        />
                      ) : (
                        <BiCircle
                          style={{
                            background: color,
                            height: "1.5rem",
                            width: "1.5rem",
                            borderRadius: "50%",
                            opacity: 0.5,
                          }}
                        />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex gap-8 items-center flex-1'>
                <button
                  onClick={() =>
                    setQuantityOrdered(() => {
                      if (quantityOrdered === 1) {
                        return quantityOrdered;
                      }
                      if (quantityOrdered > 1) {
                        return quantityOrdered - 1;
                      }
                    })
                  }
                >
                  <FiMinus />
                </button>
                <h3>{quantityOrdered}</h3>
                <button
                  onClick={() =>
                    setQuantityOrdered(() => {
                      if (quantityOrdered >= stock) {
                        alert("You have exceeded the number of items in stock");
                        return quantityOrdered;
                      }
                      if (quantityOrdered < stock) {
                        return quantityOrdered + 1;
                      }
                    })
                  }
                >
                  <HiPlusSm />
                </button>
              </div>
              <div>
                {stock > 0 && (
                  <button
                    className='bg-[#ab7a5f] transition-all duration-300 ease-linear hover:scale-105 hover:bg-[#cea792] text-white capitalize px-6 md:px-12 tracking-widest rounded-md py-2 mt-4 md:py-4'
                    onClick={() =>
                      handleAddToCart({
                        ...product,
                        quantity: quantityOrdered,
                        selectedColor,
                      })
                    }
                  >
                    add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SingleProductPage;

// export async function getServerSideProps(context) {
//   const { id } = context.params;
//   await db.connect();
//   const product = await SingleProduct.findOne({ id }).lean();
//   await db.disconnect();
//   return {
//     props: {
//       product: product ? db.convertDocToObj(product) : null,
//     },
//   };
// }

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    ({ query }) => {
      const id = query.id;
      console.log(query);
      console.log(id);
      id && store.dispatch(fetchProduct(`${id}`));

      return {
        props: {},
      };
    }
);
