import { useEffect, useState } from "react";

export default function Home() {
  const [free,setFree] = useState(true)
  useEffect(()=> {
    let letIn = window.localStorage.getItem('User')
    if(!letIn){
      setFree(false)
    }
  },[])
return ( 
<main className="mi-wrapper">
  {/* Navigation */}
  <header className="mi-nav">
    <div className="mi-logo">MathImprove</div>
    <a href="/Trial" className="mi-nav-btn">
      {free ? 'Start Free Trial' : 'Start Learning'}
    </a>
  </header>

  {/* Hero Section */}
  <section className="mi-hero">
    <h1>
      Learn Any Math Topic Without Falling Behind 
    </h1>

    <p>
      MathImprove helps students learn independently while
      automatically filling in missing foundations. Instead of
      sending students back through entire grades, MathImprove
      provides support exactly when it's needed.
    </p>

    <a href="/Trial" className="mi-primary-btn">
      {free ? 'Start Free Trial' : 'Start Learning'}
    </a>
  </section>

  {/* Gap Section */}
  <section className="mi-section">
    <h2>Fix Math Gaps Without Losing Progress</h2>
    <p>
      Small gaps in understanding can grow into major obstacles.
      MathImprove identifies missing concepts and provides
      targeted support so students can continue moving forward
      with confidence.
    </p>
  </section>

  {/* Advanced Learning */}
  <section className="mi-section">
    <h2>Students Can Learn Beyond Their Grade Level</h2>
    <p>
      Curious learners should not be limited by age or grade.
      Students can explore advanced topics such as algebra,
      exponents, and functions through a structured pathway
      designed to build true understanding.
    </p>
  </section>

  {/* Curriculum */}
  <section className="mi-section">
    <h2>A Curriculum Connected Like Puzzle Pieces</h2>
    <p>
      Every topic connects to what comes before and after it.
      Students can see how concepts fit together, creating a
      stronger understanding of mathematics as a whole.
    </p>
  </section>

  {/* Thinking Skills */}
  <section className="mi-section mi-highlight">
    <h2>Building Thinkers, Not Just Test Takers</h2>
    <p>
      Beyond memorization, MathImprove develops reasoning,
      problem-solving, pattern recognition, and critical
      thinking skills that support long-term success.
    </p>
  </section>

  {/* Credibility */}
  <section className="mi-section">
    <h2>Created by a Math Tutor</h2>
    <p>
      MathImprove was built from real tutoring experience helping
      students overcome learning gaps, gain confidence, and
      develop a deeper understanding of mathematics.
    </p>
  </section>

  {/* Final CTA */}
  <section className="mi-cta">
    <h2>Ready to Build Math Confidence?</h2>
    <p>
      {free && 'Start your free trial today and discover a smarter way to learn math.'}
    </p>

    <a href="/Trial" className="mi-primary-btn">
      {free ? 'Start Free Trial' : 'Start Learning'}
    </a>
  </section>

  {/* Footer */}
  <footer className="mi-footer">
    © 2026 MathImprove.com — Online Math Platform
  </footer>

</main>


);
}
