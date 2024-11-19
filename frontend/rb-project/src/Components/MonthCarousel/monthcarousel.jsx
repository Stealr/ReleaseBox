import React, { useState } from "react";
import "./MonthCarousel.css"; // Создайте CSS для оформления



const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const MonthCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Изначально выделен ноябрь

  const today = new Date();
  const year = today.getFullYear();
  const [carousel_year, setYear] = useState(year)



  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < months.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="carousel-container">
      <button className="arrow-button" onClick={handlePrev}>
        &larr;
      </button>
      <div className="months">
        {months.map((month, index) => (
          <div
            key={index}
            className={`month ${
              index === currentIndex ? "active" : ""
            }`}
          >
            {month}
          </div>
        ))}
      </div>
      <button className="arrow-button" onClick={handleNext}>
        &rarr;
      </button>
    </div>
  );
};

export default MonthCarousel;
