import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './NavBar.module.css'

export default function NavBar() {

    return (
        <nav className={style.nav}>
                <NavLink exact to='/'>Landing \Page</NavLink>
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/recipes'>RecipeCreate</NavLink>
        </nav>
    )
}