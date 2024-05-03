import React from "react";
import "../Home/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Hourglass } from "react-loader-spinner";

import Slider from "react-slick";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const categories = [
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
  const [selectedCategory, setSelectedCategory] = useState("Technology");
  const [showLoader, setShowLoader] = useState(true);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
  };

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:4000/getBlogsByCategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: selectedCategory }),
      })
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          setShowLoader(false);
          setBlogs(data.data);
        })
        .catch((err) => {});
    }, 3000);
  }, [selectedCategory]);

  function handleCategory(e) {
    if (e !== selectedCategory) {
      setSelectedCategory(e);
      setShowLoader(true);
    }
  }
  return (
    <>
      <div className="nav-scroller  mb-1 px-5 bg-grey">
        <nav className="nav d-flex justify-content-between category-items">
          {categories.map((category, index) => {
            return (
              <p
                className={
                  selectedCategory === category
                    ? "my-active p-2 link-secondary"
                    : "p-2 link-secondary"
                }
                onClick={() => handleCategory(category)}
              >
                {category}
              </p>
            );
          })}
        </nav>
      </div>
      <div className="p-4 mb-2 text-white rounded bg-dark">
        <div className="col-md-12 px-0 intro-main-div">
          <div className="text-content">
            <h1 className="display-4 fst-italic">
              WHAT ARE YOU CURIOUS ABOUT TODAY?
            </h1>
            <p className="lead my-3">
              Read from world's top writers and bloggers on the go and explore
              every type of blogs here.
            </p>
          </div>
          <section id="trainings" className="trainings">
            <div className="container" style={{ maxWidth: "35vw" }}>
              <Slider {...settings}>
                {/* <div className="slider"> */}
                <div>
                  <img
                    className="slider-image"
                    src="../../images/travel.jpg"
                    alt="category"
                  />
                  <h4 className="slider-heading">Travel</h4>
                </div>
                <div>
                  <img
                    className="slider-image"
                    src="../../images/food_blog.jpg"
                    alt="category"
                  />
                  <h4 className="slider-heading">Food</h4>
                </div>
                <div>
                  <img
                    className="slider-image"
                    src="../../images/tech.jpg"
                    alt="category"
                  />
                  <h4 className="slider-heading">Technology</h4>
                </div>
                <div>
                  <img
                    className="slider-image"
                    src="../../images/science.jpg"
                    alt="category"
                  />
                  <h4 className="slider-heading">Science</h4>
                </div>
                <div>
                  <img
                    className="slider-image"
                    src="../../images/health.jpg"
                    alt="category"
                  />
                  <h4 className="slider-heading">Health</h4>
                </div>
                <div>
                  <img
                    className="slider-image"
                    src="../../images/bussiness.png"
                    alt="category"
                  />
                  <h4 className="slider-heading">Business</h4>
                </div>
                <div>
                  <img
                    className="slider-image"
                    src="../../images/culture.jpg"
                    alt="category"
                  />
                  <h4 className="slider-heading">Culture</h4>
                </div>
                <div>
                  <img
                    className="slider-image"
                    src="../../images/politics.jpg"
                    alt="category"
                  />
                  <h4 className="slider-heading">Politics</h4>
                </div>
                {/* </div> */}
              </Slider>
              <div className="slider-dots"></div>
            </div>
          </section>
        </div>
      </div>
      {showLoader ? (
        <div className="loader">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#212529", "#3f4142"]}
          />
        </div>
      ) : (
        blogs.map((blog, index) => {
          return (
            <div key={index} className="container align-items-center ">
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
                    <img
                      src={blog.picture}
                      alt="{{post.picture}}"
                      className="blog-pic"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Home;
