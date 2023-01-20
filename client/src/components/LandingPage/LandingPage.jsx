import React from "react";
import { Link } from "react-router-dom";
import f from "./LandingPage.module.css";
import video1 from "../../img/lanfood.gif";




export default function LandingPage(){
    return(
        <div>
            <img className={f.video} src={video1} alt='lanfood.gif' />
            <h1 className={f.h1}>Welcome to Food</h1>
            <Link to ='/home'>
                <button className={f.btn}>Get Into</button>
            </Link>
        </div>
    );      
}