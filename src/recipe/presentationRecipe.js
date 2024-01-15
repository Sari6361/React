import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Card, CardContent, CardDescription, CardHeader, List, ListItem, ListContent, CardFooter, Button, ButtonContent, Image } from "semantic-ui-react";
import axios from "axios";
import { addShopping } from "../service/shopping";

const PresentationRecipe = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categoryRecipe, difficultyList, selectedRecipe, user } = useSelector((s) => ({
        categoryRecipe: s.shopping.shopping_list,
        difficultyList: s.shopping.shopping_list,
        selectedRecipe: s.recipe.selectRecipe,
        user: s.user.user
    }));

    return <>
        <Card fluid color='blue'>
            <CardContent>
                <CardHeader>{selectedRecipe.Name}</CardHeader>
            </CardContent>
            <Image src={selectedRecipe.Img} wrapped ui={false} />
            <CardContent extra>
                <span style={{ margin: 30 }}>
                    <Icon color='blue' name='qrcode' />
                    {" " + categoryRecipe.find(c => c.Id === selectedRecipe.CategoryId)?.Name + " "}
                </span>
                <span style={{ margin: 30 }}>
                    <Icon color='blue' name='signal' />
                    {" " + difficultyList?.find(d => d.Id === selectedRecipe.Difficulty)?.Name + " "}
                </span>
                <span style={{ margin: 30 }}>
                    <Icon color='blue' name='clock' />
                    {" " + selectedRecipe.Duration + " דקות "}
                </span>
            </CardContent>

            <CardDescription fluid color='blue' >{selectedRecipe.Description}</CardDescription>

            <CardContent color='blue'>
                <CardHeader>רכיבים</CardHeader>
                <List divided verticalAlign='middle'>
                    {selectedRecipe.Ingrident.map((i, m) =>
                        <ListItem key={i}>
                            <ListContent floated='left'>
                                <Button animated='vertical' onClick={() => dispatch(addShopping(user.Id, m.Name, m.Count))}>
                                    <ButtonContent hidden >הוסף</ButtonContent>
                                    <ButtonContent visible>
                                        <Icon name='shop' />
                                    </ButtonContent>
                                </Button>
                            </ListContent>
                            <Icon color='blue' name='pencil alternate' />
                            <ListContent>{m.Count + " " + m.Type + " " + m.Name}</ListContent>
                        </ListItem>
                    )}
                </List>
            </CardContent>

            <CardContent>
                <CardHeader color='blue'>הוראות הכנה</CardHeader>
                <List divided verticalAlign='middle'>
                    {selectedRecipe.Instructions.map((i, m) =>
                        <ListItem key={i}>
                            <Icon color='blue' name='hand point left' />
                            <ListContent>{m.instruction}</ListContent>
                        </ListItem>
                    )}
                </List>
            </CardContent>
            {user.Id === selectedRecipe.UserId ?
                <CardContent>
                    <Button color='blue' icon size='large' floated="left" onClick={() => {
                        dispatch({ type: 'DELETE_RECIPE', pyload: selectedRecipe.Id })
                        navigate('/recipes')
                    }}>
                        <Icon name='trash alternate' />
                    </Button>
                    <Button color='blue' icon size='large' floated="left" onClick={() => navigate('/edit')}>
                        <Icon name='blue' />
                    </Button>
                </CardContent>
                : <></>}
        </Card>
    </>
}

export default PresentationRecipe;

//https://mui.com/material-ui/react-card/