import axios from "axios";
import Swal from 'sweetalert2'
export const getShopping = (userId) => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/bay/${userId}`)
            .then(x => { dispatch({ type: 'GET_SHOPPING', pyload: x.data }) })
            .catch(err => console.error(err));
}

export const deletShoping = (shopId) => {
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
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay/delete/${shopId}`)
            .then(() => {
                dispatch({ type: 'DELETE_SHOPPING', pyload: shopId })
                Toast.fire({
                    icon: "warning",
                    title: `המוצר נמחק`
                });
            })
            .catch(err =>
                console.log(err));
    }
}

export const editShoping = (name, count, userId) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay`, { Name: name, Count: count, UserId: userId })
            .then((x) => {
                dispatch({ type: 'SET_SHOPPING', pyload: x.data })
                Swal.fire({
                    title: `${name} עודכן בהצלחה!`,
                    icon: "success"
                })
            })
            .catch(err =>
                Swal.fire({
                    title: `ארעה שגיאה במהלך העידכון נא לנסות שוב`,
                    icon: "error"
                }));
    }
}

export const addShopping = ({ userId, name, count }) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay`, { Name: name, UserId: userId, Count: count })
            .then((x) => {
                dispatch({ type: 'ADD_SHOPPING', pyload: x.data })
                Swal.fire({
                    title: "המוצר נוסף בהצלחה!",
                    icon: "success"
                });
            })
            .catch(err => console.error(err));
    }
}

