import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Sky background (always rendered) */}
      <div className="sky">
        <div className="clouds layer-1" />
        <div className="clouds layer-2" />
        <div className="clouds layer-3" />
        <div className="tilt" />
      </div>

      {/* Page content */}
      <main className="content">
        <Component {...pageProps} />
      </main>
    </>
  );
}
