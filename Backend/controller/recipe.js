import Recipes from '../models/recipe.js';
import multer from 'multer';

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

export const upload = multer({ storage: storage })

export const getRecipes = async (req, res) => {
    const recipes = await Recipes.find();
    return res.json(recipes);
  
};

export const getRecipe = async (req, res) => {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
}

export const addRecipe = async (req, res) => {
  //console.log(req.user)
  try {
    const { title, ingredients, instructions, time, coverImage } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const newRecipe = await Recipes.create({
      title,ingredients,instructions,time,coverImage:req.file.filename,
      createdBy:req.user.id
    });

    res.status(201).json(newRecipe);
  } catch (err) {
    console.error('Error adding recipe:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    let coverImage = req.file ?.filename ? req.file ?.filename : Recipes.coverImage;

    const updatedRecipe = await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage} , { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    return res.status(200).json({
      message: 'Recipe updated successfully',
      recipe: updatedRecipe,
    });

  } catch (error) {
    console.error('Error editing recipe:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const deleteRecipe = async (req, res) => {
  try {
    await Recipes.deleteOne({_id:req.params.id})
    res.json({status:"Okay"})
    
  } catch (error) {
    return res.status(400).json({message:"error"})
    
  }
};




 
