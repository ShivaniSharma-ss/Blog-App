import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./AllBloggers.module.css";

const AllBloggers = () => {
  const [bloggers, setBloggers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/getAllBloggers")
      .then((result) => {
        return result.json();
      })
      .then((blogger) => {
        setBloggers(blogger.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div className={styles.mainDivBloggers}>
        <div
          className="row text-center"
          style={{ maxWidth: "100%", marginTop: "5rem" }}
        >
          {bloggers.map((blogger, index) => {
            return (
              <div
                key={index}
                className={styles.bloggerCard + " " + "card mx-4 my-3"}
                style={{ width: "20rem;border-radius: 20px" }}
              >
                <img
                  className={styles.bloggerPic}
                  src={blogger.profile_photo}
                  alt="{{blogger.profile_photo}}"
                />
                <div className="card-body">
                  <Link
                    to={`/bloggerDetails/${blogger.id}`}
                    className="blogger-name-link"
                  >
                    <h5 className="blogger-name-card text-success">
                      {blogger.full_name}
                    </h5>
                  </Link>
                  <p className="text-muted">{blogger.occupation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllBloggers;
