const axios = require('axios');
require("dotenv").config();
const { API_KEY } = process.env;
const { Diet, Recipe } = require('../db.js');


const getApiInfo = async () => {
    const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const recipeData = recipes.data.results;
    const recipe = recipeData.map(e => {
        return{
            id: e.id,
            title: e.title,
            summary: e.summary,
            healthScore: e.healthScore,
            steps: e.analyzedInstructions[0]?.steps.map((e) => (e.step)).join(", "),
            image: e.image,
            dishTypes: e.dishTypes? e.dishTypes.map((dish) => dish).join(", "): "There is no dish",
            // diets: e.diets? e.diets.map((diet) => diet).join(", "): "There is no dish"
            diets: e.diets? e.diets.map((diet) => diet): "There is no diet"
        };
    });
    // console.log('getApiInfo: ',recipe);
    return recipe;
};

const dbInfo = async () => {
    const redulDb= await Recipe.findAll({
        include: {
            model: Diet,
            attributes:['name'],
            through: {
                attributes: [],
                }
    }})

    const recipe = redulDb.map(e => {
        let allDiets=e.diets.map(el => el.name)
        return{
            id: e.id,
            title: e.title,
            summary: e.summary,
            healthScore: e.healthScore,
            steps: e.steps,
            image: e.image,
            dishTypes: e.dishTypes,
            diets: allDiets
        };
    })
    return recipe
}

const getInfoDB = async () => {
    const recipesDB=await dbInfo();
    const reciApi= await getApiInfo();
    const info= recipesDB.concat(reciApi)
    return info
}


module.exports= {getInfoDB,dbInfo}