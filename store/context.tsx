import React, { createContext } from "react";

export interface Item {
  itemName: string;
  quantity: number;
  rate: number;
  total: number;
}

interface AppContextType {
  numberOfParticipants: number;
  updateNumberOfParticipants: (adjustment: number) => void;
  selectedFile: File | undefined;
  updateFile: (file: File) => void;
  resultString: string;
  updateResultString: (text: string) => void;
  items: Item[];
  updateItems: (items: Item[]) => void;
  serviceCharge: number | 0;
  updateServiceCharge: (charge: number) => void;
  taxes: { cgst: number; sgst: number } | 0;
  updateTaxes: (taxes: { cgst: number; sgst: number }) => void;
}

export const AppContext = createContext<AppContextType>({
  numberOfParticipants: 0,
  updateNumberOfParticipants: (adjustment: number) => {},
  selectedFile: undefined,
  updateFile: (file: File) => {},
  resultString: "",
  updateResultString: (text: string) => {},
  items: [],
  updateItems: (items: Item[]) => {},
  serviceCharge: 0,
  updateServiceCharge: (charge: number) => {},
  taxes: { cgst: 0, sgst: 0 },
  updateTaxes: (taxes: { cgst: number; sgst: number }) => {},
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [numberOfParticipants, setNumberOfParticipants] =
    React.useState<number>(1);

  const updateNumberOfParticipants = (adjustment: number) => {
    setNumberOfParticipants((prevCount) => prevCount + adjustment);
  };

  const [selectedFile, setSelectedFile] = React.useState<File | undefined>();

  const updateFile = (file: File) => {
    setSelectedFile(file);
  };

  const [resultString, setResultString] = React.useState<string>("");

  const updateResultString = (text: string) => {
    setResultString(text);
  };

  const [items, setItems] = React.useState<Item[]>([]);

  const updateItems = (items: Item[]) => {
    setItems(items);
  };

  const [serviceCharge, setServiceCharge] = React.useState<number>(0);

  const updateServiceCharge = (charge: number) => {
    setServiceCharge(charge);
  };

  const [taxes, setTaxes] = React.useState<{ cgst: number; sgst: number }>({
    cgst: 0,
    sgst: 0,
  });

  const updateTaxes = (taxes: { cgst: number; sgst: number }) => {
    setTaxes(taxes);
  };

  const value: AppContextType = {
    numberOfParticipants,
    updateNumberOfParticipants,
    selectedFile,
    updateFile,
    resultString,
    updateResultString,
    items,
    updateItems,
    serviceCharge,
    updateServiceCharge,
    taxes,
    updateTaxes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppProvider;
