"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type IntroState = {
  ready: boolean;
  complete: () => void;
};

const IntroContext = createContext<IntroState>({ ready: true, complete: () => {} });

export const useIntro = () => useContext(IntroContext);

export const IntroProvider = ({ children }: { children: ReactNode }) => {
  const [ready, setReady] = useState(false);
  const complete = useCallback(() => setReady(true), []);
  const value = useMemo(() => ({ ready, complete }), [ready, complete]);

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
};
