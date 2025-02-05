import React, { useState, useEffect } from "react";

const ImageSlideshow = () => {
  const images = [
    "https://cdn.prod.website-files.com/6364b6fd26e298b11fb9391f/64816006b11ff55138c6962a_Thumbnail-00135.png", // Add more URLs if needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const duration = 5000; // 5 seconds for each slide

  // Automatically transition slides
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
    }, duration / 100); // Update progress every 1% of the duration

    return () => clearInterval(progressInterval);
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-full max-w-md">
        {/* Image */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-72 object-cover rounded-lg shadow-lg"
        />

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300 rounded-b-lg overflow-hidden">
          <div
            className="h-2 bg-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlideshow;
