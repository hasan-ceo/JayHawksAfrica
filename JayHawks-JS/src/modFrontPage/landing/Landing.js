import React from "react";

export default function Landing() {
  return (
    <section className="text-white bg-black flex justify-center p-2 lg:p-5">
      <div className=" max-w-screen-lg grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center p-2">
          <img className="h-64 lg:h-96" src="/images/herologo.jpeg" alt="" />
        </div>
        <div className="flex items-center justify-center p-3 ">
          <div className="grid gap-6 lg:gap-10">
            <p className="text-5xl lg:text-6xl font-bold text-center lg:text-left lg:px-5">
              Jayhawks Consulting Africa
            </p>
            <p className="grid grid-cols-1 gap-3 text-center lg:text-left lg:px-5">
              <div>Grow Your Businesswith</div>
              <div>Website Coming Soon.......</div>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
