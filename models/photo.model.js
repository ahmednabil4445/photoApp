const mongoose=require('mongoose')

const schema= mongoose.Schema({
  path:String,

  createdBy: {
    type:mongoose.SchemaTypes.ObjectId,
    ref:"user",
  },
  createdAt: {
    type:Date,
    default: Date.now,
  },
  up:[{ type:mongoose.SchemaTypes.ObjectId,ref:"user",}],
  down:[{ type:mongoose.SchemaTypes.ObjectId,ref:"user",}],
  count: {
    type:Number,
    default:0,
  }
});
module.exports= mongoose.model("photo",schema)
