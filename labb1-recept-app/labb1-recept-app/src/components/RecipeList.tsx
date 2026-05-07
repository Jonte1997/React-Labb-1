import type { Recipe } from "../types/Recipe";
import RecipeCard from "./RecipeCard";

type RecipeListProps = {
    recipes: Recipe [];
    onDelete: (id:number) => void;
    onEdit: (recipe: Recipe) => void;
};

function RecipeList({ recipes, onDelete, onEdit }: RecipeListProps ) {
    return ( 
        <ul>
            {recipes.map((recipe) => (
            <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onDelete={onDelete}
            onEdit={onEdit}
            /> 
        ))}
        </ul>
    );
}

export default RecipeList;