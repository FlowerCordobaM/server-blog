const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongooseDelete = require("mongoose-delete");
const CategoryScheme = new mongoose.Schema(
  {
    name: {
      required:true,
      type: String,
      
    },
    user: {
      required:true,
      type: Schema.Types.ObjectId,
      ref: "users",
    },

    img: { type: String, required: false },
   
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

CategoryScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("categories", CategoryScheme);
