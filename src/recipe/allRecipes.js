import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import { Form, Segment, Input, Button, Icon, Select, From, ListItem, ListHeader, ListContent, Image, List, CardGroup, } from "semantic-ui-react";
import { colors } from "@mui/material";
import { getCategories } from "../service/category";
import { getRecipes } from "../service/recipes"
import RecipeCard from "./recipeCard";
import { InputRef } from "../user/logIn";

const AllRecipes = () => {

    const dispatch = useDispatch();

    const { recipies, categoryList, difficultyList, user } = useSelector((s) => ({
        recipies: s.recipe.recipies,
        categoryList: s.category.categories,
        difficultyList: s.recipe.difficultyLevel,
        user: s.user.user
    }));

    const [category, setCategory] = useState(null);
    const [duration, setDuration] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [myRecipies, setMyRecipies] = useState(false);
    const [reset, setReset] = useState(false);

    const durationRef = useRef(null);

    useEffect(() => {
        if (reset)
            resetAllFilters();
        dispatch({ type: 'SET_SELECTED_RECIPE', pyload: null })
        if (recipies.length === 0) {
            dispatch(getRecipes());
        }
        console.log("recipies", recipies)
        if (categoryList.length === 0)
            dispatch(getCategories());
        console.log("difficulty", difficulty)

    }, [category, difficulty])



    function resetAllFilters() {
        console.log("restart");
        setCategory(null);
        setDuration(null);
        durationRef.current.value = null;
        setDifficulty(null);
        setMyRecipies(false);
        setReset(false);
    }

    return (<>
        <Header />
        <Segment inverted className='filters col'>
            <Select placeholder='קטגוריה' icon='list'  iconposition='right' onChange={(e, { value }) => { setCategory(value); }}
                options={categoryList.map((c, i) => { return { key: c.Id, text: c.Name, value: c.Id } })} />
            <InputRef icon={{ name: 'clock' }}
                placeholder='משך זמן מקסימלי'
                type="number"
                onChange={(e, { value }) => setDuration(value)}
                ref={durationRef} />
            {/* <Input icon={{ name: 'clock' }} placeholder='משך זמן מקסימלי' type="number" defaultValue={duration} onChange={(e, { value }) => setDuration(value)} /> */}
            <Select placeholder='רמת קושי' icon='signal' iconposition='left' onChange={(e, { value }) => setDifficulty(value)} options={
                difficultyList.map((c, i) => { return { key: i, text: c.Name, value: c.Id } })} />
            <Button onClick={() => setMyRecipies(true)}>המתכונים שלי</Button>
            <Button onClick={() => resetAllFilters()}>איפוס כל החיפושים</Button>
        </Segment>
        <div className="container">
            <CardGroup inverted>
                {recipies.map((r, i) =>
                    ((category == null || (category) === r.CategoryId) &&
                        (duration == null || parseInt(duration) ===parseInt( r.Duration)) &&
                        (difficulty == null || (difficulty) === r.Difficulty) &&
                        (myRecipies == false || user.Id === r.UserId)) ?
                        <><RecipeCard recipe={r} /> {console.log("diff", r.Difficulty)}</> : null
                )
                }
            </CardGroup></div>
    </>)

}
export default AllRecipes;