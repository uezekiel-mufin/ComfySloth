import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     id: { type: String, required: true, unique: true },
//     category: { type: String, required: true },
//     description: { type: String, required: true },
//     company: { type: String, required: true },
//     image: { type: String, required: true },
//     price: { type: Number, required: true },
//     shipping: { type: Boolean, required: true, default: false },
//     colors: { type: Array, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );
const Product = mongoose.model.Product;
export default Product;
