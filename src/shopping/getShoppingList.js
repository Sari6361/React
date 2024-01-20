import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { InputRef } from "../user/logIn";
import { Icon, TableRow, TableHeaderCell, TableHeader, Button, TableCell, TableBody, Table, Form, Message, Segment } from "semantic-ui-react";
import { addShopping, deletShoping, getShopping, editShoping } from "../service/shopping"
import Header from '../header';

const itemSchema = yup.object({
    Name: yup.string().required("לא הוכנס שם מוצר"),
    Count: yup.string().matches(/^[\d]+[\./\\]?[\d]*$/).required(""),
    Type: yup.string().required(""),
});

const ShoppingList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [add, setAdd] = useState(false);

    const { user, shopping } = useSelector((s) => ({
        user: s.user.user,
        shopping: s.shopping.shopping_list,
    }));
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(itemSchema)
    });
    useEffect(() => {
        if (!shopping.length) {
            dispatch(getShopping(user.Id))
        }
    }, [])

    const deleteProduct = (productId) => {
        dispatch(deletShoping(productId))
    }
    const increaseProduct = (product) => {
        dispatch(editShoping(product.Name, 1, user.Id))
    }
    const decreaseProduct = (product) => {
        if (product.Count > 1)
            dispatch(editShoping(product.Name, -1, user.Id))
        else dispatch(deletShoping(product.Id))
    }

    const onSubmit = (data) => {
        dispatch(addShopping({ userId: user.Id, name: data.Name, count: data.Count }))
        setAdd(false)
    }
    return <>
        {user === null ? navigate('/home') : null}
        <Header />
        <Segment className='container  '>
            <Table basic='very' textAlign="right" size='large' widths='equal' >
                < TableHeader >
                    <TableHeaderCell>    כמות</TableHeaderCell>
                    <TableHeaderCell>    שם</TableHeaderCell>
                    <TableHeaderCell>                     </TableHeaderCell>
                </TableHeader>
                <TableBody>
                    {shopping?.map((m, i) => (<>
                        <TableRow key={i}>
                            <TableCell>{m.Count + " "}</TableCell>
                            <TableCell value={m.Name}>{m.Name}</TableCell>
                            <TableCell >
                                <Button floated='left' onClick={() => { deleteProduct(m.Id) }}><Icon name="trash alternate" />
                                </Button>
                                <Button floated='left' onClick={() => increaseProduct(m)}>+</Button>
                                <Button floated='left' onClick={() => decreaseProduct(m)}>-</Button>
                            </TableCell>
                        </TableRow>
                    </>))
                    }
                </TableBody>
            </Table>
            <Button onClick={() => setAdd(true)}>הוספת מוצר</Button>
            <Button onClick={() => window.print()} icon='print' labelPosition="right" >הדפס רשימת קניות</Button>
            {add ? <><Message
                attached
                header='הוספת מוצר'
            />
                <Form className='attached fluid segment' onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>שם</label>
                            <InputRef fluid placeholder='Name ' type='text'  {...register("Name")} />
                        </Form.Field>

                        <Form.Field>
                            <label>כמות</label>
                            <InputRef fluid placeholder='Count ' type='number' {...register("Count")}
                                error={{ content: 'Please enter your Amount ', pointing: 'below' }} />
                        </Form.Field>

                        <Form.Field>
                            <label>סוג</label>
                            <InputRef fluid placeholder='Product ' type='text'  {...register("Type")} />
                        </Form.Field>

                    </Form.Group>
                    <Button type="submit"> שמור</Button>
                </Form></> : null}
        </Segment>
    </>


}

export default ShoppingList;