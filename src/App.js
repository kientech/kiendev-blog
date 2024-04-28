import logo from "./logo.svg";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import Main from "./components/header/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
          <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        </Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
      </Routes>
    </>
  );
}

export default App;
