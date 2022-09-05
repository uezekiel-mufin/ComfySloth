import Stripe from "stripe";

const handler = async (req, res) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const { orderItems, id } = req.body;
  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://zicomm-v2.vercel.app";

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
    success_url: redirectURL + `/order/${id}?status=success`,
    // success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
  });

  res.send(session);
};

export default handler;
