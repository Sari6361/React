import { Form, div, FormInput, Segment, Step, Button, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as actions from '../store/action';
import Header from "../header";
import React from "react";
import { SetShopping } from "../service/shopping";
export const InputRef = React.forwardRef(({ ...rest }, ref) => (
    <input
        {...rest}
        ref={ref}
    />
));
export const TextAreaRef = React.forwardRef(({...rest},ref)=>(
    <textarea {...rest} ref={ref}/>
))
//סופי!!!
const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schema = yup.object({
        UserName: yup.string().min(3, 'שם משתמש עם מינימום 3 תווים').required("זהו שדה חובה"),
        Password: yup.string().min(4, "סיסמא חייבת להכיל לפחות 5 תווים").max(10, "סיסמא יכולה להיות באורך של 10 תווים.").required("חובה להכניס סיסמא"),
        Name: yup.string().required("זהו שדה חובה"),
        Email: yup.string().email("כתובת מייל לא חוקית").required("זהו שדה חובה"),
        Phone: yup.string().matches(/^\d{9,10}$/, 'מספר הטלפון צריך להכיל בין 9 ל־10 ספרות').required("זהו שדה חובה"),
        Tz: yup.string().matches(/^([0-9]{9})$/, ' תעודת זהות לא תקינה (9 ספרות בלבד).').required("זהו שדה חובה")
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
                                error={{ content: 'Please enter your first name', pointing: 'below' }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>סיסמא</label>
                            <InputRef fluid
                                label="סיסמא"
                                placeholder='Password'
                                type='password'
                                {...register("Password")} />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <label>שם</label>
                        <InputRef label='שם' placeholder=' Name ' type='text'{...register("Name")} />
                    </Form.Field>
                    <Form.Field>
                        <label>מייל</label>
                        <InputRef label='כתובת מייל' placeholder='Email Adress ' {...register("Email")} type='email'
                        />

                    </Form.Field>
                    <Form.Field>
                        <label>מס' פלאפון</label>
                        <InputRef label='פלאפון' placeholder=' Phone Number ' type='number' {...register("Phone")} />
                    </Form.Field>
                    <Form.Field>
                        <label>מס' תעודת זהות</label>
                        <InputRef label='ת.ז.' placeholder='Identity Number ' type='number'{...register("Tz")} />
                    </Form.Field>
                    <Button type="submit" content='signin' primary />
                </Form>
            </Segment >
            {/* לטפל בשגיאות!!!!!! */}
            {errors?.UserName ? (
                <Message warning header="שם משתמש לא תקין" content={errors?.UserName?.message} />
            ) : (
                <></>
            )}
            {errors?.Password ? (
                <Message warning header="סיסמא לא תקינה" content={errors?.Password?.message} />
            ) : (
                <></>
            )}
            {errors?.Name ? (
                <Message warning header="שם לא תקין" content={errors?.Name?.message} />
            ) : (
                <></>
            )}
            {errors?.Email ? (
                <Message warning header="כתובת מייל לא תקינה" content={errors?.Email?.message} />
            ) : (
                <></>
            )}
            {errors?.Phone ? (
                <Message warning header="מס' פלאפון לא תקין" content={errors?.Phone?.message} />
            ) : (
                <></>
            )}
            {errors?.Tz ? (
                <Message warning header="מס תעודת זהות לא תקין" content={errors?.Tz?.message} />
            ) : (
                <></>
            )}
        </div>
    </>
}
export default Signin;



/* <ul class="ui list">
  <li><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">שדות ייטשטשו </font></font><code>escape</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">בלחיצת מקש</font></font></li>
  <li><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">שדות ישלחו טופס בתאריך</font></font><code>enter</code></li>
  <li><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">אירועי הגשה יצורפו </font></font><code>click</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">לכל רכיב בתוך הטופס עם הכיתה  </font></font><code>submit</code></li>
  <li><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">אירועי איפוס יצורפו </font></font><code>click</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">לכל רכיב בתוך הטופס עם הכיתה</font></font><code>reset</code></li>
  <li><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">אירועים ברורים יצורפו </font></font><code>click</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">לכל רכיב בתוך הטופס עם הכיתה</font></font><code>clear</code></li>
</ul>
<form class="ui form segment error">
  <div class="field error">
    <label><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">שדה בדיקה</font></font></label>
    <input placeholder="שדה בדיקה" name="name" type="text">
  <div class="ui basic red pointing prompt label transition visible"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">אנא הכנס את שמך</font></font></div></div>
  <div class="ui primary submit button"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">שלח</font></font></div>
  <div class="ui reset button"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">אִתחוּל</font></font></div>
  <div class="ui clear button"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">ברור</font></font></div>
</form>*/