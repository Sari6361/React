import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Card, CardContent, CardHeader, Button, ButtonContent, Image, Segment, SegmentGroup, SegmentInline } from "semantic-ui-react";
import { addShopping, editShoping } from "../service/shopping";
import { deleteRecipe } from "../service/recipes";
import Swal from "sweetalert2";
import Header from "../header";

const PresentationRecipe = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categoryRecipe, difficultyList, selectedRecipe, shopping, user } = useSelector((s) => ({
        categoryRecipe: s.category.categories,
        difficultyList: s.recipe.difficultyLevel,
        selectedRecipe: s.recipe.selectRecipe,
        shopping: s.shopping.shopping_list,
        user: s.user.user
    }));
    const addIngridient = (m) => {
        console.log("m=", m)
        let x = shopping?.find(s => s.Name === m.Name)
        if (!x)
            dispatch(addShopping({ userId: user.Id, name: m.Name, count: 1}))
        else dispatch(editShoping(m.Name, 1, user.Id))
    }

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
                                    <Button animated='vertical' icon onClick={() => addIngridient(m)} >
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
                            Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    dispatch(deleteRecipe(selectedRecipe.Id))
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                }
                            }).then(() => navigate('/getRecipes'))
                        }}>
                            <Icon name='trash alternate' />
                        </Button>
                        <Button color='blue' icon size='large' floated="left" onClick={() => navigate('/editRecipe')}>
                            <Icon name='edit' />
                        </Button>
                        <Button onClick={() => window.print()} icon='print' color='blue' size='large' floated="left">הדפס מתכון </Button>
                    </CardContent>
                    : <>
                        <CardContent>
                            <Button onClick={() => window.print()} icon='print' color='blue' size='large' floated="left">הדפס מתכון </Button>
                        </CardContent></>}
            </Card></Segment>
    </>
}

export default PresentationRecipe;
