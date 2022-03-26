import { createContext, FC } from "react";

interface RideContextInterface {}

const RideContext = createContext<RideContextInterface | null>(null);

const RideContextProvider: FC = ({ children }) => {
  return <RideContext.Provider value={{}}>{children}</RideContext.Provider>;
};

export { RideContext, RideContextProvider };
export type { RideContextInterface };
