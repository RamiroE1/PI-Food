import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTitleRecipe } from "../../redux/actions";
import f from "./SearchBar.module.css";





export default function SearchBar (){
    const dispatch= useDispatch();
    const [title, setTitle]= useState('');


    function handleInputChange (e){
        e.preventDefault();
        setTitle(e.target.value);
        console.log(title)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getTitleRecipe(title));
        setTitle("");
    }

    return (
        <div>

            <input
            type= "text"
            placeholder= "Search recipe..."
            onChange= {(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={e => handleSubmit(e)}> Search </button>
        </div>
    )
}