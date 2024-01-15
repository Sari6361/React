import axios from "axios";
import Swal from 'sweetalert2'

export const GetShopping = (userId) => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/bay/${userId}`)
            .then(x => { dispatch({ type: "GET_SHOPPING", pyload: x.data }) })
            .catch(err => console.error(err));
}

export const deletShoping = (shopId) => {
    return dispatch =>
        axios.post(`http://localhost:8080/api/bay/delete/${shopId}`)
            .then(() => {
                dispatch({ type: 'DELETE_SHOPPING', pyload: shopId })
            })
            .catch(err => console.error(err));
}

export const editShoping = (shopping, userId) => {
    return dispatch =>
        axios.post(`http://localhost:8080/api/bay`, { Name: shopping.Name, UserId: userId, Count: shopping.count })
            .then((x) => {
                dispatch({ type: 'SET_SHOPPING', pyload: x.data })
                Swal.fire({
                    title: "המוצר עודכן בהצלחה!",
                    icon: "success"
                });
            })
            .catch(err => console.error(err));
} 

export const addShopping=( userId,name, count)=>{
    return dispatch =>
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

