import './App.css';
import React, { Suspense, lazy } from 'react';
import { Route, Routes, HashRouter as Router } from 'react-router-dom'
import * as ROUTES from './constants/pagesLinks'
import * as ProfileRoutes from './constants/profileLinks'
import Posts from './pages/Profile/ProfilePages/PostsPages/Posts';
import Tagged from './pages/Profile/ProfilePages/PostsPages/Tagged';
import Saved from './pages/Profile/ProfilePages/PostsPages/Saved';
import * as directLinks from './constants/directLinks'
import Chat from './pages/Direct/Chat/Chat';
import ModalDetailedPost from './pages/Profile/ProfilePages/Post/ModalDetailedPost';
import Following from './pages/Profile/ProfilePages/Modals/Following';
import Loading from './pages/Loading/Loading';
import { useSelector } from 'react-redux';

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const SignIn = lazy(() => import('./pages/SignIn/SignIn'))
const SignUp = lazy(() => import('./pages/SignUp/SignUp'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const Direct = lazy(() => import('./pages/Direct/Direct'))
const Explore = lazy(() => import('./pages/Explore/Explore'))
const Followers = lazy(() => import('./pages/Profile/ProfilePages/Modals/Followers'))
const People = lazy(() => import('./pages/People/People'))
// const Saved = lazy(() => import('./pages/ProfilePages/Saved'))
// const Tagged = lazy(() => import('./pages/ProfilePages/Tagged'))
// const Posts = lazy(() => import('./pages/ProfilePages/Posts'))


function App() {

  const isLoading = useSelector(state => state.isLoadingReducer.isLoading)

  return (
    <>
      {
        isLoading ?
          (
            <Loading />
          ) :
          (
              <Suspense fallback={<Loading />}>
                <Router>
                  <Routes>
                    <Route path={ROUTES.HOME} element={<Dashboard />}>
                      <Route path={ROUTES.DASHBOARD_POST} element={<ModalDetailedPost />} />
                    </Route>
                    <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                    <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
                    <Route path={ROUTES.PEOPLE} element={<People />} />
                    <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                    <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                    <Route path={ROUTES.PROFILE} element={<Profile />}>
                      <Route path={ProfileRoutes.POSTS} element={<Posts />}>
                        <Route path={ProfileRoutes.POST} element={<ModalDetailedPost />} />
                      </Route>
                      <Route path={ProfileRoutes.SAVED} element={<Saved />}>
                        <Route path={ProfileRoutes.SAVED_POSTS} element={<ModalDetailedPost />} />
                      </Route>
                      <Route path={ProfileRoutes.TAGGED} element={<Tagged />} />
                      <Route path={ProfileRoutes.FOLLOWERS} element={<Followers />} />
                      <Route path={ProfileRoutes.FOLLOWING} element={<Following />} />
                    </Route>
                    <Route path={ROUTES.DIRECT} element={<Direct />}>
                      <Route path={directLinks.CHAT} element={<Chat />}>
                        <Route path={directLinks.CHAT_POST} element={<ModalDetailedPost />} />
                      </Route>
                    </Route>
                    <Route path={ROUTES.EXPLORE} element={<Explore />}>
                      <Route path={ROUTES.EXPLORE_POST} element={<ModalDetailedPost />} />
                    </Route>
                  </Routes>
                </Router>
              </Suspense>
          )
      }
    </>
  )
}

export default App;
