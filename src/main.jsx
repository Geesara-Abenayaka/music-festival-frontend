import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Loginpage/Loginpage.jsx'
import Signup from './Signup/Signup.jsx'
import Register from './Register/Register.jsx'
import Userdashboard from './Userdashboard/Userdashboard.jsx'
import Cart from './Cart/Cart.jsx'
import Myshows from './Myshows/Myshows.jsx'
import Account from './Account/Account.jsx'
import Welcome from './Welcome/Welcome.jsx'
import Admindashboard from './Admindashboard/Admindashboard.jsx'
import Deleteashow from './Deleteashow/Deleteashow.jsx'
import Editashow from './Editashow/Editashow.jsx'
import Changepassword from './Changepassword/Changepassword.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
   {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
   {
    path: "/register",
    element: <Register/>,
  },
   {
    path: "/userdashboard",
    element: <Userdashboard/>,
  },
   {
    path: "/cart",
    element: <Cart/>,
  },
   {
    path: "/myshows",
    element: <Myshows/>,
  },
  {
    path: "/welcome",
    element: <Welcome/>,
  },
   {
    path: "/admindashboard",
    element: <Admindashboard/>,
  },
   {
    path: "/deleteashow",
    element: <Deleteashow/>,
  },
  {
    path: "/editashow",
    element: <Editashow/>,
  },
  {
    path: "/changepassword",
    element: <Changepassword/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
