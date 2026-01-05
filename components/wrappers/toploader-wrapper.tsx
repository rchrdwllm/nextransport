"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { ReactNode } from "react";

const TopLoaderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ProgressProvider
      options={{
        showSpinner: false,
      }}
      color="var(--primary)"
    >
      {children}
    </ProgressProvider>
  );
};

export default TopLoaderWrapper;
