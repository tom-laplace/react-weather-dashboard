import { Provider } from "jotai/react";
import React from "react";

interface JotaiProviderProps {
  children: React.ReactNode;
}

export function JotaiProvider({ children }: JotaiProviderProps) {
  return <Provider>{children}</Provider>;
}