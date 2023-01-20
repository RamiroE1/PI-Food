import React from "react";
import s from "./Card.module.css";

export default function Card({ image, title, diets }) {

    return(
        <div  className={s.container}>
            <img className={s.img} src={image}  width='100px' height='100px' alt="Not found" />
            <div className={s.title}><h3>{title}</h3></div>
            <div className={s.conContainer}>
                <span className={s.conTitle}>Type of Diet:</span>
                <h5>{diets}</h5>
            </div>
        </div>
    );
}