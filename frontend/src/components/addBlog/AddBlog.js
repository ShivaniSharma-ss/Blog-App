import React, { useState, useEffect } from "react";
import styles from "./AddBlog.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddBlog = ({showToast}) => {
  const categories = [
    "Select category",
    "Technology",
    "World",
    "India",
    "Food",
    "Science",
    "Health",
    "Travel",
    "Education",
    "Politics",
    "Others",
  ];
  const [bloggers, setBloggers] = useState([]);
  const [toast, setToast] = useState(false);
  const [error, setError] = useState({
    isErrorOfAuthor: false,
    isErrorOfCategory: false,
    msg1: "",
    msg2: "",
  });
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    profile: "",
    createdOn: "",
    category: "",
  });
  useEffect(() => {
    fetch("http://localhost:4000/getAllBloggers")
      .then((result) => {
        return result.json();
      })
      .then((blogger) => {
        setBloggers([{ full_name: "Select Author" }, ...blogger.data]);
      })
      .catch((err) => {});
  }, []);

  function addBlogData(e) {
    e.preventDefault();
    let flag = false;
    if (blog.author === null || blog.author === "Select author") {
      setError((prev) => {
        return { ...prev, isErrorOfAuthor: true, msg1: "please select author" };
      });
      flag = true;
    } else {
      setError((prev) => {
        return {
          ...prev,
          isErrorOfAuthor: false,
          msg1: "",
        };
      });
      flag = false;
    }

    if (blog.category === null || blog.category === "Select category") {
      setError((prev) => {
        return {
          ...prev,
          isErrorOfCategory: true,
          msg2: "please select category",
        };
      });
      return;
    } else {
      setError((prev) => {
        return {
          ...prev,
          isErrorOfCategory: false,
          msg2: "",
        };
      });
    }
    if (flag) return;
    fetch("http://localhost:4000/addBlog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        document.getElementById("formFileSm").value = "";
        setBlog((prev) => ({
          title: "",
          content: "",
          author: "",
          profile: "",
          createdOn: "",
          category: "",
        }));
        showToast("Blog added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleBlogChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setBlog((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // function handleImageChange(e) {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     setBlog((prev) => {
  //       return { ...prev, profile: reader.result };
  //     });
  //   });
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // }

  return (
    <>
      {/* <ToastContainer limit={1} /> */}
      <div className={"container d-flex justify-content-center mt-5  p-5"}>
        <div className={"row" + " " + styles.card}>
          <h3 className="text-center mb-2 text-success">Add Blog</h3>
          <form onSubmit={addBlogData}>
            <div className="mb-2">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
              <input
                onChange={handleBlogChange}
                name="title"
                type="text"
                value={blog.title}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Title"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Content
              </label>
              <textarea
                placeholder="Enter content"
                onChange={handleBlogChange}
                value={blog.content}
                name="content"
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
                required
              ></textarea>
            </div>
            <div className="mb-2">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Author
              </label>
              <select
                onChange={handleBlogChange}
                name="author"
                value={blog.author}
                className="form-control"
                required
              >
                {bloggers.map((blogger, index) => {
                  return (
                    <option key={index} value={blogger.id}>
                      {blogger.full_name}
                    </option>
                  );
                })}
              </select>
              {error.isErrorOfAuthor && (
                <span className="text-danger">{error.msg1}</span>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Category
              </label>
              <select
                required
                value={blog.category}
                onChange={handleBlogChange}
                name="category"
                className="form-control"
              >
                {categories.map((category, index) => {
                  return (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
              {error.isErrorOfCategory && (
                <span className="text-danger">{error.msg2}</span>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="formFileSm" className="form-label">
                Add Blog Image
              </label>
              <input
                placeholder="Paste any imageUrl from google"
                onChange={handleBlogChange}
                name="profile"
                className="form-control"
                type="text"
                value={blog.profile}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="formFileSm" className="form-label">
                Created On
              </label>
              <input
                value={blog.createdOn}
                required
                onChange={handleBlogChange}
                name="createdOn"
                className="form-control form-control-sm"
                id="formFileSm"
                type="date"
              />
            </div>
            <div className="md-3 justify-content-center d-flex">
              <button className="btn btn-outline-dark" type="submit">
                Add blog data
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
