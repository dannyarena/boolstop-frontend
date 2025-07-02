import { createContext } from "react";

const GameContext = createContext();

const GameShopProvider = ({ children }) => {
  return <GameContext.Provider value="">{children}</GameContext.Provider>;
};

const useGame = () => {
  return useContext(GameContext);
};

export { GameShopProvider, useGame };
