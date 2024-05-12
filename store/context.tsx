import React, { createContext } from "react";

export const AppContext = createContext({
  numberOfParticipants: 0,
  updateNumberOfParticipants: (adjustment: number) => {},
  amountToSplit: 0,
  updateAmountToSplit: (amount: number) => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [numberOfParticipants, setNumberOfParticipants] =
    React.useState<number>(1);

  const updateNumberOfParticipants = (adjustment: number) => {
    setNumberOfParticipants((prevCount) => prevCount + adjustment);
  };

  const [amountToSplit, setAmountToSplit] = React.useState<number>(0);

  const updateAmountToSplit = (amount: number) => {
    setAmountToSplit(amount);
  };

  const value = {
    numberOfParticipants,
    updateNumberOfParticipants,
    amountToSplit,
    updateAmountToSplit,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppProvider;
