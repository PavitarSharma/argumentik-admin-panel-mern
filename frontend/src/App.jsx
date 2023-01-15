import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
const Home = lazy(() => import("./pages/home/Home"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const Login = lazy(() => import("./pages/auth/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const Images = lazy(() => import("./pages/admin/Images"));
const Social = lazy(() => import("./pages/admin/Social"));
const Users = lazy(() => import("./pages/admin/Users"));
const NotFound = lazy(() => import("./components/NotFound"));
import useMediaQuery from "./hooks/useMediaQuery";


const App = () => {
  const { token } = useSelector((state) => state.users);

  const [selectedPage, setSelectedPage] = useState("home");
  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const [isTopOfPage, setIsTopOfPage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) setIsTopOfPage(true);

      if (window.scrollY !== 0) setIsTopOfPage(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />

      <Suspense fallback={<p> Loading...</p>}>
        <Routes>
      
            <Route
              path="/"
              element={<Home />}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Route path="/admin" element={<Admin />}>
              <Route index element={<Dashboard />} />
              <Route path="social-links" element={<Social />} />
              <Route path="images" element={<Images />} />
              <Route path="users" element={<Users />} />
            </Route>
       

          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
