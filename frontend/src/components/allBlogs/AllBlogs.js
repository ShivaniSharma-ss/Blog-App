import React, { useEffect, useState } from "react";
import "./allBlogs.css";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/getAllBlogs")
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        data.data = data.data.map((item) => {
          const dt = new Date(item.created_on);
          item.created_on =
            dt.getDate() + "/" + (+dt.getMonth() + 1) + "/" + dt.getFullYear();
          return item;
        });

        setBlogs(data.data);
      })
      .catch((err) => console.log);
  }, []);

  // function formatBlogData(data) {
  //   data = data.map((item) => {
  //     return new Promise((resolve) => {
  //       const base64String = btoa(
  //         String.fromCharCode.apply(null, new Uint8Array(item.picture.data))
  //       );
  //       item.picture = base64String;
  //       resolve(item);
  //     });
  //   });
  //   return Promise.all(data);
  // }

  return (
    <>
      {blogs.map((blog, index) => {
        return (
          <div key={index} className="container align-items-center main">
            <div className="col-md-12 ">
              <div className="row g-0 border blog-main-container overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">
                    {blog.category}
                  </strong>
                  <Link to={`/blogDetails/${blog.id}`} className="blog-title">
                    <h3 className="mb-0">{blog.title}</h3>
                  </Link>
                  <div className="mb-1 text-muted">{blog.created_on}</div>

                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/bloggerDetails/${blog.blogger_id}`}
                  >
                    <p className="card-text mb-auto text-success author-name">
                      {blog.full_name}
                    </p>
                  </Link>
                </div>
                <div className="col-auto d-none d-lg-block blog-pic-div">
                  <img src={blog.picture} alt="Blog" className="blog-pic" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AllBlogs;
