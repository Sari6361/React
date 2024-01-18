import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'; 
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {addCategory} from '../service/category'
import { useNavigate } from 'react-router-dom';
import React from "react"
import { Maximize } from '@mui/icons-material';
const categorySchema=yup.object({
    Name:yup.string().required("לא הוכנס שם קטגוריה"),
})
const AddCategory=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
       // setOpen(false);
        navigate("/addRecipe");
    };
    const {register, handleSubmit, formState:{errors},control}=useForm({
        resolver:yupResolver(categorySchema)
    });

    const onSubmit=(data)=>{
       dispatch(addCategory(data.Name)).then(navigate('/addRecipe'))
    }
return<>
        <React.Fragment size={Maximize}>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Log In
            </Button> */}
            <Dialog  open={open} onClose={handleClose}>
                <DialogTitle >הוספת קטגוריה</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        להוספת קטגוריה חדשה מלא כאן את השם
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                       
                        <TextField
                        size='large'
                            autoFocus
                            margin="dense"
                            id="name"
                            label="category name"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("Name")} />

                        <DialogActions>
                            <Button onClick={handleClose}>בטל</Button>
                            <Button type="submit">שמור</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment >
    </>
}
export default AddCategory;