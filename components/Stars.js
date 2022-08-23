import React from "react";
import { BsStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

const Stars = ({ stars }) => {
  const tempNumber = [...new Array(5).keys()];

  return (
    <div className='flex '>
      {tempNumber.map((numb) => (
        <span key={numb}>
          {stars >= numb + 1 ? (
            <BsStarFill />
          ) : stars > numb ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
      ))}
    </div>
  );
};

export default Stars;
