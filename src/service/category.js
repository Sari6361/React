import axios from "axios"
import { useDispatch } from "react-redux"


export const getCategories = () => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/category`)
            .then((x) => dispatch({ type: 'SET_CATEGORY', pyload: x.data }))
            .catch(err => console.error(err));
}

export const AddCategory = (category) => {
    return dispatch =>
        axios.post(`http://localhost:8080/api/category`, { Name: category })
            .then((x) => dispatch({ type: 'ADD_CATEGORY', pyload: x.data }))
            .catch(err => console.error(err));
}
