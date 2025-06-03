import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App.jsx'
import Dashbord from './pages/DashbordPage.jsx'
import Contact from './pages/Contact.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Dashbord/>
      },
      {
        path:'/courses',
        element:<Contact/>
      },
      {
        path:'/University',
        element:<Contact/>
      },
      {
        path:'/UniversityCourses',
        element:<Contact/>
      },
      {
        path:'/College',
        element:<Contact/>
      },
      {
        path:'/Contact',
        element:<Contact/>
      }
    ]
  }
])
const client = new QueryClient() 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
    <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>,
)
