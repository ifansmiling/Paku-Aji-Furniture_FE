import React, { useState, useEffect } from "react";
import ap from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const baseURL = "http://localhost:5000";

const Carousel = () => {
  const [slides, setSlides] = useState([]);

  const fetchSliders = async () => {
    try {
      const response = await ap.get("/slider");
      console.log(response.data);
      setSlides(response.data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const getFullImagePath = (path) => {
    return `${baseURL}${path}`;
  };

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide mt-5"
      data-bs-ride="carousel"
    >
      {/* Menambahkan margin-top dengan kelas mt-5 untuk memberi jarak */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            type="button"
            key={index}
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={getFullImagePath(slide.gambar)}
              className="d-block w-100"
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
