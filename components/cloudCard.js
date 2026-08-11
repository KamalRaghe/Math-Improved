"use client";

import { useEffect, useState } from "react";

export default function CloudCard({
  title,
  description,
  images,
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="mi-cloud-card">
      <div className="mi-carousel">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={title}
            className={current === index ? "active" : ""}
          />
        ))}
      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      <a href="/Trial" className="mi-primary-btn">
        Start Learning
      </a>
    </section>
  );
}