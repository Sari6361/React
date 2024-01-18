import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { InputRef } from "../user/SignIn";
import { Form, TextArea, Icon, Message, Segment, FormGroup, Button } from "semantic-ui-react";
import Header from "../header";
import { getCategories } from "../service/category";
import { addRecipe } from '../service/recipes';

const schema = yup.object({
    UserId: yup.number().positive().integer().required(),
    Name: yup.string().required("חובה להכניס שם"),
    Img: yup.string().url().required("חובה להכניס כתובת URL של תמונה"),
    Duration: yup.number("משך זמן צריך להיותר מספר").positive("משך זמן לא יכול להיות מספר שלילי").required("חובה להכניס משך זמן"),
    Difficulty: yup.number().integer().positive().required().min(1, "חובה לבחור רמת קושי"),
    CategoryId: yup.number().integer().required().min(1, "חובה לבחור קטגוריה"),
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

const EditRecipe = () => {
    const { user, difficultyLevel, recipies, categories,selected_recipe } = useSelector((state) => ({
        user: state.user.user,
        difficultyLevel: state.recipe.difficultyLevel,
        recipes: state.recipe.recipies,
        categories: state.category.categories,
        selected_recipe:state.recipe.selectRecipe,
    }));

    const {
        register, handleSubmit, formState: { errors }, control
    } = useForm({ resolver: yupResolver(schema) });

    const { fields, append: appendIngridient, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "Ingrident"
    })
    const { fields: instructionsFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
        control,
        name: "Instructions"
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log("onsubmit-add");
        dispatch(addRecipe(data))
    }
    useEffect(() => {
        if (!categories.length)
            dispatch(getCategories());
            selected_recipe?.Ingrident?.map((ing) => appendIngridient(ing))
            selected_recipe?.Instructions?.map((ins) => appendInstruction(ins))
    }, [selected_recipe])

    return <>
        <Header />
        <Segment  >
            <Form  className='segment' color='blue' onSubmit={handleSubmit(onSubmit)}>
                <Form.Field >
                    <label>שם </label>
                    <InputRef fluid label="שם " placeholder='Name' type='text' defaultValue={selected_recipe?.Name}
                        {...register("Name")} />
                    {errors.Name?.message ? <Message warning content={errors.Name.message} /> : <></>}
                </Form.Field>

                <Form.Field >
                    <label>קישור לתמונה </label>
                    <InputRef fluid label="קישור לתמונה " placeholder='Img src' defaultValue={selected_recipe?.Img} type='text' {...register("Img")} />
                </Form.Field>
                <label>תיאור קצר </label>
                <TextArea  >
                    <InputRef direction="ltr" defaultValue={selected_recipe?.Description} fluid placeholder='Tell us more about the recipe...' {...register("Description")}  type='text' />
                </TextArea>
                <Form.Field> 
                    <label>קטגוריה</label>
                    <select {...register("CategoryId")} name="CategoryId" placeholder='Choose Category' defaultValue={selected_recipe?.CategoryId}>
                        <option value={0} disabled> בחר קטגוריה</option>
                        {categories?.map((category) =>
                            <option key={category.Id} value={category.Id}>{category.Name}</option>)}
                    </select>
                    {errors.CategoryId?.message ? <Message warning content={errors.CategoryId.message} /> : <></>}
                </Form.Field>
                <Button floated="left" onClick={() => { navigate('/addCategory') }}>הוסף קטגוריה</Button>
                <Form.Field>
                    <label>רמת קושי</label>
                    <select {...register("Difficulty")} name="Difficulty" placeholder='Choose Difficulty Level' defaultValue={selected_recipe?.Difficulty}>
                        <option value={0} disabled> בחר רמת קושי</option>
                        {difficultyLevel?.map((level, i) =>
                            <option key={i} value={level}>{level}</option>)}
                    </select>
                    {errors.Difficulty?.message ? <Message warning content={errors.Difficulty.message} /> : <></>}
                </Form.Field>
                <h3>רכיבים</h3>
                {fields?.map((f, i) => {
                    <FormGroup key={i}>
                        {console.log(f)}
                        <Form.Field>
                            <label>כמות</label>
                            <InputRef  {...register(`Ingrident.${i}.Count`)} defaultValue={f?.Count} placeholder="כמות" />
                            <p>{errors[`Ingrident.${i}.Count`]?.message}</p>
                        </Form.Field>
                        <Form.Field>
                            <label>סוג</label>
                            <InputRef {...register(`Ingrident.${i}.Type`)} defaultValue={f?.Type} placeholder="סוג " />
                            <p>{errors[`Ingrident.${i}.Type`]?.message}</p>
                        </Form.Field>
                        <Form.Field>
                            <label>מוצר</label>
                            <InputRef {...register(`Ingrident.${i}.Name`)} defaultValue={f?.Name} placeholder="שם מוצר" />
                            <p >{errors[`Ingrident.${i}.Name`]?.message}</p>
                        </Form.Field>
                        <Button icon size='large' floated="left" onClick={() => remove(i)}>
                            <Icon name="trash alternate" />
                        </Button>
                    </FormGroup>
                })}
                <Button onClick={() => appendIngridient({ Name: "", Count: 0, Type: "" })}>הוסף מוצר</Button>
                <h3>הוראות הכנה</h3>
                {instructionsFields?.map((instruct, i) => {
                    <FormGroup key={i}>
                        {console.log(instruct)}
                        <Form.Field>
                            <label>כמות</label>
                            <InputRef {...register(`Instructions.${i}`)} defaultValue={instruct?.i} placeholder="הוראת הכנה" />
                            <p>{errors[`Instructions.${i}`]?.message}</p>
                            <Button icon size='large' floated="left" onClick={() => removeInstruction(i)}>
                                <Icon name="trash alternate" size="large" />
                            </Button>
                        </Form.Field>
                    </FormGroup>
                })}
                <Button onClick={() => appendInstruction(" ")}>הוסף הוראת הכנה</Button>
                <Button type="submit" size="medium" floated="left">
                    <Icon name="save outline" style={{ margin: 10 }} />שמור
                </Button>
                <p/>
            </Form >
        </Segment >
    </>
}

export default EditRecipe;