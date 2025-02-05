import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const images = [
    "https://cdn.prod.website-files.com/6364b6fd26e298b11fb9391f/64816006b11ff55138c6962a_Thumbnail-00135.png",
    "https://www.studying-in-germany.org/wp-content/uploads/2024/02/internship-in-germany-graphic.png",
    "https://www.studying-in-germany.org/wp-content/uploads/2024/02/working-in-germany-graphic.png", // Example image
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const duration = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setProgress(0);
    }, duration);

    return () => clearInterval(interval);
  }, [images.length]);

  // Progress bar effect
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 1 : 100
      );
    }, duration / 100);

    return () => clearInterval(progressInterval);
  }, [currentIndex]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col justify-center items-center">
      {/* Hero Section */}
      <div className="max-w-4xl max-md:text-center items-center  lg:flex">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="mx-auto w-72 lg:w-[500px] m-5"
        />

        <div className="m-5">
          <h1 className="text-[30px] font-bold  text-gray-800 mt-6">
            Welcome to the Attendance System
          </h1>
          <p className="text-lg text-gray-600 mt-4 ">
            A seamless way to manage and track attendance using cutting-edge
            facial recognition technology. Designed for the interaction between
            students and lecturers.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex max-md:justify-center gap-4">
            <Link to="/signup">
              <button className="px-6 py-3 max-md:py-2 max-md:px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-orange-600 shadow-md">
                Get Started
              </button>
            </Link>
            <button className="px-6 py-3 max-md:py-2 max-md:px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="m-2 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Attendance System. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Welcome;
