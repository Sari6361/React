import axios from "axios";
import Swal from 'sweetalert2'


export const getRecipes = () => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/recipe`)
            .then(x => {
                dispatch({ type: 'SET_RECIPE', pyload: x.data })
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
        let recipeToSend = {
            Id: null,
            Name: recipe.Name, UserId: userId, CategoryId: recipe.CategoryId, Img: recipe.Img, Duration: recipe.Duration, Difficulty: recipe.Difficulty, Description: recipe.Description,
            Ingrident: recipe.Ingrident, Instructions: recipe.Instructions
        };

        axios.post(`http://localhost:8080/api/recipe`, recipeToSend)
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
    return dispatch => axios.post(`http://localhost:8080/api/recipe/edit`, recipeToSend)
        .then(x => {
            dispatch({ type: 'EDIT_RECIPE', pyload: x.data })
            Toast.fire({
                icon: "success",
                title: "המתכון עודכן בהצלחה"
            })
        }).catch(err => {
                Toast.fire({
                    icon: "error",
                    title: ` ארעה שגיאה בעת שמירת המתכון נסה שוב `
                }); 
            })
}