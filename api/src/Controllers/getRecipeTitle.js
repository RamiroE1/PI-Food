const axios = require('axios');
require("dotenv").config();
const { API_KEY } = process.env;

const getApiInfo = async (title) => {
    const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${title}&apiKey=${API_KEY}&addRecipeInformation=true`);
    const recipeData = recipes.data.results;
    const recipe = recipeData.map(e => {
        return{
            id: e.id,
            title: e.title,
            summary: e.summary,
            healthScore: e.healthScore,
            steps: e.analyzedInstructions[0] && e.analyzedInstructions[0].steps? e.analyzedInstructions[0].steps.map((a) => a.step).join(" || "): "There is no steps",
            image: e.image,
            dishTypes: e.dishTypes? e.dishTypes.map((dish) => dish).join(", "): "There is no dish",
            // diets: e.diets? e.diets.map((diet) => diet).join(", "): "There is no dish"
            diets: e.diets? e.diets.map((diet) => diet): "There is no diet"
        };
    });
    // console.log('getApiInfo: ',recipe);
    return recipe;
};


module.exports= {getApiInfo}