export default function Home() {
  return (
    <main className="mi-wrapper">

      {/* Navigation */}
      <header className="mi-nav">
        <div className="mi-logo">MathImprove</div>
        <a href="/Trial" className="mi-nav-btn">
          Start Learning Free
        </a>
      </header>

      {/* Hero Section */}
      <section className="mi-hero">
        <h1>
          Free K–8 Math Learning Platform That Fixes Gaps Instantly
        </h1>

        <p>
          MathImprove is a structured K–8 math platform designed to help
          students move forward step by step. If a student struggles with
          a foundational concept like division while learning algebra,
          the system provides immediate support — without forcing them
          to go back an entire grade.
        </p>

        <a href="/Trial" className="mi-primary-btn">
          Start Learning Free
        </a>

        <div className="mi-free-note">
          100% Free Until June 2026
        </div>
      </section>

      {/* Section 1 */}
      <section className="mi-section">
        <h2>Fix Foundational Math Gaps Without Falling Behind</h2>
        <p>
          Many students fall behind because small gaps grow over time.
          MathImprove identifies missing foundations instantly and
          repairs them in context — so students continue progressing
          without losing confidence.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mi-section">
        <h2>Advanced Students Are Not Limited By Grade Level</h2>
        <p>
          Students who are passionate about math should not be held back.
          A Grade 5 student can explore algebra, patterns, and functions
          early in a structured and understandable way.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mi-section">
        <h2>Structured K–8 Curriculum Connected Like Puzzle Pieces</h2>
        <p>
          Math topics are connected logically. Fractions connect to ratios.
          Ratios connect to algebra. Algebra connects to functions.
          Students understand how ideas build together instead of
          memorizing isolated procedures.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mi-section mi-highlight">
        <h2>Building Deeper Thinkers — Not Just Test Takers</h2>
        <p>
          MathImprove helps students develop reasoning skills,
          pattern recognition, and structured thinking.
          Our goal is long-term mathematical confidence —
          not short-term memorization.
        </p>
      </section>

      {/* Footer */}
      <footer className="mi-footer">
        © 2026 MathImprove.com — Free Online K–8 Math Platform
      </footer>

    </main>
  );
}
