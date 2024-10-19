"use client";
import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 300 pixels
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="rounded-full bg-gray-400"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          <ArrowUp></ArrowUp>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
