
import React, { Component, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { MenuItem, Menu, Segment } from 'semantic-ui-react'
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     // setOpen(true);
    //     <Link to={"/logIn"} />
    // };
    { console.log("header:first") }
    const [activeItem, setActiveItem] = useState();
    const user = useSelector((state) => ({ user: state.user.user }));
    return <>
        {console.log("user:", user)}
        {console.log("header:menu")}
        <Segment inverted>
            <Menu inverted secondary>

                {user.user!=null ? 
                <><MenuItem
                    position='right'
                    name='/home'
                    active={activeItem === '/home'}
                >
                    <Link to={'/home'}>עמוד הבית</Link>
                </MenuItem>
                    <MenuItem
                        name='/getRecipes'
                        active={activeItem === '/getRecipes'}
                    >
                        <Link to={`/getRecipes/${user.Id}}`}>המתכונים שלי</Link>
                    </MenuItem>
                    <MenuItem
                        name='/getRecipes'
                        active={activeItem === '/getRecipes'}
                    >
                        <Link to={'/getRecipes'}>מתכונים </Link>
                    </MenuItem>
                    <MenuItem
                        name='/getShoppingList'
                        active={activeItem === '/getShoppingList'}
                    >
                        <Link to={'/getShoppingList'}> רשימת קניות</Link>
                    </MenuItem>
                    <MenuItem
                        name='/addRecipe'
                        active={activeItem === '/addRecipe'}
                    >
                        <Link to={'/addRecipe'}> הוספת מתכון</Link>
                    </MenuItem>
                    <MenuItem
                        name='/addCategory'
                        active={activeItem === '/addCategory'}
                    >
                        <Link to={'/addCategory'}>הוספת קטגוריה</Link>
                    </MenuItem>
                    <MenuItem
                        position='left'
                        name='התנתקות'
                        //active={activeItem === '/disconnection'}
                        onClick={({ name }) => {
                            //setActiveItem(name);
                            dispatch({ type: 'SET_USER', pylaod: null })
                            console.log("disconnection:"+user);
                        }
                            // navigate('/');
                        }
                    >
                        <Link to={'/home'}>התנתקות</Link>
                    </MenuItem></> 
                    :<> <MenuItem
                        name='/testSignIn'
                        active={activeItem === '/testSignIn'}
                    >

                        <Link to={"/testSignIn"}>הרשמה</Link>
                    </MenuItem>


                        <MenuItem
                            position='right'
                            name='/logIn'
                            active={activeItem === '/logIn'}
                        >
                            {/* <Button variant="outlined" onClick={handleClickOpen}> */}
                            {/* <Button variant="outlined"> */}
                            {/* <Link to={"/logIn"} /> */}
                            {/* כניסה */}
                            {/* </Button> */}
                            <Link to={'/logIn'}>כניסה</Link>
                        </MenuItem></>}

                {/* יש דף בית| המתכונים שלי | מתכונים | רשימת קניות | הוספת מתכון | הוספת קטגוריה | החלף משתמש */}

            </Menu>
        </Segment>
    </>
}
export default Header;
