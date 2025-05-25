import { useState } from "react";

export default function Discord() {
  const [username, setUsername] = useState("");
  const [enter,setEnter] = useState(false)

  const handleSubmit = () => {
    window.localStorage.setItem("discord", username);
    if(username){
        setEnter(true)
    }// You can add validation or submission logic here
  };

  return (
    <div className="center" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      {!enter  && <input
        type="text"
        placeholder="Discord username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{marginBottom: "1rem", width: "250px" }}
      />}
      {enter && <img style={{scale:"0.1"}} src={'discord.webp'} ></img>}
      {enter && <div></div>}
      {!enter && <button onClick={handleSubmit}>Enter</button>}
    </div>
  );
}