import React from "react";

const CheckoutWizard = ({ activeStep = 0 }) => {
  const data = ["User Login", "Shipping", "Payment Method", "Place Order"];
  return (
    <div className='flex w-full mt-8'>
      {data.map((item, index) => (
        <div
          key={item}
          className={`flex justify-center p-2 flex-1 text-xl md:text-3xl border-b-2 ${
            index <= activeStep
              ? "border-indigo-600 text-indigo-600"
              : "border-gray-500 text-gray-500"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default CheckoutWizard;
