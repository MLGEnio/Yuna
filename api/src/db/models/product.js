import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    color: { type: String },
    size: { type: String },
    // images: [{ type: Buffer }],
  },
  { timestamps: true }
);

export const Product = mongoose.model("product", productSchema);
