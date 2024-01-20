
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Disconnection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/home');
        dispatch({ type: 'SET_USER', pylaod:null })
    }, [])
}
export default Disconnection;