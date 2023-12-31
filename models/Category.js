const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: String,
  color: String,
});

const Category = mongoose.model("Categories", categoriesSchema);

module.exports = Category;
