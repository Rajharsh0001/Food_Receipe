import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: String, required: true },
  time: { type: String },
  coverImage: { type: String },
  createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
});

const Recipes = mongoose.model('Recipe', recipeSchema);
export default Recipes;
