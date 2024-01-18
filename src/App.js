import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import / from './user/LogIn';
// import SignIn from './user/SignIn';
import LogIn from './user/logIn';
import Home from './home';
import Header from './header';
import Signin from './user/signIn'
import Disconnection from './user/disconnection';
import PresentationRecipe from './recipe/presentationRecipe';
import AddRecipe from './recipe/addrecipe';
import AllRecipes from './recipe/allRecipes';
import RecipeCard from './recipe/recipeCard';
import ShoppingList from './shopping/getShoppingList';
import AddCategory from './category/addCategory';
import MyRecipes from './recipe/myRecipe';

function App() {
  // <Header/>
  // <Home/>
  {/* <hr/> */ }
  {/* <LogIn /> */ }
  {/* <SignIn /> */ }
  
  return (
  <Routes>
    {/* user */}
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/logIn" element={<LogIn />} />
    <Route path='/signIn' element={<Signin/>}/>
    <Route path="/disconnection" element={<Disconnection/>}/>
    {/* recipe */}
     <Route path="/addRecipe" element={<AddRecipe />} />
    <Route path="/showselectedrecipe" element={<RecipeCard />} />
    {/* <Route path="/editRecipe" element={<EditRecipe />} /> */}
    <Route path="/getRecipes" element={<AllRecipes />} />
    <Route path="/displayRecipe" element={<PresentationRecipe />} /> 
    <Route path='/myRecipes' element={<MyRecipes/>}/>
    {/* category */}
     <Route path="/addCategory" element={<AddCategory />}/>
    {/* <Route path="/getCategories" element={<InsetList />} />  */}
    {/* shoping list */}
    <Route path="/shopingList" element={<ShoppingList/>}/>
  </Routes>
  );
}

export default App;
