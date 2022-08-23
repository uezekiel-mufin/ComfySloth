import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { quantityUpdate, deleteItem } from "../../Slices/cartSlice";
import { formatPrice } from "../../utils/helpers";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";

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
    console.log(+e.target.value, item);
    dispatch(quantityUpdate({ ...item, quantity }));
    console.log(+e.target.value, item);
  };

  const handleDelete = (e, item) => {
    dispatch(deleteItem({ ...item }));
    console.log({ ...item });
    console.log("deleted");
  };
  return (
    <div className='p-4 md:p-28'>
      <table className='min-w-full overflow-scroll '>
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
                <div className='h-36 w-36'>
                  <Image
                    src={item.images[0].url}
                    alt={item.name}
                    height='200px'
                    width='200px'
                    layout='intrinsic'
                    className='rounded-md'
                  />
                </div>
                <div className='flex items-center flex-col justify-center '>
                  <h5 className='font-bold'>{item.name}</h5>
                  <span>
                    Color: <div className={`h-5 w-5 bg-[${item.colors[0]}]`} />{" "}
                  </span>
                </div>
              </td>
              <td className='p-5 text-right'> {formatPrice(item.price)}</td>
              <td className='p-5 text-right'>
                <select
                  value={item.quantity}
                  className='p-2 max-w-md'
                  onChange={(e) => handleUpdate(e, item)}
                >
                  {selectItems(item.stock + 1)
                    .slice(1)
                    .map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </td>
              <td className='p-5 text-right'>
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
