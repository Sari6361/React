import axios from "axios";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'


export const getRecipes = () => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/recipe`)
            .then(x =>{
                dispatch({ type: 'SET_RECIPE', pyload: x.data })
                console.log(x.data)}
                )
            .catch(err => console.error(err))
}

export const deleteRecipe = (RecipeId) => {
    return dispatch =>
        axios.post(`http://localhost:8080/api/recipe/delete/:${RecipeId}`)
            .then(() => dispatch({ type: 'DELETE_RECIPE', pyload: RecipeId }))
            .catch(err => console.error(err));
}

export const addRecipe = (recipe) => {
    return dispatch =>
    {
console.log("addrecipeDispatch",recipe)
        axios.post(`http://localhost:8080/api/recipe`, recipe)
        .then(x => {
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

export const editRecipe = (recipe, userId) => {
    return dispatch => axios.post(`http://localhost:8080/api/recipe/edit`, { ...recipe, UserId: userId })
        .then(x => {
            dispatch({ type: 'EDIT_RECIPE', pyload: x.data })
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
              Toast.fire({
                icon: "success",
                title: "Signed in successfully"
              });
        })
        .catch(err => console.error(err));
}