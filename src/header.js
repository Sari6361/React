
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { MenuItem, Menu, Segment } from 'semantic-ui-react'
const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeItem, setActiveItem] = useState();
    const user = useSelector(state => ({ user: state.user.user }));
    return <>
        <Segment inverted>
            <Menu inverted pointing secondary>

                {user.user != null ?
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
                            <Link to={'/myRecipes'}>המתכונים שלי </Link>
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
                            <Link to={'/shopingList'}> רשימת קניות</Link>
                        </MenuItem>
                        <MenuItem
                            name='/addRecipe'
                            active={activeItem === '/addRecipe'}
                            onClick={() => dispatch({ type: 'SET_SELECTED_RECIPE', pyload: null })}
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
                            onClick={({ name }) => {
                                dispatch({ type: 'SET_USER', pylaod: null })
                            }}
                        >
                            <Link to={'/home'}>התנתקות</Link>
                        </MenuItem></>
                    : <> <MenuItem
                        name='/signIn'
                        active={activeItem === '/testSignIn'}
                    >

                        <Link to={"/signIn"}>הרשמה</Link>
                    </MenuItem>


                        <MenuItem
                            position='right'
                            name='/logIn'
                            active={activeItem === '/logIn'}
                        >
                            <Link to={'/logIn'}>כניסה</Link>
                        </MenuItem></>}

                {/* יש דף בית| המתכונים שלי | מתכונים | רשימת קניות | הוספת מתכון | הוספת קטגוריה | החלף משתמש */}

            </Menu>
        </Segment >
    </>
}
export default Header;
