import React, { ReactElement, Dispatch } from "react";

const GlobalContext = React.createContext({ epoch: "", setEpoch: (epoch: string) => {} });
export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[] | ReactElement | ReactElement[] | JSX.Element | JSX.Element[];
}) {
  const [epoch, setEpoch] = React.useState<string>("");
  return (
    <GlobalContext.Provider value={{epoch, setEpoch}}>
      {children}
    </GlobalContext.Provider>
  );
}
export const useGlobalContext = () => React.useContext(GlobalContext);
