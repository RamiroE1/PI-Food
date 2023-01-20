import React from "react";
import s from "../Paginado/Paginado.module.css";

export default function Paginado ({ recipePerPage, currentPage, allRecipe, paginado }){
    const pageNumbers = [];

    if(currentPage === 13) {
        paginado(1)
    }

    for (let i=1; i <= Math.ceil(allRecipe/recipePerPage); i++) {
        pageNumbers.push(i)
    }
    

    return(
        <div className={s.container}>
            <button
                className={s.btn}
                onClick={() =>
                    paginado(currentPage === 1 ? pageNumbers.length : currentPage - 1)
                }
            >
                « Prev
            </button>
            {pageNumbers &&
                pageNumbers.map(number => (
                    <button
                        className={s.btn}
                        key={number}
                        onClick={() => paginado(number)}
                        >
                        {number}
                        </button>
                ))}
            <button
                className={s.btn}
                onClick={() =>
                paginado(
                    currentPage === 0
                        ? currentPage
                        : currentPage + 1,
                )}
            >
                Next »
            </button>
        </div>
    )
}