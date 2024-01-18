import { useDispatch, useSelector } from "react-redux";
import {  Segment } from "semantic-ui-react";
import Header from "../header";
import { useState ,useEffect} from "react";
import RecipeCard from "./recipeCard";


const MyRecipes = () => {
    console.log("My recipies")
    const { recipies, user } = useSelector(s => ({
        recipies: s.recipe.recipies,
        user: s.user.user,
    }))
    const [recipe, setRecipe] = useState(null)
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch({ type: 'SET_SELECTED_RECIPE', pyload: recipe })
    }, [recipe])

    return <>
        <Header />
        <Segment inverted>
            {recipies.map((r, i) => {
                (user.Id === r.UserId) ?
                    <>
                        setRecipe(r)
                        < RecipeCard key={i} recipe={r} />
                    </>
                    : <></>
            })}
        </Segment>
    </>
}
export default MyRecipes;