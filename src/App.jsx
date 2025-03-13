import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import AddPetPage from "./page/AddPetPage/AddPetPage.jsx";
import HomePage from "./page/HomePage/HomePage.jsx";
import LoginPage from "./page/LoginPage/LoginPage.jsx";
import NewsPage from "./page/NewsPage/NewsPage.jsx";
import NotFoundPage from "./page/NotFoundPage/NotFoundPage.jsx";
import NoticesPage from "./page/NoticesPage/NoticesPage.jsx";
import OurFriendsPage from "./page/OurFriendsPage/OurFriendsPage.jsx";
import ProfilePage from "./page/ProfilePage/ProfilePage.jsx";
import RegistrationPage from "./page/RegistrationPage/RegistrationPage.jsx";

import Layout from "./components/Layout/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthIsRefreshing } from "./redux/auth/selectors.js";
import { useEffect } from "react";

import { apiIsRefreshing } from "./redux/auth/operations.js";
import { PrivateRoute } from "./routes/PrivateRoute.jsx";
import Loader from "./shared/Loader/Loader.jsx";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  useEffect(() => {
    dispatch(apiIsRefreshing());
  }, [dispatch]);

  if (isRefreshing) return <Loader />;
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/friends" element={<OurFriendsPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-page" element={<AddPetPage />} />
          <Route
            path="/profile"
            element={<PrivateRoute component={<ProfilePage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
