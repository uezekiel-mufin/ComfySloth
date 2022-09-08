import mongoose from "mongoose";

const singleProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    images: { type: Array, required: true },
    price: { type: Number, required: true },
    shipping: { type: Boolean, required: true, default: false },
    colors: { type: Array, required: true },
    reviews: { type: Number, required: true },
    stock: { type: Number, required: true },
    featured: { type: Boolean, required: false },
    stars: { type: Number, required: true },
  },
  {
    timestamps: false,
  }
);
const singleProduct =
  mongoose.models.singleproducts ||
  mongoose.model("singleproducts", singleProductSchema);
export default singleProduct;
