import Stripe from "stripe";
import { formatPrice } from "../../../utils/helpers";
import { useRouter } from "next/dist/client/router";

const handler = async (req, res) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const { orderItems, id } = req.body;
  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://zicomm-v2.vercel.app";

  // const transformedProduct = {
  //   price: "price_1LejTwJElICB3CJXCNWRAePx",
  //   quantity: 2,
  //   description: `You are about to make a payment of ${formatPrice(total)}`,
  // };

  const productLists = orderItems.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: productLists,
    mode: "payment",
    success_url: redirectURL + `/order/${id}`,
    // success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
  });

  res.send(session);
};

export default handler;
