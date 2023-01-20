const axios = require('axios');
require("dotenv").config();
const { API_KEY } = process.env;
const { Diet, Recipe } = require('../db.js');
const {dbInfo}= require('./getRecipe')


    const getDetail = async (id) => {
        let recipeInfo = []
        const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        const idRecipe = await apiInfo.data
        const recipeDetail = recipeInfo.push({
            title: idRecipe.title,
            summary: idRecipe.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
            healthScore: idRecipe.healthScore,
            steps:idRecipe.analyzedInstructions[0]?.steps.map((e) => (e.step)).join(", "),
            // idRecipe.analyzedInstructions[0] && idRecipe.analyzedInstructions[0].steps? idRecipe.analyzedInstructions[0].steps.map((a) => a.step).join(" || "): "There is no steps",
            image: idRecipe.image,
            dishTypes: idRecipe.dishTypes? idRecipe.dishTypes.map((dish) => dish).join(", "): "There is no dish types",
            diets: idRecipe.diets ? idRecipe.diets.map((diet) => diet) : "There is no diet",
        });
        return recipeInfo
    };

const getDbDetail = async (id) => {
    const recipe = await dbInfo();
    let recipId = await recipe.filter((gam) => gam.id === id)
    return recipId
};

const dbApiDetail = async (id) => {
const idDb = id.includes('-');
if(idDb) {
    const recipaDb = await getDbDetail(id);
    return recipaDb
}else{
    const recipeApi = await getDetail(id);
    return recipeApi;
}
}

module.exports= {dbApiDetail}