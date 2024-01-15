import { useNavigate } from "react-router-dom"
import  axios from "axios";

export const signIn = (data) => {
    // const navigate=useNavigate();
    return dispatch => {
        // console.log(data)
        // console.log(data.Name)
        // axios.post(`http://localhost:8080/api/user/sighin`, { Username: data.UserName, Password: data.Password, Name: data.Name, Phone: data.Phone, Email: data.Email, Tz: data.Tz })
        //     .then(x => {
        //         dispatch({ type: 'SET_USER', pylaod: x.data });
        //         navigate("/home");
        //     }
        //     ).catch(err => {
        //         console.log(data)
        //         console.log(err.request.response);
        //     });
    }
}

export const logInside=()=>{
    // const navigate=useNavigate();
    return dispatch => {
    // axios.post("http://localhost:8080/api/user/login", { UserNmae: data.UserNmae, Password: data.Password })
    // .then(x => {
    //     dispatch({ type: 'SET_USER', pylaod: x.data })
    //     navigate("/home");
    // }).catch(err => {
    //     console.log(err);
    //     alert(err.request.response);
    // });
}
} 


