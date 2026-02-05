import { useState } from "react";

export default function MAdd() {
  const [page, setPage] = useState(1);
  const maxPage = 9;

  const nextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <button onClick={prevPage} disabled={page === 1}>
        ◀
      </button>

      <span style={{ fontSize: "20px" }}>{page}</span>

      <button onClick={nextPage} disabled={page === maxPage}>
        ▶
      </button>
    </div>
  );
}
