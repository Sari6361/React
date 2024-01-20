import { Form, Segment, Icon, Button, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../header";
import React from "react";
import { Link } from "react-router-dom";
export const InputRef = React.forwardRef(({ ...rest }, ref) => (
    <input
        {...rest}
        ref={ref}
    />
));
export const TextAreaRef = React.forwardRef(({ ...rest }, ref) => (
    <textarea {...rest} ref={ref} />
))
const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schema = yup.object({
        UserName: yup.string().min(3, 'שם משתמש עם מינימום 3 תווים').required("זהו שדה חובה"),
        Password: yup.string().min(4, "סיסמא חייבת להכיל לפחות 5 תווים").max(10, "סיסמא יכולה להיות באורך של 10 תווים.").required("חובה להכניס סיסמא"),
        Name: yup.string().required("זהו שדה חובה"),
        Email: yup.string().email("כתובת מייל לא חוקית").required("זהו שדה חובה"),
        Phone: yup.string().matches(/^\d{9,10}$/, 'מספר טלפון לא חוקי! ').required("זהו שדה חובה"),
        Tz: yup.string().required("זהו שדה חובה").matches(/^([0-9]{9})$/, ' תעודת זהות לא תקינה.')
    });

    const {
        register, handleSubmit, formState: { errors }, } = useForm({
            resolver: yupResolver(schema),
        })
    const onSubmit = (data) => {
        axios.post(`http://localhost:8080/api/user/sighin`, { Username: data.UserName, Password: data.Password, Name: data.Name, Phone: data.Phone, Email: data.Email, Tz: data.Tz })
            .then((x) => {
                dispatch({ type: 'SET_USER', pylaod: x.data });
                //SetShopping(x.data.Id);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err)
            });
    }
    return <>
        <Header />
        <div inverted className="container">
            <Segment className="my-segment">
                <Form className='attached fluid segment' onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group widths='equal'>
                        <Form.Field >
                            <label>שם משתמש</label>
                            <InputRef
                                fluid
                                label="שם משתמש"
                                placeholder='User Name'
                                type='text'
                                {...register("UserName")}
                            />
                            <p className="error">{errors.UserName?.message}</p>
                        </Form.Field>

                        <Form.Field>
                            <label>סיסמא</label>
                            <InputRef fluid
                                label="סיסמא"
                                placeholder='Password'
                                type='password'
                                {...register("Password")} />
                            <p className="error">{errors.Password?.message}</p>
                        </Form.Field>
                    </Form.Group>

                    <Form.Field>
                        <label>שם</label>
                        <InputRef label='שם' placeholder=' Name ' type='text'{...register("Name")} />
                        <p className="error">{errors.Name?.message}</p>
                    </Form.Field>

                    <Form.Field>
                        <label>מייל</label>
                        <InputRef label='כתובת מייל' placeholder='Email Adress ' {...register("Email")} type='email' />
                        <p className="error">{errors.Email?.message}</p>
                    </Form.Field>

                    <Form.Field>
                        <label>מס' פלאפון</label>
                        <InputRef label='פלאפון' placeholder=' Phone Number ' type='number' {...register("Phone")} />
                        <p className="error">{errors.Phone?.message}</p>
                    </Form.Field>

                    <Form.Field>
                        <label>מס' תעודת זהות</label>
                        <InputRef label='ת.ז.' placeholder='Identity Number ' type='number'{...register("Tz")} />
                        <p className="error">{errors.Tz?.message}</p>
                    </Form.Field>

                    <Button type="submit" content='signin' primary />
                </Form>
            </Segment > <Message attached='bottom' warning>
                <Icon name='help' />
               נרשמת כבר?{<Link to={'/logIn'}> לחץ כאן </Link>}במקום.
            </Message>
        </div>
    </>
}
export default Signin;



