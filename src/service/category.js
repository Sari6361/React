import axios from "axios"
import { useDispatch } from "react-redux"
import Swal from 'sweetalert2'

export const getCategories = () => {
   
    return dispatch =>
        axios.get(`http://localhost:8080/api/category`)
            .then((x) => dispatch({ type: 'SET_CATEGORY', pyload: x.data }))
            .catch(err => console.error(err));
}

export const addCategory = (category) => {
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
    return dispatch =>
        axios.post(`http://localhost:8080/api/category`, { Name: category })
            .then((x) =>{
                 dispatch({ type: 'ADD_CATEGORY', pyload: x.data })
                 Toast.fire({
                    icon: "success",
                    title: "הקטגוריה נוספה בהצלחה!"
                });})
            .catch(err => console.error(err));
}
