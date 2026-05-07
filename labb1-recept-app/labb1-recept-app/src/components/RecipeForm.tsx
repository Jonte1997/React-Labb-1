import { useEffect, useState } from "react";
import type { Recipe } from "../types/Recipe";

type RecipeFormProps = {
  onCreate: (recipe: {
    name: string;
    cuisine: string;
    difficulty: string;
    ingredients: string[];
    instructions: string[];
  }) => void;
  onUpdate: (recipe: Recipe) => void;
  editingRecipe: Recipe | null;
};

function RecipeForm({ onCreate, onUpdate, editingRecipe }: RecipeFormProps) {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
  if (editingRecipe) {
    setName(editingRecipe.name);
    setCuisine(editingRecipe.cuisine);
    setDifficulty(editingRecipe.difficulty);
    setIngredients(editingRecipe.ingredients.join(", "));
    setInstructions(editingRecipe.instructions.join(", "));
  }
}, [editingRecipe]);

function submitRecipe(event: React.FormEvent) {
  event.preventDefault();

  const recipeData = {
    name,
    cuisine,
    difficulty,
    ingredients: ingredients.split(","),
    instructions: instructions.split(","),
  };

  if (editingRecipe) {
    onUpdate({
      ...editingRecipe,
      ...recipeData,
    });
  } else {
    onCreate(recipeData);
  }

  setName("");
  setCuisine("");
  setDifficulty("Easy");
  setIngredients("");
  setInstructions("");
}

  return (
    <form onSubmit={submitRecipe}>
      <h2>{editingRecipe ? "Redigera recept" :"Lägg till recept"}</h2>

      <input
        placeholder="Namn"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        placeholder="Kök / typ av rätt"
        value={cuisine}
        onChange={(event) => setCuisine(event.target.value)}
      />

      <select
        value={difficulty}
        onChange={(event) => setDifficulty(event.target.value)}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <input
        placeholder="Ingredienser, separera med komma"
        value={ingredients}
        onChange={(event) => setIngredients(event.target.value)}
      />

      <input
        placeholder="Instruktioner, separera med komma"
        value={instructions}
        onChange={(event) => setInstructions(event.target.value)}
      />

      <button type="submit">{editingRecipe ? "Spara ändringar" : "Lägg till"}</button>
    </form>
  );
}

export default RecipeForm;