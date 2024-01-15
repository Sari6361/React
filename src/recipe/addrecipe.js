import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputRef } from "../user/SignIn";
import { Form } from "semantic-ui-react";

const schema = yup.object({
    Id: yup.number().integer().required().min(1, "חובה לבחור קטגוריה"),
    UserId: yup.number().positive().integer().required(),
    Name: yup.string().required("חובה להכניס שם"),
    Img: yup.string().url().required("חובה להכניס כתובת URL של תמונה"),
    Duration: yup.number("משך זמן צריך להיותר מספר").positive("משך זמן לא יכול להיות מספר שלילי").required("חובה להכניס משך זמן"),
    Difficulty: yup.number().integer().positive().required().min(1, "חובה לבחור רמת קושי"),
    Description: yup.string().required("חובה להכניס תיאור"),
    Instructions: yup.array().of(yup.string().required()),
    Ingrident: yup.array().of(
        yup.object().shape({
            Name: yup.string().required("הכנס שם"),
            Count: yup.number("כמות מסוג מספר").positive("כמות לא יכולה להיות שלילית").required("הכנס כמות"),
            Type: yup.string().required("הכנס סוג")
        })
    )
})


const AddRecipe = () => {
    const { user, difficultyLevel, recipies } = useSelector((state) => ({
        user: state.user.user,
        difficultyLevels: state.recipe.difficultyLevel,
        recipes: state.recipe.recipies
    }));

    const {
        register, handleSubmit, formState: { errors }, control
    } = useForm({ resolver: yupResolver(schema) });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "Ingridents"
    })
    const { fields: instructionsFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
        control,
        name: "Instructions"
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        axios.post("http://localhost:8080/api/recipe", data)
            .then(x => {
                dispatch({ type: 'ADD_RECIPE', pylaod: x.data })
                navigate('/recipes');
            }).catch(e => console.log(e.response));
    }

    return <>
        <div inverted className="container">
            <Form className='attached fluid segment' color='blue' onSubmit={handleSubmit(onSubmit)}>
                <Form.Field >
                    <label>שם </label>
                    <InputRef fluid label="שם " placeholder='Name' type='text'   {...register("Name")} error={{ content: 'Please enter recipe name', pointing: 'below' }}/>
                </Form.Field>

                <Form.Field >
                    <label>קישור לתמונה </label>
                    <InputRef  fluid label="קישור לתמונה "  placeholder='Img src' type='src' {...register("Img")} error={{ content: 'Please enter recipe Img src', pointing: 'below' }}/>
                </Form.Field>

                <Form.TextArea>
                    <label>תיאור קצר  </label>
                    <InputRef fluid label="תיאור קצר  " placeholder='Tell us more about the recipe...' type='text' {...register("Description")}
                        // error={{ content: 'Please enter recipe Img src', pointing: 'below' }}
                        />
                </Form.TextArea>
                
            </Form >
        </div>
    </>
}

export default AddRecipe;