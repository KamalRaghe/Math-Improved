import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const maxPage = 9;

  const nextPage = () => {
    if (page < maxPage) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div style={{ maxWidth: "320px", margin: "40px auto", textAlign: "center" }}>
      {/* List 1–9 */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Array.from({ length: 9 }, (_, i) => {
          const n = i + 1;
          return (
            <li
              key={n}
              style={{
                padding: "6px",
                fontSize: "30px",
              }}
            >
              {n} + {page} = {n + page}
            </li>
          );
        })}
      </ul>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        <button onClick={prevPage} disabled={page === 1}>
          ◀
        </button>

        <span>{page}</span>

        <button onClick={nextPage} disabled={page === maxPage}>
          ▶
        </button>
      </div>
    </div>
  );
}
