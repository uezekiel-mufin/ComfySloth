import axios from "axios";
import jwt_Decode from "jwt-decode";
import { setUser } from "../Slices/cartSlice";
import { useDispatch } from "react-redux";

export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = () => {};

export const createOrGetUser = async (response) => {
  const decoded = jwt_Decode(response.credential);
  console.log(decoded);
  const { name, picture, sub, email } = decoded;

  const user = {
    _id: sub,
    picture,
    email,
    userName: name,
    isAdmin: false,
  };

  console.log(user);
  return user;
  // setUser(user);

  // await axios.post(`http://localhost:3000/api/auth`, user);
};
