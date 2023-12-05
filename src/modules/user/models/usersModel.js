const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const UserScheme = new mongoose.Schema(
  {
    name: {type: String,},
    email: {type: String,unique: true,},
    password: {type: String,},
    profesion: {type: String,required:false},
    google: {type: String,required:false},
    // password: {type: String,},
    role: { type: [String], enum: ["USER_ROLE", "USER_ADMIN"], default: ["USER_ROLE"] },
    img:{type:String,required:false}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });

UserScheme.method('toJSON', function() {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  object.role = this.role;
  return object;
})
module.exports = mongoose.model("users", UserScheme);
