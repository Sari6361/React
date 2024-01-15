import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import { Form, Segment, Input, Button, Icon, Select, From, ListItem, ListHeader, ListContent, Image, List, } from "semantic-ui-react";
import { colors } from "@mui/material";
import { getCategories } from "../service/category";
import { getRecipes } from "../service/recipes"
import RecipeCard from "./RecipeCard";
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

    useEffect(() => {
        if (reset)
            resetAllFilters();
        dispatch({ type: 'SET_SELECTED_RECIPE', pyload: null })
        if (recipies.length === 0)
            dispatch(getRecipes());
        alert("Succ")
        console.log("from ", recipies)
        if (categoryList.length === 0)
            dispatch(getCategories());
    }, [])



    function resetAllFilters() {
        console.log("restart");
        setCategory(null);
        setDuration(null);
        setDifficulty("הכל");
        setMyRecipies(false);
        setReset(false);
    }

    return <>
        <Header />
        <Segment inverted className='filters col'>
            <Select placeholder='קטגוריה' icon='list' iconposition='left' onChange={(e, { value }) => { setCategory(value); }}
                options={categoryList.map((c, i) => { return { key: c.Id, text: c.Name, value: c.Id } })} />

            <Input icon={{ name: 'clock' }} placeholder='משך זמן מקסימלי' type="number" onChange={(e, { value }) => setDuration(value)} />
            <Select placeholder='רמת קושי' icon='signal' iconposition='left' onChange={(e, { value }) => setDifficulty(value)} options={
                difficultyList.map((c, i) => { return { key: i, text: c, value: c } })} />
            <Button onClick={() => setMyRecipies(true)}>המתכונים שלי</Button>
            <Button onClick={() => setReset(true)}>איפוס כל החיפושים</Button>
        </Segment>
        <Segment inverted>
            {recipies.map((r, i) => {
                <div>
                {/* // ((category == null || parseInt(category) === r.CategoryId) &&
                //     (duration == null || parseInt(duration) === r.Duration) &&
                //     (difficulty == null || parseInt(difficulty) === r.Difficulty) &&
                //     (myRecipies == false || user.Id === r.UserId)) ?
                //     < RecipeCard key={i} recipe={r} /> : <>
                //         {console.log("recipe:", r)};</>
                // (!category || parseInt(category) === r.CategoryId) &&
                // (!myRecipies || user.Id === r.UserId) &&
                // (!duration || parseInt(duration) >= parseInt(r.Duration)) &&
                // (!difficulty || r.Difficulty === difficulty) ? */}
                <RecipeCard key={i} recipe={r} />
                {/* //  : <></> */}
</div>
            })}
        </Segment>
    </>
}
export default AllRecipes;