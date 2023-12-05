const mongoose = require("mongoose");
const { Schema } = mongoose;

const mongooseDelete = require("mongoose-delete");
const BlogScheme = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    categorie: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: false,
    },
    tag: [
      {
        required: false,
        type: Schema.Types.ObjectId,
        ref: "tags",
      },
    ],
    img: { type: String, required: false },
    desc_short: {
      type: String,
    },
    desc_long: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

BlogScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("blogs", BlogScheme);
