import './App.css';
import React, { Suspense, lazy } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import * as ROUTES from './constants/links'
import { useSelector } from 'react-redux';
import * as ProfileRoutes from './constants/profileLinks'
import Posts from './pages/ProfilePages/Posts';
import Tagged from './pages/ProfilePages/Tagged';
import Saved from './pages/ProfilePages/Saved';

const Home = lazy(() => import('./pages/Home'))
const SignIn = lazy(() => import('./pages/SignIn'))
const SignUp = lazy(() => import('./pages/SignUp'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Profile = lazy(() => import('./pages/Profile'))
const Direct = lazy(() => import('./pages/Direct/Direct'))
const Explore = lazy(() => import('./pages/Explore'))
const Followers = lazy(() => import('./pages/ProfilePages/Followers'))
// const Saved = lazy(() => import('./pages/ProfilePages/Saved'))
// const Tagged = lazy(() => import('./pages/ProfilePages/Tagged'))
// const Posts = lazy(() => import('./pages/ProfilePages/Posts'))


function App() {

  return (
    <>
      <Suspense fallback={"Loading..."}>
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path={ROUTES.PROFILE} element={<Profile />}>
              <Route path={ProfileRoutes.POSTS} element={<Posts />} />
              <Route path={ProfileRoutes.SAVED} element={<Saved />} />
              <Route path={ProfileRoutes.TAGGED} element={<Tagged />} />
              <Route path = {ProfileRoutes.FOLLOWERS} element={<Followers />} />
            </Route>
            <Route path={ROUTES.DIRECT} element={<Direct />} />
            <Route path={ROUTES.EXPLORE} element={<Explore />} />


          </Routes>
        </Router>
      </Suspense>
    </>
  )
}

export default App;
