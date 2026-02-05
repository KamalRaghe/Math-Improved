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
    <div style={{ maxWidth: "300px", margin: "40px auto", textAlign: "center" }}>
      {/* List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Array.from({ length: maxPage }, (_, i) => {
          const n = i + 1;
          const isActive = n === page;

          return (
            <li
              key={n}
              style={{
                padding: "8px",
                marginBottom: "4px",
                fontSize: "20px",
                background: isActive ? "#dbeafe" : "#f3f4f6",
                fontWeight: isActive ? "bold" : "normal",
                borderRadius: "6px",
              }}
            >
              {n} + 1 = {n + 1}
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
