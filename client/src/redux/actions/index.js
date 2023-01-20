import axios from "axios";
import Detail from "../../components/Detail/Detail.jsx";
import { GET_RECIPE, GET_DIET, GET_TITLE_RECIPE, GET_ID_RECIPE, FILTER_BY_RECIPE, FILTER_BY_DIET, ORDER_BY_HEALTHSCORE, SORT, DELETE_RECIPE, CLEAN, POST_RECIPE } from "./action-types.js";

export function getRecipe(){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes`);
        return dispatch({
            type: GET_RECIPE,
            payload: json.data
        })
    };
}

export function getDiet(){
    return async function (dispatch){
        var json = await axios.get(`http://localhost:3001/diets`);
        return dispatch({
            type: GET_DIET,
            payload: json.data
        })
    };
}

export function getTitleRecipe(title){
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/recipes?title=${title}`);
            return dispatch ({
                type: GET_TITLE_RECIPE,
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function getIdRecipe(id){
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch ({
                type: GET_ID_RECIPE,
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function postRecipe(payload){
    return async function(dispatch){
            let res = await axios.post(`http://localhost:3001/recipes`, payload);
            return dispatch({
                type: POST_RECIPE,
                payload: res.data,
        });
    };
}

export function filterByRecipe(payload){
    return{
        type: FILTER_BY_RECIPE,
        payload
    }
}

export function filterByDiet(payload){
    return{
        type: FILTER_BY_DIET,
        payload
    }
}

export function filterByHealthScore(payload){
    return{
        type: ORDER_BY_HEALTHSCORE,
        payload
    }
}

export function sort(payload){
    return{
        type: SORT,
        payload,
    };
}

export function deleteRecipe(id) {
    return async function (dispatch) {
        try{
            const recipe = await axios.delete(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: DELETE_RECIPE,
                payload: recipe,
            });
        } catch (error){
            alert(error)
        }
    };
};

export function clean() {
    return {
        type: CLEAN,
    };
}