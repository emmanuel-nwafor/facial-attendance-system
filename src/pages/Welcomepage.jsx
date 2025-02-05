// react hooks and routing
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// pages
import welcome1 from "../assets/welcome.svg";
import welcome2 from "../assets/welcome2.svg";
import welcome3 from "../assets/welcome3.svg";
import welcome5 from "../assets/welcome5.svg";

const WelcomePage = () => {
  const images = [welcome1, welcome2, welcome3, welcome5]; 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
     <div className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen bg-blue-50 p-6">
      
      {/* Left Section - Text & Button */}
      <div className="text-center lg:text-left lg:w-1/2 space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Welcome to the
          <span className="text-blue-600 font-bold"> Smart Attendance System</span>
        </h1>
        <p className="text-gray-600 max-w-md mx-auto lg:mx-0">
          Effortlessly mark and track attendance with our fast and accurate
          attendance technology simple, secure, and hassle-free.
        </p>
        <Link to="/signup">
          <button className="bg-blue-500 text-white  mt-2 py-2 px-6 rounded-lg text-lg hover:bg-blue-600 transition duration-300">
            Get Started
          </button> 
        </Link>
      </div>

      <div className="relative w-64 md:w-80 lg:w-96 overflow-hidden">
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="flex">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Slide ${index + 1}`} className="w-full h-auto flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WelcomePage;
