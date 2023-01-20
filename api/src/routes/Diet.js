const axios= require('axios');
const { Diet, Recipe }= require('../db.js');
const { Router }= require('express');

const router= Router();

const dietsLocal =  [
    "gluten free",
    "ketogenic",
    "lacto ovo vegetarian",
    "lacto vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "fodmap friendly",
    "whole 30",
    "dairy free",
    "vegetarian"                     
];

router.get('/diets', async (req,res) => {
    try{
        const diets = dietsLocal.forEach(async (e) => {
            await Diet.findOrCreate({
                 where: {name: e}
             })
        })
        const die = await Diet.findAll()
        return res.status(200).send(die)
    }catch (error) {
        res.status(404).send(error)
    }
})

router.post('/recipes', async (req,res) => {
    const {
        title,
        summary,
        healthScore,
        steps,
        image,
        dishTypes,
        diets
    } = req.body
    let objInf={steps, title, summary, healthScore, image: image ? image : 'https://img.freepik.com/fotos-premium/salsa-tomate-pastas-fondo-negro_73387-288.jpg?w=900' , dishTypes}
    try {
        
        const createRecipe = await Recipe.create(objInf)
        let findDiet = await Diet.findAll({
        where: {name: diets}
        });
        createRecipe.addDiet(findDiet);
        console.log(steps);
        return res.status(201).json('Created')
    
 } catch (error) {
        return res.status(400).send(error.message)
    }
});

// router.put('/recipes/:id', async (req,res) => {
//     try{
//         const {id}= req.params;
//         const {title}=req.body;
//         await Recipe.update(
//             {title}, 
//             {where:{
//                 id
//             }}
//         )
//         res.status(200).send('Recipe modified')
//     } catch{
//         res.status(400).send('Not found');
//     }
// })

// router.delete('/recipes/:id', async (req,res) => {
//     try {
//         const {id}= req.params;
//         await Recipe.destroy(
//             {where:{
//                 id
//             }}
//             )
//             res.status(200).send('Recipe delete')
//     } catch{
//         res.status(400).send('Not found');
//     }
// })


module.exports= router;