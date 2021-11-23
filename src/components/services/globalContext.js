import React, { createContext, useContext } from "react";

export const context = createContext();

export function ContextProvider({ value, children }) {
  return <context.Provider value={value}>{children}</context.Provider>;
}

export function useGlobalContext() {
  return useContext(context);
}

export default ContextProvider;
