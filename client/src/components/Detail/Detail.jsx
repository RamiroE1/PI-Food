import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIdRecipe, clean } from "../../redux/actions";
import s from "./Detail.module.css";
import image3 from "../../img/Comida1.jpg";
import { useState } from "react";


export default function Detail() {
    const dispatch = useDispatch()

    const recipeDetail = useSelector((state) => state.details);
    const {id}= useParams();
    const [ cambio, setCambio ] = useState(false);

    useEffect(() => {
        dispatch(getIdRecipe(id));
        setCambio(true);
        return () => { dispatch(clean()) }
    }, [dispatch, id])
    

    return (
        <div>
            <img className={s.img} src={image3} alt='Comida1' />
            <h1> </h1>
            <div className={s.Details} >
                {
                    recipeDetail.length > 0
                    ? <div className={s.content}>
                        <img src={recipeDetail[0].image} alt='Recipe img' width='100px' height='100px'/>
                        <h2>{recipeDetail[0].title}</h2>
                        <div className={s.wrapper}>
                            <div>Diet Type: {recipeDetail[0].diets?.map(die => (die.name ? die.name : die)).join(' | ')}</div>
                            <div>Dish Types: {recipeDetail[0].dishTypes}</div>
                            <div>Summary of the dish: {recipeDetail[0].summary}</div>
                            <div>Healthy food level: {recipeDetail[0].healthScore}</div>
                            <div>Step by Step: {recipeDetail[0]?.steps}</div>
                        </div>
                        </div> : <p> Charging ...</p>
                }
        </div>
        <br/>
        <div>
                    <Link to='/home'>
                        <button className={s.button}> Return </button>
                    </Link>
        </div>
        </div>
    )
}