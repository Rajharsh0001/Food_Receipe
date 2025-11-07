import { Router } from 'express';
import { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload } from '../controller/recipe.js';
import verifyToken from '../middleware/Auth.js'
const router = Router();

router.get('/', getRecipes);//get all recipes from here
router.get("/:id", getRecipe);
router.post("/",upload.single('file'), verifyToken, addRecipe);
router.put("/:id",upload.single('file'), editRecipe);
router.delete("/:id", deleteRecipe);



export default router;