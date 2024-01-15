import * as yup from "yup";
// import { Form, Group, Field, Input } from 'semantic-ui-react'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import axios from "axios";
import React from "react";
import { Form, Input, Group, FormCheckbox, Button, Icon, Message, } from 'semantic-ui-react'
import { signIn } from '../service/user';
import { FormatBoldRounded } from "@mui/icons-material";
import { SetShopping } from "../store/reducers/reducer_shopping";

let userSchema = yup.object({
    Name: yup.string("שם מורכב מאותיות ותווים בלבד.").required("חובה להכניס שם"),
    UserName: yup.string().required("חובה להכניס שם משתמש"),
    Password: yup.string().min(4, "סיסמא חייבת להכיל לפחות 5 תווים").max(10, "סיסמא יכולה להיות באורך של 10 תווים.").required("חובה להכניס סיסמא"),
    Phone: yup.string().min(10, "מספר פלאפון לא תקין, (10 תווים ).").required("חובה להכניס מס' טלפון"),
    Email: yup.string().email("כתובת מייל לא חוקית").required("זהו שדה חובה"),
    Tz: yup.string().min(9, " תעודת זהות לא תקינה (9 ספרות בלבד). ").required("חובה להכניס תעודת זהות"),
}).required();


export const InputRef = React.forwardRef(({ ...rest }, ref) => (
    <input 
        {...rest}
        ref={ref}
    />
));

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register, handleSubmit, formState: { errors }, } = useForm({
            resolver: yupResolver(userSchema),
        })
    const onSubmit = (data) => {
         // dispatch(signIn(data));
        console.log(data)
        console.log(data.Name)
        axios.post(`http://localhost:8080/api/user/sighin`, { Username: data.UserName, Password: data.Password, Name: data.Name, Phone: data.Phone, Email: data.Email, Tz: data.Tz })
            .then(x => {
                console.log(x.data)
                dispatch({ type: 'SET_USER', pylaod: x.data });
                SetShopping(x.data.Id);
                navigate("/home");
            }
            ).catch(err => {
                console.log(data)
                console.log(err.request.response);
            });

    }
    return <><div>
        <Message
            attached
            header='Welcome to our site!'
            content='Fill out the form below to sign-up for a new account'
        />
        <Form className='attached fluid segment' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group widths='equal'>
                <Form.Field>
                    <Form.Input
                        fluid
                        label="שם משתמש"
                        placeholder='User Name'
                        type='text'
                    {...register("UserName")}
                    />
                    {/* <InputRef {...register("UserName")} /> */}
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        fluid
                        label="סיסמא"
                        placeholder='Password'
                        type='password' 
                        {...register("Password")}
                    />
                    {/* <InputRef /> */}
                </Form.Field>
            </Form.Group>
            <Form.Input
                label='שם' placeholder=' Name ' type='text' {...register("Name")} />
            <Form.Input label='פלאפון' placeholder=' Phone Number ' type='phone' {...register("Phone")} />
            <Form.Input label='כתובת מייל' placeholder='Email Adress ' type='Email' {...register("Email")} />
            <Form.Input label='ת.ז.' placeholder='Identity Number ' type='id'{...register("Id")} />
            <FormCheckbox inline label='I agree to the terms and conditions' />
            {/* <Button type='submit' onSubmit={handleSubmit(onSubmit)}>הכנס</Button> */}
            <Button type="submit"> lllll</Button>
        </Form>

        <Message attached='bottom' warning>
            <Icon name='help' />
            Already signed up?&nbsp;<a href='#'>Login here</a>&nbsp;instead.
        </Message>
    </div >
    </>

}

export default SignIn;