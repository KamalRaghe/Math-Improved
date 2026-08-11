import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Home() {
    const router = useRouter();
    const { code } = router.query;

    useEffect(()=>{
      if(code){
        window.localStorage.setItem('Code',code)
      }
    })

return (
    <main className="mi-wrapper">

      {/* Navigation */}
      <header className="mi-nav">
        <div className="mi-logo">MathImprove</div>
        <a href="/Trial" className="mi-nav-btn">
          Start Learning 
        </a>
      </header>

      {/* Hero Section */}
      <section className="mi-hero">
        <h1>
           K–8 Math Learning Platform That Fixes Gaps Instantly
        </h1>

        <p>
          MathImprove is a structured K–8 math platform designed to help
          students move forward step by step. If a student struggles with
          a foundational concept like division while learning algebra,
          the system provides immediate support without forcing them
          to go back an entire grade.
        </p>

        <a href="/Trial" className="mi-primary-btn">
          Start Learning 
        </a>
      </section>

      {/* Section 3 */}
      <section className="mi-section">
        <h2>Structured K–8 Curriculum Connected Like Puzzle Pieces</h2>
        <p>
          It’s designed to support students at every step. 
          They can explore topics beyond their grade level
           and see how concepts connect so when they revisit
          them later, everything fits together into a clear, bigger picture.
        </p>
      </section>

      {/* Section 1 */}
      <section className="mi-section">
        <h2>Fix Foundational Math Gaps Without Falling Behind</h2>
        <p>
          Many students fall behind because small gaps grow over time.
          MathImprove identifies missing foundations instantly and
          repairs them in context so students continue progressing
          without losing confidence.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mi-section">
        <h2>Advanced Students Are Not Limited By Grade Level</h2>
        <p>
          Students who are passionate about math should not be held back.
          A Grade 5 student can explore algebra, exponents , and Calculus 
          early in a structured and understandable way.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mi-section mi-highlight">
        <h2>Building Deeper Thinkers — Not Just Test Takers</h2>
        <p>
          MathImprove helps students develop reasoning skills,
          pattern recognition, and structured thinking.
          Our goal is long-term mathematical confidence 
          not short-term memorization.
        </p>
      </section>

     <a href="/Trial" className="mi-primary-btn">
          Start Learning 
        </a>

      {/* Footer */}
      <footer className="mi-footer">
        © 2026 MathImprove.com —  Online K–8 Math Platform
      </footer>

    </main>
  );
}
