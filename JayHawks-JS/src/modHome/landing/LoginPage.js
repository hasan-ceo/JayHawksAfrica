import React from "react";
import Signin from "./Signin";

export default function LoginPage() {
  return (
    <div className="max-w-full px-2 sm:px-8 lg:px-[120px] grid grid-cols-1 md:grid-cols-2">
      <div className="text-white grid">
        <Signin />
        <div className="grid place-content-center mt-2"></div>
      </div>
    </div>
  );
}
