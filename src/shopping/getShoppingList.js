import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { InputRef } from "../user/logIn";
import {Icon,TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table} from "semantic-ui-react";


const itemSchema = yup.object({
    Product: yup.string().required("לא הוכנס שם מוצר"),
    Amount: yup.number().positive("כמות חייבת להיות גדולה מאפס ").required(""),
    Type: yup.string().required(""),
});
import React from 'react'
// import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table, Icon } from 'semantic-ui-react'
import { Button } from "@mui/material";
import { AspectRatioSharp } from "@mui/icons-material";


const ShoppingList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [add, setAdd] = useState(false);

    let [user, shopping] = useSelector(s => {
        user: s.user.user;
        shopping: s.shopping.shopping_list;
    })
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(itemSchema)
    });

    deleteProduct = (product) => {
        axios.post(`http://localhost:8080/api/bay/${user.Id}/${product.Id}`, { Id: product.Id, UserId: user.Id })
            .then(
                dispatch({ type: 'DELETE_SHOPPING', pyload: product })
            )
            .catch(err => console.log(err.response.data));
    }
    onSubmit = (data) => {
        axios.post(`http://localhost:8080/api/bay`, { Name: data.Product, Count: data.Count, UserId: user.Id })
            .then(x => dispatch({ type: 'ADD_SHOPPING', pyload: x.data }))
            .catch(err => err.data.response);
    }
    return <>

        <Table >
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>כמות</TableHeaderCell>
                    <TableHeaderCell> שם</TableHeaderCell>
                    <TableHeaderCell>סוג</TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {shopping.map((m, i) => {
                    <TableRow key={i}>
                        <TableCell>{m.Amount}</TableCell>
                        <TableCell> {m.Product}</TableCell>
                        <TableCell>{m.Type}</TableCell>
                        <TableCell ><button onClick={() => deleteProduct(m)}><Icon name="trash alternate" /></button></TableCell>
                    </TableRow>
                })}
            </TableBody>
            <Button onClick={setAdd(true)}>הוספת מוצר</Button>
            {add ? <><Message
                attached
                header='הוספת מוצר'
                content='מלא את השדות למלא כדי להוסיף מוצר'
            />
                <Form className='attached fluid segment' onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                        <InputRef
                                fluid
                                label="שם "
                                placeholder='Product '
                                type='number'
                                {...register("Product")}
                                error={{ content: 'Please enter your product name', pointing: 'below' }}
                            />
                            <InputRef {...register("Amount")} />
                        </Form.Field>
                        <Form.Field>
                            <InputRef
                                fluid
                                label="שם"
                                placeholder='Product'
                                type='Product'
                                {...register("Product")}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Input label='סוג' placeholder=' Type ' type='text' {...register("Type")} />
                    <Button type="submit"> שמור</Button>
                </Form></> : null}
        </Table>
    </>


}

export default ShoppingList;