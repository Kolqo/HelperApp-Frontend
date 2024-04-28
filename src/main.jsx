import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/sign_in/sign_in'
import SignUp from './pages/sign_up/sign_up'
import MainPage from './pages/main_page/main_page'
import NotFound from './pages/not_found/not_found'
import About from './pages/about/about'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn/>,
    errorElement: <NotFound/>,
  },
  {
    path: '/sign_up',
    element: <SignUp/>,
    errorElement: <NotFound/>,
  },
  {
    path: '/main_page',
    element: <MainPage/>,
    errorElement: <NotFound/>,
  },
  {
    path: '/about',
    element: <About/>,
    errorElement: <NotFound/>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
