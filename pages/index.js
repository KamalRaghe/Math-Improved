import { useEffect, useState } from "react";

export default function Home() {
  const [free, setFree] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let letIn = window.localStorage.getItem("User");
    if (!letIn) {
      setFree(false);
    }
  }, []);

  const slides = [
    {
      title: "Learn Any Math Topic",
      text: " MathImprove helps students learn independently while automatically filling in missing foundations. Instead of sending students back through entire grades,MathImprove provides support exactly when it's needed.",
    },
    {
      title: "Learn Beyond Your Grade Level",
      text: "Curious learners should not be limited by age or grade. Students can explore advanced topics such as algebra, exponents, and functions through a structured pathway designed to build true understanding.",
    },
    {
      title: "Connected Like Puzzle Pieces",
      text: "Every topic connects to what comes before and after it. Students can see how concepts fit together, creating a stronger understanding of mathematics as a whole.",
    },
    {
      title: "Fix Math Gaps Without Losing Progress",
      text: "Small gaps in understanding can grow into major obstacles. MathImprove identifies missing concepts and provides targeted support so students can continue moving forward with confidence.",
    },
    {
      title: "Building Thinkers, Not Just Test Takers",
      text: "Beyond memorization, MathImprove develops reasoning, problem-solving, pattern recognition, and critical thinking skills that help students understand math more deeply and build the confidence they need for long-term success.",
    },
  ];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <main className="mi-wrapper">
      {/* Navigation */}
      <header className="mi-nav">
        <div className="mi-logo">MathImprove</div>

        <a href="/Trial" className="mi-nav-btn">
          {free ? "Start Free Trial" : "Start Learning"}
        </a>
      </header>

      {/* Hero */}
      

      {/* Carousel */}
      <section className="mi-carousel">

        <div className="mi-slide">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={prevSlide} className="mi-arrow">
              ← 
            </button>
            <button onClick={nextSlide} className="mi-arrow" >
            →
          </button>
          </div>
          <h2>{slides[current].title}</h2>
          <p>{slides[current].text}</p>
          
          <div style={{ display: "flex", justifyContent: "center"}}>
            <a href="/Trial" className="mi-primary-btn">
              {free ? "Start Free Trial" : "Start Learning"}
            </a>
            
        </div>
        </div>
      </section>

      {/* Dots */}
      <div className="mi-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`mi-dot ${
              current === index ? "active" : ""
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {/* Final CTA */}
      <section className="mi-cta">
      </section>

      <footer className="mi-footer">
        © 2026 MathImprove.com — Online Math Platform
      </footer>
    </main>
  );
}