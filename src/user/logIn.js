import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import axios from "axios";
import React from 'react';
import Swal from 'sweetalert2';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { Link } from "react-router-dom";

const userSchema = yup.object({
    UserName: yup.string().required("To connect you must enter you name"),
    Password: yup.string().required("To connect you must enter you password")
});

export const InputRef = React.forwardRef(({ ...rest }, ref) => (
    <input
        {...rest}
        ref={ref}
    />
)
);

const LogIn = () => {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        //setOpen(false);
        navigate("/home");
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(userSchema)
    });
    const onSubmit = (data) => {
        axios.post(`http://localhost:8080/api/user/login`, { Username: data.UserName, Password: data.Password })
            .then(x => {

                dispatch({ type: 'SET_USER', pylaod: x.data })
                navigate("/home");
            }).catch(err => {
                console.log(err.request);
            });
    }

    return <>
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth='xs'>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        אם לא נרשמת עדיין {<Link to={'/signIn'}>לחץ כאן</Link>}
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)} >

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="user name"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("UserName")} />
                        <p className="error">{errors.UserName?.message}</p>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="password"
                            type="password"
                            {...register("Password")}
                            fullWidth
                            variant="standard" />
                        <p className="error">{errors.Password?.message}</p>

                        <DialogActions>
                            <Button onClick={handleClose}>בטל</Button>
                            <Button type="submit">הכנס</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment >
    </>

}
export default LogIn;