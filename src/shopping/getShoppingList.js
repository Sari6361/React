import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { InputRef } from "../user/logIn";
import { Icon, TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table, Form, Message, Segment } from "semantic-ui-react";
import { addShopping, deletShoping, getShopping } from "../service/shopping"
import { Button } from "@mui/material";
import { AspectRatioSharp } from "@mui/icons-material";
import Header from '../header';

const itemSchema = yup.object({
    Name: yup.string().required("לא הוכנס שם מוצר"),
    Count: yup.number().positive("כמות חייבת להיות גדולה מאפס ").required(""),
    Type: yup.string().required(""),
});

const ShoppingList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [add, setAdd] = useState(false);

    const { user, shopping } = useSelector(s => ({
        user: s.user.user,
        shopping: s.shopping.shopping_list,
    }))
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(itemSchema)
    });
    useEffect(() => {
        if (!shopping.length)
            dispatch(getShopping(user.Id))
    }, [])

    const deleteProduct = (productId) => {
        dispatch(deletShoping(productId))
    }
    const onSubmit = (data) => {
        console.log("onsubmit data", data)
        dispatch(addShopping({ userId: user.Id, name: data.Name, count: data.Count }))
        setAdd(false)
    }
    return <>
        <Header />
        <Segment className='container  '>
            <Table size='large' widths='equal' >
                < TableHeader >
                    <TableHeaderCell>    כמות</TableHeaderCell>
                    <TableHeaderCell>    שם</TableHeaderCell>
                    <TableHeaderCell>    סוג</TableHeaderCell>
                    <TableHeaderCell>        </TableHeaderCell>
                </TableHeader>
                <TableBody>
                    {shopping.map((m, i) => {
                        <TableRow key={i}>
                            {console.log(m)}
                            <TableCell>{m.Count}</TableCell>
                            <TableCell value={m.Name}>{m.Name}</TableCell>
                            {/* <TableCell>{m.Type}</TableCell> */}
                            <TableCell ><button onClick={() => deleteProduct(m.Id)}><Icon name="trash alternate" /></button></TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
            <Button onClick={() => setAdd(true)}>הוספת מוצר</Button>
            {add ? <><Message
                attached
                header='הוספת מוצר'
            // content='מלא את השדות למלא כדי להוסיף מוצר'
            />
                <Form className='attached fluid segment' onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>שם</label>
                            {/* error={{ content: 'Please enter your product name', pointing: 'below' }} */}
                            <InputRef fluid
                                placeholder='Name '
                                type='text'
                                {...register("Name")}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>כמות</label>
                            <InputRef fluid
                                placeholder='Count '
                                type='number'
                                {...register("Count")}
                            error={{ content: 'Please enter your Amount ', pointing: 'below' }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>סוג</label>
                            <InputRef fluid
                                placeholder='Product '
                                type='text'
                                {...register("Type")}
                            // error={{ content: 'Please enter your Type name', pointing: 'below' }}
                            />
                        </Form.Field>
                        {/* <InputRef {...register("Amount")} /> */}

                        {/* <Form.Field>
                            <InputRef
                                fluid
                                label="כמות"
                                placeholder='Amount'
                                type='Amount'
                                {...register("Amount")}
                            />
                        </Form.Field> */}
                    </Form.Group>
                    {/* <Form.Input label='סוג' placeholder=' Type ' type='text' {...register("Type")} /> */}
                    <Button type="submit"> שמור</Button>
                </Form></> : null}
        </Segment>
    </>


}

export default ShoppingList;