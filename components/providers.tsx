"use client";

import AppProvider from "@/store/context";
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AppProvider>
      <main className="w-[80%] lg:w-[50%] mx-auto my-10">{children}</main>
    </AppProvider>
  );
};
export default Providers;
