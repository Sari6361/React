import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import / from './user/LogIn';
// import SignIn from './user/SignIn';
import LogIn from './user/logIn';
import Home from './home';
import Header from './header';
import Signin from './user/SignIn'
import Disconnection from './user/disconnection';
import PresentationRecipe from './Recipe/presentationRecipe';
import AddRecipe from './Recipe/addRecipe';
import AllRecipes from './Recipe/allRecipes';
import RecipeCard from './Recipe/RecipeCard';
import ShoppingList from './shopping/getShoppingList';

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
    <Route path="/home" element={<Header />} />
    <Route path="/logIn" element={<LogIn />} />
    <Route path='/signIn' element={<Signin/>}/>
    <Route path="/disconnection" element={<Disconnection/>}/>
    {/* recipe */}
     <Route path="/addRecipe" element={<AddRecipe />} />
    <Route path="/showselectedrecipe" element={<RecipeCard />} />
    {/* <Route path="/editRecipe" element={<EditRecipe />} /> */}
    <Route path="/getRecipes" element={<AllRecipes />} />
    <Route path="/displayRecipe" element={<PresentationRecipe />} /> 
    {/* category */}
    {/* <Route path="/addCategory" element={<TestCategory />} />
    <Route path="/getCategories" element={<InsetList />} /> */}
    {/* shoping list */}
    <Route path="/shopingList" element={<ShoppingList/>}/>
  </Routes>
  );
}

export default App;
