import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { ErrorPage } from "../pages/ErrorPage"
import { LoginPage } from "../pages/LoginPage"
import { SideBar } from 'layouts/SideBar';
import { ProfilePage } from "../pages/ProfilePage";

// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <HomePage />,
//       errorElement: <ErrorPage />,
//     },
//     {
//       path: "/home",    //TODO create home
//       element: <HomePage />,
//       errorElement: <ErrorPage />,
//     },
//     {
//       path: "/login",
//       element: <LoginPage/>
//     }
//   ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<SideBar/>}
      errorElement={<ErrorPage/>}
    >
      <Route errorElement={<ErrorPage />}>
        <Route
          path="/home"
          element={<HomePage/>}
          errorElement={<ErrorPage/>}
        />
        <Route
          path="/home"
          element={<HomePage/>}
          errorElement={<ErrorPage/>}
        />
        <Route
          path="/login"
          element={<LoginPage/>}
          errorElement={<ErrorPage/>}
        />
        <Route
          path="/profile"
          element={<ProfilePage/>}
          errorElement={<ErrorPage/>}
        />
      </Route>
    </Route>
    
  )
  )

export function RouterComponent() {
    return(
        <RouterProvider router={router} />
    )
}