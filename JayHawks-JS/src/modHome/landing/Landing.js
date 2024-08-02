import React from "react";

export default function Landing() {
  return (
    // <div className="overflow-y-off">
    <section className="text-gray-900 no-scrollbar">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src="/images/hero1.jpg"
            alt=""
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl text-white font-bold leading-none sm:text-6xl">
            Jayhawks Consulting Africa
          </h1>
          <p className="mt-6 mb-8  text-white text-lg sm:mb-12">
            Grow Your Businesswith
            {/* <br className="hidden md:inline lg:hidden" /> */}
            <br />
            Website Coming Soon.......
          </p>
        </div>
      </div>
    </section>
    // </div>
  );
}
