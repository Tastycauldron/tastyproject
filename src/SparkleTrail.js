import React, { useEffect } from "react";
import "./SparkleTrail.css";

function SparkleTrail() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = `${e.pageX}px`;
      sparkle.style.top = `${e.pageY}px`;
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000); // disappear after 1s
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}

export default SparkleTrail;
