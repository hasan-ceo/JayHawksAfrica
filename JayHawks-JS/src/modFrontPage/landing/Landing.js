import React from "react";

export default function Landing() {
  return (
    <section className="text-white h-100 bg-black flex justify-center">
      <div className=" max-w-screen-lg grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center p-2">
          <img className="h-80" src="/images/hero.jpeg" alt="" />
        </div>
        <div className="flex items-center justify-center p-3 ">
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
