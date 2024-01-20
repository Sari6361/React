import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputRef, TextAreaRef } from "../user/signIn";
import { Form, Icon, Message, Segment, FormGroup, Button } from "semantic-ui-react";
import Header from "../header";
import { getCategories } from "../service/category";
import { addRecipe, editRecipe } from '../service/recipes'
import AddCategory from "../category/addCategory";
const schema = yup.object({
    Name: yup.string().required("חובה להכניס שם"),
    Img: yup.string().url().required("חובה להכניס כתובת URL של תמונה"),
    Duration: yup.string().required("חובה להכניס משך זמן").matches(/^[\d]+[\./\\]?[\d]*$/, "משך זמן צריך להיות מספר "),
    Difficulty: yup.number().integer().required().min(1, "חובה לבחור רמת קושי"),
    CategoryId: yup.number().integer().required().min(1, "חובה לבחור קטגוריה"),
    Description: yup.string().required("חובה להכניס תיאור"),
    Instructions: yup.array().of(yup.string().required()),
    Ingrident: yup.array().of(
        yup.object().shape({
            Name: yup.string().required("הכנס שם"),
            Count: yup.string().matches(/^[\d]+[\./\\]?[\d]*$/).required("הכנס כמות"),
            Type: yup.string().required("הכנס סוג")
        })
    )
})

const AddRecipe = (type) => {
    const { user, difficultyLevel, recipies, categories, selected_recipe } = useSelector((state) => ({
        user: state.user.user,
        difficultyLevel: state.recipe.difficultyLevel,
        recipes: state.recipe.recipies,
        categories: state.category.categories,
        selected_recipe: state.recipe.selectRecipe,
    }));

    const {
        register, handleSubmit, formState: { errors }, control
    } = useForm({ resolver: yupResolver(schema) });

    const { fields, append: IngridentAppend, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "Ingrident"
    })
    const { fields: instructionsFields, append: InstructionAppend, remove: InstructionRemove } = useFieldArray({
        control,
        name: "Instructions"
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log("submit recipe", data,"type", type)
        if (type.type == 'add')
            dispatch(addRecipe(data, user.Id))
        else dispatch(editRecipe(data, selected_recipe.Id,user.Id))
        navigate('/getRecipes');
    }
    useEffect(() => {
        console.log(type);
        if (!categories.length)
            dispatch(getCategories())
        selected_recipe?.Ingrident?.map((ing) => IngridentAppend(ing))
        selected_recipe?.Instructions?.map((ins) => InstructionAppend(ins))
    }, [selected_recipe, type,])

    return <>
        {user === null ? navigate('/home') : null}
        <Header />
        <Segment  >
            <Form className='segment' color='blue' onSubmit={handleSubmit(onSubmit)}>
                <Form.Field >
                    <label>שם </label>
                    <InputRef fluid label="שם " placeholder='Name' type='text' defaultValue={selected_recipe?.Name}
                        {...register("Name")} />
                    <p className="error">{errors?.Name?.message}</p>
                </Form.Field>

                <Form.Field >
                    <label>קישור לתמונה </label>
                    <InputRef fluid label="קישור לתמונה " placeholder='Img src' type='text' defaultValue={selected_recipe?.Img} {...register("Img")} />
                    <p className="error">{errors?.Img?.message}</p>
                </Form.Field>

                <Form.Field >
                    <label>משך זמן </label>
                    <InputRef fluid label="משך זמן  " placeholder=' Duration' type='number' defaultValue={selected_recipe?.Duration} {...register("Duration")} />
                    <p className="error">{errors?.Duration?.message}</p>
                </Form.Field>

                <label>תיאור קצר </label>
                <TextAreaRef direction="ltr" fluid placeholder='Tell us more about the recipe...' defaultValue={selected_recipe?.Description} {...register("Description")} type='text' />
                <p className="error">{errors?.Description?.message}</p>

                <Form.Field>
                    <label>קטגוריה</label>
                    <select {...register("CategoryId")} name="CategoryId" placeholder='Choose Category' defaultValue={selected_recipe ? selected_recipe?.CategoryId : 0}>
                        <option value={0} disabled> בחר קטגוריה</option>
                        {categories?.map((category) =>
                            <option key={category.Id} value={category.Id}>{category.Name}</option>)}
                    </select>
                    <p className="error">{errors?.CategoryId?.message}</p>
                </Form.Field>
                <AddCategory from='edit' />

                <Form.Field>
                    <label>רמת קושי</label>
                    <select {...register("Difficulty")} name="Difficulty" placeholder='Choose Difficulty Level' defaultValue={selected_recipe ? selected_recipe?.Difficulty : 0}>
                        <option value={0} disabled> בחר רמת קושי</option>
                        {difficultyLevel?.map((level, i) =>
                            <option key={i} value={level.Id}>{level.Name}</option>)}
                    </select>
                    <p className="error">{errors.Difficulty?.message}</p>
                </Form.Field>

                <h3>רכיבים</h3>
                {fields?.map((f, i) => (<>
                    <FormGroup key={i}>
                        <Form.Field>
                            <label>כמות</label>
                            <InputRef {...register(`Ingrident.${i}.Count`)} defaultValue={f?.Count} placeholder="כמות" />
                        </Form.Field>

                        <Form.Field>
                            <label>סוג</label>
                            <InputRef {...register(`Ingrident.${i}.Type`)} defaultValue={f?.Type} placeholder="סוג " />
                        </Form.Field>

                        <Form.Field>
                            <label>מוצר</label>
                            <InputRef {...register(`Ingrident.${i}.Name`)} defaultValue={f?.Name} placeholder="שם מוצר" />
                        </Form.Field>

                        <Button icon size='large' floated="left" onClick={() => remove(i)}>
                            <Icon name="trash alternate" />
                        </Button>

                    </FormGroup>
                </>))}
                <p className="error">{errors.Ingrident?.message}</p>
                <Button onClick={() => IngridentAppend({ Name: "", Count: null, Type: "" })}>הוסף מוצר</Button>

                <h3>הוראות הכנה</h3>
                {instructionsFields?.map((instruct, i) => (<>
                    <FormGroup key={i}>
                        <Form.Field width={14}>
                            <InputRef {...register(`Instructions.${i}`)} type='text' defaultValue={instruct?.i} placeholder="הוראת הכנה" />
                            <p>{errors[`Instructions.${i}`]?.message}</p>
                        </Form.Field>
                        <Button icon floated="left" onClick={() => InstructionRemove(i)}>
                            <Icon name="trash alternate" size="large" />
                        </Button>
                    </FormGroup>
                </>))}
                <p className="error">{errors.Instructions?.message}</p>
                <Button onClick={() => InstructionAppend(null)}>הוסף הוראת הכנה</Button>

                <Button type="submit" size="medium" floated="left" onClick={() => console.log("errors", errors)}>
                    <Icon name="save outline" style={{ margin: 10 }} />שמור
                </Button>
                <p />
            </Form >
        </Segment >
    </>
}

export default AddRecipe;