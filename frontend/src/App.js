import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import AddUser from "./components/addUser/AddUser";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddBlog from "./components/addBlog/AddBlog";
import AllBlogs from "./components/allBlogs/AllBlogs";
import BlogDetails from "./components/blogDetails/BlogDetails";
import BloggerDetails from "./components/bloggerDetails/BloggerDetails";
import AllBloggers from "./components/allBloggers/AllBloggers";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/navbar/NavBar";

function App() {
  const showToast = (msg) => {
    toast(msg);
  };
  return (
    <>
      <NavBar showToast={showToast} />
      <ToastContainer />
      <Routes>
        <Route
          path="/signIn"
          element={<SignIn showToast={showToast} />}
        ></Route>
        <Route
          path="/signUp"
          element={<SignUp showToast={showToast} />}
        ></Route>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/addBlog"
          element={<AddBlog showToast={showToast} />}
        ></Route>
        <Route path="/allBlogs" element={<AllBlogs />}></Route>
        <Route path="/allBloggers" element={<AllBloggers />}></Route>
        <Route path="/blogDetails/:id" element={<BlogDetails />}></Route>
        <Route path="/bloggerDetails/:id" element={<BloggerDetails />}></Route>
        <Route
          path="/setPassword"
          element={<AddUser showToast={showToast} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
