const mongoose = require("mongoose");
const { Schema } = mongoose;

const mongooseDelete = require("mongoose-delete");
const VideoScheme = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    tag: {
      type: Schema.Types.ObjectId,
      ref: "tags",
    },
    img:{type:String,required:false},
    url:{type:String},
    desc_short: {
      type: String,
    },
    desc_long: {
      type: String,
    },
    user_create: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      profesion: {
        type: String,
      },
    },
    
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

VideoScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("video", VideoScheme);
