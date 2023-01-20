const { getInfoDB } = require('../Controllers/getRecipe.js');
const {dbApiDetail}=require('../Controllers/getRecipeId')
const { getApiInfo } = require('../Controllers/getRecipeTitle.js');
const { Router } = require('express');
const { Op } = require('sequelize');
const {Recipe, Diet} = require('../db.js');



const router = Router();


router.get('/recipes', async (req,res) => {
    const {title}= req.query;
    try{
        if(title){
            const recipeTitle= await getApiInfo(title);
            const nameRecipe= await Recipe.findAll({
                where: {
                title: {[Op.iLike]:`%{title}%`}
                }
            })
            const allTitle= recipeTitle.concat(nameRecipe)
            const recipeTi= await getInfoDB();
                const name= recipeTi?.filter(
                (p) => p.title.toUpperCase() === title.toUpperCase()
                ); 
                const allTit= allTitle.concat(name)
            allTit? res.status(200).send(allTit) : res.status(404).json("Error");
        } else {
            const allRecipe= await getInfoDB();
            res.status(200).json(allRecipe)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.get('/recipes/:id',async (req,res) => {
        {
            try{
                const{id}=req.params;
                const recipeTodos= await dbApiDetail(id);
                recipeTodos.length? res.status(200).send(recipeTodos) : res.status(404).send('No existe recipe')
            } catch(error) {
                res.status(400).json(error.message)
            }
        }
    } );

module.exports= router;