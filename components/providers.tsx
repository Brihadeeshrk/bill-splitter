"use client";

import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <main className="w-[80%] lg:w-[50%] mx-auto">{children}</main>;
};
export default Providers;
