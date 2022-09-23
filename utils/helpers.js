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
  const { name, picture, email } = decoded;

  const user = {
    picture,
    email,
    userName: name,
    isAdmin: false,
  };

  console.log(user);
  return user;
};
