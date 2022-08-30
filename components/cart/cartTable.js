import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { quantityUpdate, removeFromCart } from "../../Slices/cartSlice";
import { formatPrice } from "../../utils/helpers";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import { FcSearch } from "react-icons/fc";
import { BiCheck } from "react-icons/bi";
import Image from "next/image";

import { ToastContainer, toast } from "react-toastify";

const CartTable = () => {
  const cart = useSelector((state) => state.cartSlice.cart.cartItems);
  const dispatch = useDispatch();
  console.log(cart);

  const selectItems = (num) => {
    const arrItems = [...new Array(num).keys()];
    return arrItems;
  };

  const handleUpdate = (e, item) => {
    e.preventDefault();
    const newQty = Number(e.target.value);
    const quantity = newQty > item.stock ? item.quantity : newQty;
    dispatch(quantityUpdate({ ...item, quantity }));
  };

  const handleDelete = (e, item) => {
    const id = item.id;
    dispatch(removeFromCart(id));
    toast.success("you just removed an item from your cart");
  };
  return (
    <div className='px-4 py-10 md:px-28'>
      <table className='min-w-full '>
        <thead className=' border-b border-b-black'>
          <tr className='font-bold text-xl'>
            <td className='px-5 text-left'>Item</td>
            <td className='p-5 text-right'>Price</td>
            <td className='p-5 text-right'>Quantity</td>
            <td className='p-5 text-right'>Subtotal</td>
            <td className='p-5 text-center'>Actions</td>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className='border-b'>
              <td className='p-5 text-left flex gap-4'>
                <div className='h-36 w-36 relative'>
                  <Image
                    src={item.images[0].url}
                    alt={item.name}
                    height='200px'
                    width='200px'
                    layout='intrinsic'
                    className='rounded-md'
                  />
                  <Link href={`/products/${item.id}`}>
                    <a className='absolute top-0  right-0 flex justify-center transition-all duration-300 ease-linear items-center w-full h-full text-4xl opacity-5 hover:opacity-100 hover:bg-none '>
                      <FcSearch />
                    </a>
                  </Link>
                </div>
                <div className='flex flex-col justify-center '>
                  <h4 className='font-bold'>{item.name}</h4>
                  <span className='flex gap-4 text-xl font-semibold'>
                    Color:
                    <span
                      className={` flex justify-center rounded-full text-white  items-center `}
                    >
                      <BiCheck
                        style={{
                          background: item.selectedColor,
                          height: "1.5rem",
                          width: "1.5rem",
                          borderRadius: "50%",
                        }}
                      />
                    </span>
                  </span>
                </div>
              </td>
              <td className='p-5 text-right text-[#ab7a5f] text-xl tracking-widest'>
                {formatPrice(item.price)}
              </td>
              <td className='p-5 text-right'>
                <select
                  value={item.quantity}
                  className='p-2 max-w-md text-2xl font-bold'
                  onChange={(e) => handleUpdate(e, item)}
                >
                  {selectItems(item.stock + 1)
                    .slice(1)
                    .map((item) => (
                      <option key={item} value={item} className='font-bold'>
                        {item}
                      </option>
                    ))}
                </select>
              </td>
              <td className='p-5 text-right text-xl tracking-widest'>
                {formatPrice(item.quantity * item.price)}
              </td>
              <td className='p-5 text-center h-full text-red-500  justify-center  text-3xl'>
                <button onClick={(e) => handleDelete(e, item)}>
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
