import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import SignupPage from './pages/SignupPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import AllPostPage from './pages/AllPostPage.jsx'
import CreatePostPage from './pages/CreatePostPage.jsx'
import { UserProvider } from './Contexts/UserContext.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },  
  { path: "/signup", element: <SignupPage /> },
  { path: "/completeProfile", element: <ProfilePage /> },
  { path: "/create-post", element: <CreatePostPage /> },
  { path: "/all-post", element: <AllPostPage /> },
    
]);

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <RouterProvider router={router}/>

  </UserProvider>
)
