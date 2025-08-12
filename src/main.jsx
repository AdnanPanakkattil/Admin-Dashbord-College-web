import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App.jsx'
import Dashbord from './pages/DashbordPage.jsx'
import Contact from './pages/ContactPage.jsx'
import Courses from './components/Courses/Courses.jsx'
import University from './components/University/University.jsx'
import UniversityCourses from './components/UniversityCourses/UniversityCourses.jsx'
import College from './components/College/College.jsx'
import LoginPage from './components/loging/LoginPage.jsx'
import { RouteProtect } from './components/Cookies/Provider.jsx'



const router = createBrowserRouter([
  {
    path:'/',
    element: (
      <RouteProtect>
        <App />
      </RouteProtect>
    ),
    children:[
      {
        path:'/',
        element:<Dashbord/>
      },
      {
        path:'/courses',
        element:<Courses/>
      },
      {
        path:'/University',
        element:<University/>
      },
      {
        path:'/UniversityCourses',
        element:<UniversityCourses/>

      },
      {
        path:'/College',
        element:<College/>
      },
      {
        path:'/Contact',
        element:<Contact/>
      },
    ]
  },
  {
    path:'/login',
    element:<LoginPage/>
  },
])

const client = new QueryClient() 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
    <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>,
  
)
