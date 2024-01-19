import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Card, CardContent, CardDescription, CardHeader, List, ListItem, ListContent, Button, ButtonContent, Image, Segment, SegmentGroup, SegmentInline } from "semantic-ui-react";
import { addShopping } from "../service/shopping";
import Header from "../header";

const PresentationRecipe = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categoryRecipe, difficultyList, selectedRecipe, user } = useSelector((s) => ({
        categoryRecipe: s.category.categories,
        difficultyList: s.recipe.difficultyLevel,
        selectedRecipe: s.recipe.selectRecipe,
        user: s.user.user
    }));

    return <>
        {user === null ? navigate('/home') : null}
        <Header />
        <Segment className="container">
            <Card fluid color='blue'>
                <CardContent>
                    <CardHeader><h1 className="header-recipe">{selectedRecipe?.Name}</h1></CardHeader>
                </CardContent>
                <Image size="huge" wrapped rounded src={selectedRecipe.Img} ui={false} className="img-recipe" />
                <CardContent extra>
                    <span style={{ margin: 30 }}>
                        <Icon color='blue' name='list' />
                        {"   " + categoryRecipe?.find(c => c.Id === selectedRecipe.CategoryId)?.Name + "   "}
                    </span>
                    <span style={{ margin: 30 }}>
                        <Icon color='blue' name='signal' />
                        {"    " + difficultyList?.find(d => d.Id === selectedRecipe?.Difficulty)?.Name + "    "}
                    </span>
                    <span style={{ margin: 30 }}>
                        <Icon color='blue' name='clock' />
                        {" " + selectedRecipe?.Duration + " דקות "}
                    </span>
                </CardContent>

                <CardContent fluid color='blue' >{selectedRecipe.Description}</CardContent>

                <CardContent color='blue'>
                    <CardHeader>רכיבים</CardHeader>
                    <SegmentGroup>
                        {selectedRecipe.Ingrident.map((m, i) =>
                            <Segment key={i} >
                                <SegmentInline >
                                    <Button animated='vertical' icon onClick={() => dispatch(addShopping({ userId: user.Id, name: m.Name, count: m.Count }))}>
                                        <ButtonContent hidden >הוסף</ButtonContent>
                                        <ButtonContent visible>
                                            <Icon name='shop' />
                                        </ButtonContent>
                                    </Button>
                                    <span style={{ margin: 15 }}> {"    " + m.Count + " " + m.Type + " " + m.Name}</span>
                                </SegmentInline>
                            </Segment>)}
                    </SegmentGroup>
                </CardContent>

                <CardContent>
                    <CardHeader color='blue'>הוראות הכנה</CardHeader>
                    <SegmentGroup>
                        {selectedRecipe.Instructions?.map((m, i) =>
                            <Segment key={i}>
                                <Icon color='blue' className='pencil alternate' style={{ margin: 15 }} />{m}
                            </Segment>)}
                    </SegmentGroup>
                </CardContent>
                {user.Id === selectedRecipe.UserId ?
                    <CardContent>
                        <Button color='blue' icon size='large' floated="left" onClick={() => {
                            dispatch({ type: 'DELETE_RECIPE', pyload: selectedRecipe.Id })
                            navigate('/recipes')
                        }}>
                            <Icon name='trash alternate' />
                        </Button>
                        <Button color='blue' icon size='large' floated="left" onClick={() => navigate('/editRecipe')}>
                            <Icon name='edit' />
                        </Button>
                        <Button onClick={() => window.print()} icon='print' color='blue'  size='large' floated="left">הדפס מתכון </Button>
                    </CardContent>
                    : <></>}
            </Card></Segment>
    </>
}

export default PresentationRecipe;
