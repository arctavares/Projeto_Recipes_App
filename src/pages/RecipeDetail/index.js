import { useContext, useEffect } from "react";
import RecipesContext from "../../context";
import { getMealById } from "../../service/MealsAPI";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { getDrinkById } from "../../service/DrinksAPI";

function RecipeDetail() {
    
    const param = useParams();
    const location = useLocation();
    const url = location.pathname;

    useEffect(() => {
        if(url.includes('meals')){
            getMealById(param.id);
        }else if(url.includes('drinks')){
            getDrinkById(param.id);
        }
    },[])

    return (
        <p>RecipeDetail</p>
    )
}

export default RecipeDetail;