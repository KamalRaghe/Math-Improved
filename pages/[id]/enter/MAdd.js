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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        fontSize: "24px",
      }}
    >
      {/* Math tied to page number */}
      <div>
        {page} + 1 = {page + 1}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "12px" }}>
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
