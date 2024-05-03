import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./BloggerDetails.module.css";

const BloggerDetails = () => {
  let { id } = useParams();
  const [blogger, setBlogger] = useState({ blogs: [] });
  useEffect(() => {
    fetch("http://localhost:4000/getBloggerById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id: id }),
    })
      .then((data) => data.json())
      .then((item) => {
        console.log(item);
        const dt = new Date(item.data.dob);
        item.data.dob =
          dt.getDate() + "/" + (+dt.getMonth() + 1) + "/" + dt.getFullYear();
        setBlogger(item.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <div className={"py-4" + " " + styles.bloggerDetailsMainDiv}>
        <div
          className={"mb-3" + " " + styles.card}
          style={{ maxWidth: "60rem", marginTop: "5rem" }}
        >
          <div className={"row g-0"}>
            <div className="col-md-4">
              <img
                src={blogger.profile_photo}
                className={
                  "img-fluid rounded-start" + " " + styles.bloggerDetailsPic
                }
                alt="..."
              />
            </div>
            <div className={styles.intro + " " + "col-md-8"}>
              <div className="card-body">
                <h5
                  className={styles.cardTitle + " " + "card-title text-success"}
                >
                  {blogger.full_name}
                </h5>
                <p className={styles.para + " " + "card-text text-muted"}>
                  {blogger.occupation}
                </p>
                <p className={styles.para + " " + "card-text"}>
                  D.O.B: {blogger.dob}
                </p>
                <p className={styles.para + " " + "card-text"}>
                  Area of Interest: {blogger.area_of_interest}
                </p>
                <p className={styles.para + " " + "card-text"}>
                  Nationality: {blogger.nationality}
                </p>
                <div className={styles.social + " " + "my-3"}>
                  <a href="">
                    <img
                      className={styles.socialImg}
                      src="../../images/instagram.png"
                      alt="Instagram"
                    />
                  </a>
                  <a href="">
                    <img
                      className={styles.socialImg}
                      src="../../images/facebook.png"
                      alt="Facebook"
                    />
                  </a>
                  <a href="">
                    <img
                      className={styles.socialImg}
                      src="../../images/twitter.png"
                      alt="Twitter"
                    />
                  </a>
                  <a href="">
                    <img
                      className={styles.socialImg}
                      src="../../images/linkedin.png"
                      alt="Linkedin"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class="text-center text-success">Blogs by {blogger.full_name}</h2>
      {blogger.blogs.map((blog, index) => {
        const dt = new Date(blog.created_on);
        if (!isNaN(dt)) {
          blog.created_on =
            dt.getDate() + "/" + (+dt.getMonth() + 1) + "/" + dt.getFullYear();
        }

        return (
          <div
            className="container align-items-center my-3"
            style={{ maxWidth: "62rem" }}
          >
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

                  <p className="card-text mb-auto text-success author-name">
                    {blogger.full_name}
                  </p>
                </div>
                <div className="col-auto d-none d-lg-block blog-pic-div">
                  <img
                    src={blog.picture}
                    alt="{{post.picture}}"
                    className={styles.blogPic}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BloggerDetails;
