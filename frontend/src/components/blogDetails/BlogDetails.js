import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./blogDetails.css";
const BlogDetails = () => {
  let { id } = useParams();
  const [blog, setBlog] = useState({});
  useEffect(() => {
    fetch("http://localhost:4000/getBlogsById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id: id }),
    })
      .then((data) => data.json())
      .then((item) => {
        console.log(item);

        const dt = new Date(item.data[0].created_on);
        item.data[0].created_on =
          dt.getDate() + "/" + (+dt.getMonth() + 1) + "/" + dt.getFullYear();

        setBlog(item.data[0]);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <div className="container align-items-center my-4">
        <div className="col-md-12 ">
          <div className="row g-0 overflow-hidden flex-md-row mb-4 h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-0 mt-5 ml-2 text-success">
                {blog.category}
              </strong>
              <h3 className="mb-0">{blog.title}</h3>
              <div className="mb-1 text-muted">{blog.created_on}</div>
              <Link
                className="text-decoration-none"
                to={`/bloggerDetails/${blog.blogger_id}`}
              >
                <div className="mb-3 text-primary ">{blog.full_name}</div>
              </Link>
              <div className="blog-details-pic-div">
                <img src={blog.picture} alt="" className="blog-details-pic" />
              </div>
              <p className="mb-auto mt-4">{blog.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
