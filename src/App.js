
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Root from './Root'
import FormValidationExample from './components/Register/Register';
import Home from './components/Home/Home';
import Aboutus from './components/Aboutus/About';
import Login from './components/login/Login';
import User_profile from './components/User-profile/User-profile';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import ProdReg from './components/ProductReg/ProdReg';
import Details from './components/Details/Details';
function App() {
  const routerObj=createBrowserRouter([
    {
      path:'/',
      element:<Root/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/Login',
          element:<Login/> 
        },
        {
          path:'/Register',
          element:<FormValidationExample/>
        },
        {
          path:'/Aboutus',
          element:<Aboutus/>
        },
        {
          path:'/User-profile',
          element:<User_profile/>,
          children:[
            {
              path:'Cart',
              element:<Cart/>
            }
          ]
        },
        {
          path:'/ProdReg',
          element:<ProdReg/>
        },
        {
          path:'/Details',
          element:<Details/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={routerObj}/>
    </div>
  );
}

export default App;
