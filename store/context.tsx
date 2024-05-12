import React, { createContext } from "react";

interface AppContextType {
  numberOfParticipants: number;
  updateNumberOfParticipants: (adjustment: number) => void;
  selectedFile: File | undefined;
  updateFile: (file: File) => void;
  resultString: string;
  updateResultString: (text: string) => void;
}

export const AppContext = createContext<AppContextType>({
  numberOfParticipants: 0,
  updateNumberOfParticipants: (adjustment: number) => {},
  selectedFile: undefined,
  updateFile: (file: File) => {},
  resultString: "",
  updateResultString: (text: string) => {},
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

  const value: AppContextType = {
    numberOfParticipants,
    updateNumberOfParticipants,
    selectedFile,
    updateFile,
    resultString,
    updateResultString,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppProvider;
