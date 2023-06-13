import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { ErrorPage } from "../pages/ErrorPage"
import { LoginPage } from "../pages/LoginPage"
import { SideBar } from 'layouts/SideBar';
import { ProfilePage } from "../pages/ProfilePage";
import { FavouritePage } from "../pages/FavouritePage";
import { SearchPage } from "../pages/SearchPage";
import { AlbumPage } from "../pages/AlbumPage";
import { ArtistPage } from "../pages/ArtistPage";
import { SettingsPage } from "../pages/SettingsPage";
import { UserPage } from "../pages/UserPage";
import { AddAlbumPage } from "../pages/AddAlbumPage";
import { RegistrationPage } from "../pages/RegistrationPage";
// import { action as loginAction } from "../pages/LoginPage";
import { AddArtistPage } from "../pages/AddArtistPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
            path="/"
            element={<LoginPage/>}
            errorElement={<ErrorPage/>}
          />
      {/* <Route
            path="/login"
            element={<LoginPage/>}
            errorElement={<ErrorPage/>}
            action={loginAction}
          /> */}
          <Route
            path="/login"
            element={<LoginPage/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/register"
            element={<RegistrationPage/>}
            errorElement={<ErrorPage/>}
          />
      
        <Route
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
            path="/favourite"
            element={<FavouritePage/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/profile"
            element={<ProfilePage/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/search"
            element={<SearchPage/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/album"
            element={<AlbumPage/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/artist"
            element={<ArtistPage/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/user/:id"
            element={<UserPage/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/settings"
            element={<SettingsPage/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/add/album"
            element={<AddAlbumPage/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/add/artist"
            element={<AddArtistPage/>}
            errorElement={<ErrorPage/>}
          />
          </Route>
        </Route>
      </Route>
    
  )
  )

export function RouterComponent() {
    return(
        <RouterProvider router={router} />
    )
}