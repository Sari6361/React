import axios from "axios";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'


export const getRecipes = () => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/recipe`)
            .then(x => {
                dispatch({ type: 'SET_RECIPE', pyload: x.data })
                console.log(x.data)
            }
            )
            .catch(err => console.error(err))
}

export const deleteRecipe = (RecipeId) => {
    return dispatch =>
        axios.post(`http://localhost:8080/api/recipe/delete/:${RecipeId}`)
            .then(() => dispatch({ type: 'DELETE_RECIPE', pyload: RecipeId }))
            .catch(err => console.error(err));
}

export const addRecipe = (recipe, userId) => {
    return dispatch => {
        console.log("addrecipeDispatch", recipe)
        let recipeToSend = {
            Id: null,
            Name: recipe.Name, UserId: userId, CategoryId: recipe.CategoryId, Img: recipe.Img, Duration: recipe.Duration, Difficulty: recipe.Difficulty, Description: recipe.Description,
            Ingrident: recipe.Ingrident, Instructions: recipe.Instructions
        };
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!recipeToSend", recipeToSend)

        axios.post(`http://localhost:8080/api/recipe`, recipeToSend)
            .then(x => {
                console.log("xxxxxxxxx=", x.data)
                dispatch({ type: 'ADD_RECIPE', pyload: x.data });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "המתכון נוסף בהצלחה",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => console.error(err));
    }
}

export const editRecipe = (recipe,recipeId, userId) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
     let recipeToSend = {
        Id: recipeId, Name: recipe.Name, UserId: userId, CategoryId: recipe.CategoryId,
        Img: recipe.Img, Duration: recipe.Duration, Difficulty: recipe.Difficulty, Description: recipe.Description,
        Ingrident: recipe.Ingrident, Instructions: recipe.Instructions
    };
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!recipeToSend", recipeToSend)
    return dispatch => axios.post(`http://localhost:8080/api/recipe/edit`, recipeToSend)
        .then(x => {
            console.log("x.dataaaaaaaaaaaaa", x.data)
            dispatch({ type: 'EDIT_RECIPE', pyload: x.data })
            Toast.fire({
                icon: "success",
                title: "המתכון עודכן בהצלחה"
            })
        }).catch(err => {
                // Toast.fire({
                //     icon: "error",
                //     title: ` ארעה שגיאה בעת שמירת המתכון נסה שוב `
                // }); 
                console.log(err)
            })
}