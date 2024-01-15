
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as action from '../store/action'

const Disconnection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("disconnection");
        dispatch({ type: 'SET_USER', pylaod:null })
        navigate('/home');
    }, [])
}
export default Disconnection;