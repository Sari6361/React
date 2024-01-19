import axios from "axios";
import Swal from 'sweetalert2'

export const getShopping = (userId) => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/bay/${userId}`)
            .then(x => { dispatch({ type: "SET_SHOPPING", pyload: x.data }) })
            .catch(err => console.error(err));
}

export const deletShoping = (shopId) => {
    return dispatch => {
        { console.log("shopping:", shopId) }
        axios.post(`http://localhost:8080/api/bay/delete/${shopId}`)
            .then(() => {
                dispatch({ type: 'DELETE_SHOPPING', pyload: shopId })
            })
            .catch(err => console.error(err));
    }
}

export const editShoping = (name, count, userId) => {
    return dispatch => {
        { console.log("name:", name,count, userId) }

        axios.post("http://localhost:8080/api/bay", { Name: name, Count: count, UserId: userId })
            .then((x) => {
                dispatch({ type: 'SET_SHOPPING', pyload: x.data }).then(
                    Swal.fire({
                        title: `${name} עודכן בהצלחה!`,
                        icon: "success"
                    }))
            })
            .catch(err => console.error(err));
    }
}

export const addShopping = ({ userId, name, count }) => {
    return dispatch => {
        console.log("name:", name, "userId:", userId, "count:", count)
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

