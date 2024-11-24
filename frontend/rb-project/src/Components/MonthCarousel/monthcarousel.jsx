import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./MonthCarousel.css";

const monthNames = [
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
  "December",
];


function MonthCarousel({currentIndex, currentYear, setCurrentIndex, setCurrentYear}) {
  const [visibleMonths, setVisibleMonths] = useState(5);

  useEffect(() => {
    const updateVisibleMonths = () => {
      const width = window.innerWidth;
      if (width <= 1150) setVisibleMonths(1);
      else if (width <= 1650) setVisibleMonths(3);
      else setVisibleMonths(5);
    };

    updateVisibleMonths();
    window.addEventListener("resize", updateVisibleMonths);

    return () => {
      window.removeEventListener("resize", updateVisibleMonths);
    };
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevIndex - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevIndex + 1;
    });
  };


  const getMonthsToDisplay = () => {
    const months = [];
    const half = Math.floor(visibleMonths / 2);

    for (let i = -half; i <= half; i++) {
      const index = (currentIndex + i + 12) % 12;
      months.push(monthNames[index]);
    }
    return months;
  };

  return (
    <div className="carousel-container">
      <button className="arrow-button left" onClick={handlePrevious}>{"<"}</button>
      <div className="carousel">
        {getMonthsToDisplay().map((month, index) => (
          <motion.div
            key={`${month}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: index === Math.floor(visibleMonths / 2) ? 1 : 0.6, scale: index === Math.floor(visibleMonths / 2) ? 1 : 0.8 }}
            transition={{ duration: 0.4 }}
            className={`month ${index === Math.floor(visibleMonths / 2) ? "selected" : ""}`}
          >
            {month} {index === Math.floor(visibleMonths / 2) ? currentYear : ""}
          </motion.div>
        ))}
      </div>
      <button className="arrow-button right" onClick={handleNext}>{">"}</button>
    </div>
  );
}

export default MonthCarousel;
