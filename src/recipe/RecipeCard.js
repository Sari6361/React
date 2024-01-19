import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardDescription, CardHeader, Icon, Image } from "semantic-ui-react";

const RecipeCard = ({recipe}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryList, difficultyList, user } = useSelector((s) => ({
        categoryList: s.category.categories,
        difficultyList: s.recipe.difficultyLevel,
        user: s.user.user
    }));

    const handleClick = () => {
        dispatch({ type: 'SET_SELECTED_RECIPE', pyload: recipe });
        navigate('/displayRecipe');
    }
    // useEffect(() => { console.log("recipe card") },[])

    return <>
        <Card >
            <Image wrapped src={recipe?.Img} size="medium" className="recipe-img" />
            <CardContent>
                <CardHeader>{recipe?.Name}</CardHeader>
                <CardDescription>{recipe?.Description}</CardDescription>
            </CardContent>
            <CardContent extra className='filters col'>
                <div>
                    <Icon name='unordered list' />
                    {" " + categoryList?.find(c => c.Id === recipe.CategoryId)?.Name + " "}
                </div>
                <div>
                    <Icon name='level up' />
                    {" " + difficultyList?.find(d => d.Id === recipe.Difficulty)?.Name + " "}
                </div>
                <div>
                    <Icon name='clock' />
                    {"  " + recipe?.Duration + "  דקות "}
                </div>
                <Button onClick={handleClick}>הצג</Button>
            </CardContent>
        </Card>
    </>
}
export default RecipeCard;