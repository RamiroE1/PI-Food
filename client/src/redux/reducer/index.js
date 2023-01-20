import { GET_RECIPE, GET_DIET, GET_ID_RECIPE, GET_TITLE_RECIPE, POST_RECIPE, FILTER_BY_RECIPE, FILTER_BY_DIET, ORDER_BY_HEALTHSCORE, SORT, DETAIL, DELETE_RECIPE, CLEAN } from "../actions/action-types.js";


const initialState = {
    allRecipe: [],
    recipe: [],
    diet: [],
    details: [],
};


function rootReducer (state = initialState, action){
    switch(action.type) {
        case GET_RECIPE:
            return{
                ...state,
                allRecipe: action.payload,
                recipe: action.payload,
            }
        case GET_DIET:
            return{
                ...state,
                diet: action.payload
            }
        case GET_TITLE_RECIPE:
            return{
                ...state,
                recipe: action.payload
            }



        case POST_RECIPE:
            let coun= [...state.recipe, action.payload]
            console.log(coun);
            return{
                ...state,
            }



        case ORDER_BY_HEALTHSCORE:
            const score = action.payload === "max"
            ? state.recipe.sort((a, b) => {
                return b.healthScore - a.healthScore
            })
            : state.recipe.sort((a, b) => {
                return a.healthScore - b.healthScore
            })
            return {
                ...state,
                recipe: score
            }

        case FILTER_BY_DIET:
            const allDiets= state.allRecipe;
            const dietsFilter= action.payload === '' ? allDiets : allDiets.filter(e => e.diets.includes(action.payload))
            return {
                ...state,
                recipe: dietsFilter
            }



        case FILTER_BY_RECIPE:
            const allRecipe = state.allRecipe
            let filterRecet= allRecipe
            if(action.payload === 'createdInDb') 
            filterRecet=allRecipe.filter(p=> isNaN(p.id))
            if(action.payload === 'All') 
            filterRecet=allRecipe
            if(action.payload === 'api') 
            filterRecet=allRecipe.filter(p=> typeof p.id === 'number')
            return {
                ...state,
                recipe: filterRecet
            };


        case SORT:
            const order= action.payload === "alphAsc" ? state.recipe.sort((a, b) => {
                if (a.title.toUpperCase() > b.title.toUpperCase()) {
                    return 1;
                }
                if (b.title.toUpperCase() > a.title.toUpperCase()) {
                    return -1
                }
                return 0;
            }) : state.recipe.sort((a, b) => {
                if (a.title.toUpperCase() > b.title.toUpperCase()) {
                    return -1
                }
                if (b.title.toUpperCase() > a.title.toUpperCase()) {
                    return 1
                }
                return 0
            })
            return{
                ...state,
                recipe: order
            }

        case GET_ID_RECIPE:
            return {
                ...state,
                details: action.payload
            }
        
        case DELETE_RECIPE:
            return {
                ...state,
                recipe: state.recipe.filter((a) => a.id !== action.payload)
            };
        
        case CLEAN:
            return {
                ...state,
                recipe: state.allRecipe,
            };


        default:
            return state;
    }
};



export default rootReducer;