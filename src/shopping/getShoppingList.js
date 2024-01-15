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
    Product: yup.string().required("לא הוכנס שם מוצר"),
    Amount: yup.number().positive("כמות חייבת להיות גדולה מאפס ").required(""),
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
            dispatch(getShopping(user.Id)).then(console.log("shop: ", shopping))
    }, [])

    const deleteProduct = (productId) => {
        dispatch(deletShoping(productId))
    }
    const onSubmit = (data) => {
        dispatch(addShopping({ userId: user.Id, name: data.Name, count: data.Count }))
    }
    return <>
        <Header />
        <Segment>
            <Table celled  >
                {/* <TableHeader>
                <TableCell>
                    <TableRow></TableRow>
                    <TableHeaderCell></TableHeaderCell>
                    <TableHeaderCell> </TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                </TableCell>
            </TableHeader> */}
                <TableHeader columns={4} textAlign="center" style={{ width: '50vw' }}>
                    {/* <TableRow> */}
                    {console.log("shop(header): ", shopping)}
                        <TableHeaderCell>כמות</TableHeaderCell>
                        <TableHeaderCell>שם</TableHeaderCell>
                        <TableHeaderCell>סוג</TableHeaderCell>
                        <TableHeaderCell>סוג</TableHeaderCell>
                    {/* </TableRow> */}
                </TableHeader>
                <TableBody>
                    {shopping.map((m, i) => {
                        <TableRow key={i}>
                            {console.log(m)}
                            <TableCell>11+{m.Count}</TableCell>
                            <TableCell> 22+{m.Name}</TableCell>
                            {/* <TableCell>{m.Type}</TableCell> */}
                            <TableCell ><button onClick={() => deleteProduct(m.Id)}><Icon name="trash alternate" /></button></TableCell>
                        </TableRow>
                    })}
                </TableBody>
                <Button onClick={() => setAdd(true)}>הוספת מוצר</Button>
                {add ? <><Message
                    attached
                    header='הוספת מוצר'
                    content='מלא את השדות למלא כדי להוסיף מוצר'
                />
                    <Form className='attached fluid segment' onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group widths='equal'>
                            <Form.Field fluid
                                label="שם "
                                placeholder='Product '
                                type='text'
                                {...register("Product")}
                                error={{ content: 'Please enter your product name', pointing: 'below' }}
                            />
                            <Form.Field fluid
                                label="כמות "
                                placeholder='Amount '
                                type='number'
                                {...register("Amount")}
                                error={{ content: 'Please enter your Amount ', pointing: 'below' }}
                            />
                            <Form.Field fluid
                                label="סוג "
                                placeholder='Product '
                                type='text'
                                {...register("Type")}
                                error={{ content: 'Please enter your Type name', pointing: 'below' }}
                            />
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
            </Table>
        </Segment>
    </>


}

export default ShoppingList;