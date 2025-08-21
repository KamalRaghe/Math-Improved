"use client";


import React from "react";

export default function FlyingSky() {
return (
<div className="sky">
{/* Parallax cloud layers (back to front) */}
<div className="clouds layer-1" />
<div className="clouds layer-2" />
<div className="clouds layer-3" />


{/* Subtle camera tilt to enhance the flying sensation */}
<div className="tilt" />


<main className="content">
<div className="card">
<h1>Flying Through the Clouds ☁️</h1>
<p>Your UI goes here.</p>
</div>
</main>
</div>
);
}