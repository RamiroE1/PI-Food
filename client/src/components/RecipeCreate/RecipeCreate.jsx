
import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiet, postRecipe , getRecipe,} from "../../redux/actions";
import style from "./RecipeCreate.module.css";
import ima4 from "../../img/ima4.gif";



export default function RecipeCreate () {
    const dispatch=useDispatch();
    const allRecipe=useSelector(state => state.recipe);
    const allDiets = useSelector(state => state.diet);
    const history=useHistory();
    const [errors, sertErrors]=useState({});
    
    function validate(input) {
        let errors={};
        if(input.title === ""){
            errors.title = "You must enter a title"
        }else if (!input.title.match(/^[A-Za-z\s]+$/)) {
            errors.title = "Only letters, please";
        }
        if(input.summary === ""){
            errors.summary = "You must enter a summary of the dish"
        }
        if(input.image === ""){
            errors.image = "You must enter an image"
        }
        if(input.dishTypes === ""){
            errors.dishTypes = "You must enter a type of dish"
        }
        if(!input.healthScore){
            errors.healthScore = "You must enter a healthy food level"
        } else if(input.healthScore < 0) {
            errors.healthScore = "Must be greater than 0"
        }
        if(input.steps === ""){
            errors.steps = "You must enter step by step"
        }
        if (!input.diets| input.diets.length === 0) {
            errors.diets = "You must select one or more types of diets"
        }
        return errors;
    }
    
    const [input, setInput]= useState({
        title: "",
        summary: "",
        image: "",
        dishTypes: "",
        healthScore: 0,
        steps: "",
        diets: [],
    })

    useEffect(() => {
        dispatch(getDiet());
        },[dispatch])

        useEffect(() => {
            dispatch(getRecipe());
            },[dispatch])

        const handleOnChange= (e) => {
            e.preventDefault();
            if(e.target.type === 'text')
            setInput({...input, [e.target.name]: e.target.value.toLowerCase()})
            else if(e.target.type === 'number')
            setInput({...input, [e.target.name]: e.target.value})
            else setInput({...input, [e.target.name]:e.target.value})

            sertErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }

        const handleSelect= (e) => {
            setInput({
                ...input,
                diets:[...input.diets, e.target.value]
            })

            sertErrors(validate( {
                ...input,
                diets: [...input.diets, e.target.diets],
            }))
        }

        function handleDeleteRecipe(e,d){
            e.preventDefault();
            setInput({
                ...input,
                diets: input.diets.filter(gen => gen !== d)
            });
        };

        const handleOnSubmit= (e) => {
            e.preventDefault();
            dispatch(postRecipe(input))
                setInput(({
                title: "",
                summary: "",
                image: "",
                dishTypes: "",
                healthScore: 0,
                steps: "",
                diets: [],
                }));
                alert('Recipe Created')
                history.push('/home')
                console.log(input);
        }

        return(
            <div className={style.bg}>
            <img className={style.img} src={ima4} alt='ima4.gif' />
        <div className={style.create}>
            <div className={style.fondo}>
                <br/>
                <h1 className={style.titulo}>Create Recipe: </h1>
                <br/>
                <br/>
                <br/>
                <div className={style.create}>
                    <form className={style.content} onSubmit={(e) => handleOnSubmit(e)}>
                    
                    <div>
                        <label for="title">Title: </label>
                        <input type='text' value={input.title} name='title' placeholder='Nombre...' onChange={(e) => handleOnChange(e)} required/>
                        {errors.title && (<p className={style.error}>{errors.title}</p>)}
                    </div>
                    <br/>

                    <div>
                        <label>Dish Summary: </label>
                        <input type='text' value={input.summary} name='summary' placeholder='Summary...' onChange={(e) => handleOnChange(e)} required/>
                        {errors.summary && (<p className={style.error}>{errors.summary}</p>)}
                    </div>
                    <br/>

                    <div>
                        <label>Image: </label>
                        <input type='url' value={input.image} name='image' placeholder='Image...' onChange={(e) => handleOnChange(e)} />
                        
                    </div>
                    <br/>

                    <div>
                        <label>Dish Type: </label>
                        <input type='text' value={input.dishTypes} name='dishTypes' placeholder='Dish Types...' required onChange={(e) => handleOnChange(e)} />
                        {errors.dishTypes && (<p className={style.error}>{errors.dishTypes}</p>)}
                    </div>
                    <br/>

                    <div>
                        <label>Healthy Food Level: </label>
                        <input type='text' value={input.healthScore} name='healthScore' placeholder='Health Score...' onChange={(e) => handleOnChange(e)} required/>
                        {errors.healthScore && (<p className={style.error}>{errors.healthScore}</p>)}
                    </div>
                    <br/>

                    <div>
                        <label>Step by Step: </label>
                        <input type='text' value={input.steps} name='steps' placeholder='Steps...' onChange={(e) => handleOnChange(e)} required/>
                        {errors.steps && (<p className={style.error}>{errors.steps}</p>)}
                    </div>
                    <br/>

                    <div>
                        <label>Diets: </label>
                <select onChange={(e) => handleSelect(e)} >
                    { allDiets?.map((die, i) => {
                        return <option key ={i} value={die.name}>{die.name}</option>
                    })
                }
                </select> 
                <br/>
                {input.diets.map((c,i) =>
                            <span key={i}> {c}
                                <button className={style.eliminar} onClick={(e) =>handleDeleteRecipe(e, c)}>x</button>
                                </span>
                                )}
                                {errors.diets && (<p className={style.error}>{errors.diets}</p>)}
                
                    </div>
                    <br/>
                    <button className={style.btnCreate} type="submit" > Create Recipe </button>
                    </form>
                </div>
                <br/>
                <br/>
                <Link to='/home'><button  className={style.boton}>Return</button></Link>
                <br/>
            </div>
            </div>
            </div>
        )
}