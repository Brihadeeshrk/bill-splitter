import React, { createContext } from "react";

export const AppContext = createContext({
  numberOfParticipants: 0,
  updateNumberOfParticipants: (adjustment: number) => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [numberOfParticipants, setNumberOfParticipants] =
    React.useState<number>(0);

  const updateNumberOfParticipants = (adjustment: number) => {
    setNumberOfParticipants((prevCount) => prevCount + adjustment);
  };

  const value = {
    numberOfParticipants,
    updateNumberOfParticipants,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppProvider;
