import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Card, CardContent, CardDescription, CardHeader, List, ListItem, ListContent, Button, ButtonContent, Image, Segment } from "semantic-ui-react";
import { addShopping } from "../service/shopping";
import Header from "../header";

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
        <Header />
        <Segment className="container">
            <Card fluid color='blue'>
                <CardContent>
                    <CardHeader><h1 className="header-recipe">{selectedRecipe?.Name}</h1></CardHeader>
                </CardContent>
                <Image size="huge" wrapped rounded src={selectedRecipe.Img} ui={false} className="img-recipe"/>
                <CardContent extra>
                    <span style={{ margin: 30 }}>
                        <Icon color='blue' name='list'/>
                        {" " + categoryRecipe.find(c => parseInt(c.Id) ===parseInt( selectedRecipe.CategoryId)).Name + " "}
                    </span>
                    <span style={{ margin: 30 }}>
                        <Icon color='blue' name='signal' />
                        {" " + difficultyList?.find(d => parseInt(d.Id) ===parseInt( selectedRecipe.Difficulty)).Name + " "}
                    </span>
                    <span style={{ margin: 30 }}>
                        <Icon color='blue' name='clock' />
                        {" " + selectedRecipe?.Duration + " דקות "}
                    </span>
                </CardContent>

                <CardDescription fluid color='blue' >{selectedRecipe.Description}</CardDescription>

                <CardContent color='blue'>
                    <CardHeader>רכיבים</CardHeader>
                    <List divided verticalAlign='middle'>
                        {selectedRecipe.Ingrident.map(( m,i) =>
                            <ListItem key={i}>
                                <ListContent floated='left'>
                                    <Button animated='vertical' onClick={() => dispatch(addShopping(user.Id, m.Name, m.Count+" "+m.Type))}>
                                        <ButtonContent hidden >הוסף</ButtonContent>
                                        <ButtonContent visible>
                                            <Icon name='shop' />
                                        </ButtonContent>
                                    </Button>
                                </ListContent>
                                <Icon color='blue' name='pencil alternate' style={{ margin: 15 }}/>
                                <ListContent > { m.Count + " " + m.Type + " " + m.Name}</ListContent>
                            </ListItem>
                        )}
                    </List>
                </CardContent>

                <CardContent>
                    <CardHeader color='blue'>הוראות הכנה</CardHeader>
                    <List divided verticalAlign='middle'>
                        {selectedRecipe.Instructions.map((m,i) =>
                            <ListItem key={i}>
                                <Icon color='blue' className='pencil alternate' style={{ margin: 15 }} />
                                <ListContent>{m}</ListContent>
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
                            <Icon name='edit' />
                        </Button>
                    </CardContent>
                    : <></>}
            </Card></Segment>
    </>
}

export default PresentationRecipe;
