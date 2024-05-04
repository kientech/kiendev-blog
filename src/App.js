
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import Main from "./components/header/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import CategoryPage from "./pages/CategoryPage";
import BlogDetail from "./pages/BlogDetail";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardAddBlog from "./pages/dashboard/DashboardAddBlog";
import DashboardPage from "./pages/dashboard/DashboardPage";
import DashboardAddCategory from "./pages/dashboard/DashboardAddCategory";
import DashboardManageCategories from "./pages/dashboard/DashboardManageCategories";
import DashboardCategoryUpdate from "./pages/dashboard/DashboardCategoryUpdate";
import DashboardManageUser from "./pages/dashboard/DashboardManageUser";
import DashboardAddUser from "./pages/dashboard/DashboardAddUser";
import DashboardUpdateUser from "./pages/dashboard/DashboardUpdateUser";
import DashboardManagePosts from "./pages/dashboard/DashboardManagePosts";
import DashboardUpdatePost from "./pages/dashboard/DashboardUpdatePost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        <Route path="/sign-in" element={<SignIn></SignIn>}></Route>

        <Route path="*" element={<>Page Not found</>}></Route>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route
            path="/category/:slug"
            element={<CategoryPage></CategoryPage>}
          ></Route>
          <Route path="/:slug" element={<BlogDetail></BlogDetail>}></Route>
          <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
          <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        </Route>

        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>

          <Route
            path="/manage/add-post"
            element={<DashboardAddBlog></DashboardAddBlog>}
          ></Route>

          <Route
            path="/manage/add-category"
            element={<DashboardAddCategory></DashboardAddCategory>}
          ></Route>

          <Route
            path="/manage/add-user"
            element={<DashboardAddUser></DashboardAddUser>}
          ></Route>

          <Route
            path="/manage/update-category"
            element={<DashboardCategoryUpdate></DashboardCategoryUpdate>}
          ></Route>

          <Route
            path="/manage/update-post"
            element={<DashboardUpdatePost></DashboardUpdatePost>}
          ></Route>

          <Route
            path="/manage/update-user"
            element={<DashboardUpdateUser></DashboardUpdateUser>}
          ></Route>

          <Route
            path="/manage/posts"
            element={<DashboardManagePosts></DashboardManagePosts>}
          ></Route>

          <Route
            path="/manage/categories"
            element={<DashboardManageCategories></DashboardManageCategories>}
          ></Route>

          <Route
            path="/manage/users"
            element={<DashboardManageUser></DashboardManageUser>}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
