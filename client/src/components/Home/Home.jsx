import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import f from "./Home.module.css";
import { filterByRecipe, getRecipe, getDiet, sort, filterByDiet, filterByHealthScore } from "../../redux/actions";
import imge2 from "../../img/im3.jpg";





export default function Home() {

    const dispatch = useDispatch();
    const allRecipe = useSelector((state) => state.recipe);
    const allDiets = useSelector((state) => state.diets);
    let [order, setOrder] = useState('');
    
    let [currentPage, setCurrentPage] = useState(1);
    let [recipePerPage, setRecipePerPage] = useState(9);
    if(currentPage === 1) recipePerPage = 9;
    const indexOfLastRecipe = currentPage * recipePerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
    const currentRecipe = allRecipe.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        paginado(1)
    },[allRecipe])

    useEffect (() => {
        dispatch(getDiet());
        dispatch(getRecipe());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipe());
    }

    function handleFilterByHealthScore(e){
            e.preventDefault();
            dispatch(filterByHealthScore(e.target.value));
            setCurrentPage(1);
            setOrder(`Ordenado ${e.target.value}`)
        };

    function handleFilterByDiet(e){
        e.preventDefault();
        dispatch(filterByDiet(e.target.value));
        setOrder(`Ordenado ${e.target.value}`)
    };

    function handleFilterByRecipe(e){
        e.preventDefault();
        dispatch(filterByRecipe(e.target.value));
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(sort(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    };

    return (
        <div>
            <img className={f.img} src={imge2} alt='im3.jpg'/>
        <h1>FOOD</h1>
        <button onClick={e=>{handleClick(e)}}>
            Reload all Recipes
        </button>



        <div className={f.filtros}>
        <hr/>
            <h3> Alphabetical order </h3>
            <select onChange={e => handleSort(e)}>
            <option value="alphAsc"> A-Z </option>
            <option value="alphDesc"> Z-A </option>
            </select>
            <hr/>
            <h3> Recipes </h3>
            <select onChange={e => handleFilterByRecipe(e)}>
            <option value=" "> ------ </option>
            <option value="All"> All Recipe </option>
            <option value="createdInDb"> Recipe Created </option>
            <option value="api"> Recipe Api</option>
            </select>
            <hr/>
            <h3> Diets </h3>
            <select onChange={e => handleFilterByDiet(e)}>
            <option value=""> ------ </option>
            <option value="gluten free"> Gluten Free </option>
            <option value="ketogenic"> Ketogenic </option>
            <option value="lacto ovo vegetarian"> Lacto Ovo Vegetarian </option>
            <option value="lacto vegetarian"> Lacto Vegetarian </option>
            <option value="vegan"> Vegan </option>
            <option value="pescatarian"> Pescatarian </option>
            <option value="paleolithic"> Paleolithic </option>
            <option value="primal"> Primal </option>
            <option value="fodmap friendly"> Fodmap Friendly </option>
            <option value="whole 30"> Whole 30 </option>
            <option value="dairy free"> Dairy Free </option>
            <option value="vegetarian"> Vegetarian </option>
            </select>
            <hr/>
            <h3> Healthy food level </h3>
            <select onChange={e => handleFilterByHealthScore(e)}>
            <option value="max"> Max Health Score </option>
            <option value="min"> Min Health Score </option>
            </select>
            <hr/>
            <hr/>

        </div>
        <SearchBar/>    
        <Paginado
        recipePerPage= {recipePerPage}
        allRecipe= {allRecipe.length}
        currentPage= {currentPage}
        paginado = {paginado}
        />
        <div className={f.card}> 
        {
            currentRecipe?.map(el => {
                return(
                    <div key={el.id}>
                    <Link to={"/detail/" + el.id}>
                    <Card image={el.image} title={el.title} diets={el.diets} key={el.id} id={el.id}/>
                    </Link>
                    </div>
                );
            })
        }
        </div>
        </div>
    )

};