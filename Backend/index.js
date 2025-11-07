import express from 'express';
import recipeRoutes from './routes/recipe.js';
import userRoutes from './routes/user.js';
import { config } from 'dotenv';
import db from './config/db.js';
import cors from 'cors';
config();

db.connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"))

app.use("/", userRoutes);
app.use("/recipe", recipeRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
