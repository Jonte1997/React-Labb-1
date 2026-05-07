import { useEffect, useState } from "react";
import type { Recipe } from "./types/Recipe";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";

/* States */
function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("https://dummyjson.com/recipes");

        if (!response.ok) {
          throw new Error("Kunde inte hämta recept");
        }

        const data = await response.json();

        setRecipes(data.recipes);
      } catch (err) {
        setError("Något gick fel");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

async function deleteRecipe(id: number) {
  try {
    await fetch(`https://dummyjson.com/recipes/${id}`, {
      method: "DELETE",
    });

    // ta bort recept från state
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  } catch (error) {
    setError("Kunde inte ta bort recept");
  }
}

function startEditRecipe(recipe: Recipe) {
  setEditingRecipe(recipe);
}

/* Uppdatering av recept */
async function updateRecipe(updatedRecipe: Recipe) {
  try {
    await fetch(`https://dummyjson.com/recipes/${updatedRecipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecipe),
    });

    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );

    setEditingRecipe(null);
  } catch {
    setError("Fel vid uppdatering");
  }
}
/* funktion för att skapa nya recept */
async function createRecipe(newRecipe: {
  name: string;
  cuisine: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
}) {
  try {
    const res = await fetch("https://dummyjson.com/recipes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });

    const data = await res.json();

    setRecipes((prev) => [data, ...prev]);
  } catch {
    setError("Kunde inte skapa recept");
  }
}

const searchedRecipes = recipes.filter((recipe) =>
  recipe.name.toLowerCase().includes(search.toLowerCase())
);

const filteredRecipes = searchedRecipes.filter((recipe) =>
  difficultyFilter === "all" ? true : recipe.difficulty === difficultyFilter
);

const sortedRecipes = [...filteredRecipes].sort((a, b) => {
  if (sortBy === "name") {
    return a.name.localeCompare(b.name);
  }

  if (sortBy === "name-desc") {
    return b.name.localeCompare(a.name);
  }

  return 0;
});

  return (
    <div>
      <h1>Recept</h1>

      {/* Loading indikator */}
      {loading && <p>Laddar...</p>}
      {error && <p>{error}</p>}

      <RecipeForm 
      onCreate={createRecipe}
      onUpdate={updateRecipe}
      editingRecipe={editingRecipe} />
      <input
        type="text"
        placeholder="Sök recept..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {/* Filtrering för svårighetsgrad */}
      <select
        value={difficultyFilter}
        onChange={(event) => setDifficultyFilter(event.target.value)}
      >
        <option value="all">Alla</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
      </select>

      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
      >
        <option value="name">Namn A-Ö</option>
        <option value="name-desc">Namn Ö-A</option>
      </select>

      <RecipeList 
      recipes={sortedRecipes} 
      onDelete={deleteRecipe}
      onEdit={startEditRecipe} />
    </div>
  );
}

export default App;
