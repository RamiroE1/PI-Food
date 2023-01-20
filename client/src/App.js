import './App.css';
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import RecipeCreate from "./components/RecipeCreate/RecipeCreate";
import Detail from "./components/Detail/Detail";
import NavBar from "./components/NavBar/NavBar.jsx";


function App() {
  return (
    <BrowserRouter>
    <React.Fragment>
      <Route>
        <NavBar/>
      </Route>
    <div className="App">
      <Route exact path= '/' component={LandingPage}/>
      <Route exact path= '/home' component={Home}/>
      <Route exact path= '/detail/:id' component={Detail}/>
      <Route exact path= '/recipes' component={RecipeCreate}/>
    </div>
    </React.Fragment>
    </BrowserRouter>
  );
}

export default App;