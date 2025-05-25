import { useState } from "react";

export default function Discord() {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    console.log("Discord Username:", username);
    // You can add validation or submission logic here
  };

  return (
    <div className="center" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <input
        type="text"
        placeholder="Discord username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "250px" }}
      />
      <button onClick={handleSubmit}>Enter</button>
    </div>
  );
}