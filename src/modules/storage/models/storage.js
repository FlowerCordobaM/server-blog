const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")
const { Schema } = mongoose;
const StorageScheme = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref:'users'
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);
StorageScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("storages", StorageScheme)

