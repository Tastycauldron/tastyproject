import React, { useState } from "react";
import RecipeCard from "./components/RecipeCard";
import recipes from "./data/recipes";
import "./App.css";
import SparkleTrail from "./SparkleTrail";

function App() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [userIngredients, setUserIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addIngredient = () => {
    const trimmed = ingredientInput.trim().toLowerCase();
    if (trimmed && !userIngredients.includes(trimmed)) {
      setUserIngredients([...userIngredients, trimmed]);
    }
    setIngredientInput("");
  };

  const matchingRecipes = recipes.filter((recipe) => {
    const matchesIngredient = recipe.ingredients.some((ingredient) =>
      userIngredients.includes(ingredient.toLowerCase())
    );

    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;

    return matchesIngredient && matchesCategory;
  });

  return (
    <>
      <SparkleTrail />
      <div className="App">
        <header>
          <h1>🔮 Tasty Cauldron Recipe Matcher</h1>
          <div className="input-area">
            <input
              type="text"
              placeholder="Enter an ingredient..."
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
            />
            <button onClick={addIngredient}>Add</button>
          </div>

          {userIngredients.length > 0 && (
            <>
              <p>
                Your ingredients:{" "}
                {userIngredients.map((ing, idx) => (
                  <span key={idx}>
                    {ing}
                    {idx < userIngredients.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <button onClick={() => setUserIngredients([])}>
                Clear Ingredients
              </button>
            </>
          )}

          <div className="category-filter">
            <label htmlFor="category">Filter by category: </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Drink">Drink</option>
            </select>
          </div>
        </header>

        <main>
          {userIngredients.length === 0 ? (
            <p>🔍 Enter some ingredients to get started!</p>
          ) : matchingRecipes.length > 0 ? (
            matchingRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p>No matching recipes found 💭</p>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
