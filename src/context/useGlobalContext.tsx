import { createContext, useContext } from "react";
import RoutesStore from "../store/routes.store";

const globalStore = {
  routesStore: RoutesStore,
};

const GlobalContext = createContext(globalStore);

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export const GloblaContextProvider = ({ children }: any) => {
  return (
    <GlobalContext.Provider value={globalStore}>
      {children}
    </GlobalContext.Provider>
  );
};
