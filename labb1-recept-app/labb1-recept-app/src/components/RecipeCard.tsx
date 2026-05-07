import type { Recipe } from"../types/Recipe";

type RecipeCardProps = { 
    recipe: Recipe;
    onDelete: (id:number)=> void;
    onEdit: (recipe:Recipe) => void;
};

function RecipeCard({ recipe, onDelete, onEdit }: RecipeCardProps) {
    return (
        <li>
            <h3>{recipe.name}</h3>
            <p>Svårighet: {recipe.difficulty}</p>
            <p>Rätt: {recipe.cuisine}</p>

            <button onClick={() => onDelete(recipe.id)}>
                Ta bort
            </button>
            <button onClick={() => onEdit(recipe)}>
                Redigera
            </button>
        </li>
    );
}

export default RecipeCard;