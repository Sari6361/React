import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCategory } from '../service/category'
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react"
import { Maximize } from '@mui/icons-material';
const categorySchema = yup.object({
    Name: yup.string().required("לא הוכנס שם קטגוריה"),
})
const AddCategory = (from) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (!from.from)
            navigate('/home')
        setOpen(false);
    };
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(categorySchema)
    });

    const onSubmit = (data) => {
        dispatch(addCategory(data.Name))
        setOpen(false)
        if (!from.from)
            navigate('/home')
    }
    useEffect(() => {
        if (!from.from)
            setOpen(true);
    }, [from,])
    return <>
        <React.Fragment>
            {from.from === 'edit' ? <Button floated='center' variant="outlined" onClick={handleClickOpen}>
                הוסף קטגוריה
            </Button> : <></>}
            <Dialog open={open} onClose={handleClose} fullWidth='xs'>
                <DialogTitle >הוספת קטגוריה</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        מלא כאן את שם הקטגוריה
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
                        <p className="error">{errors.Name?.message}</p>
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