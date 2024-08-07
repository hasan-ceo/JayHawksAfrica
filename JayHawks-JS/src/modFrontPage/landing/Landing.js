import React from "react";

export default function Landing() {
  return (
    <section className="text-white bg-black flex justify-center">
      <div className="bg-rose-500 max-w-screen-lg grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <img src="/images/hero.jpeg" alt="" />
        </div>
        <div className="bg-green-300 flex items-center justify-center ">
          <div className="grid">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl">
              Jayhawks Consulting Africa
            </h1>
            <p className="grid grid-cols-1 gap-3">
              <div>Grow Your Businesswith</div>
              <div>Website Coming Soon.......</div>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
