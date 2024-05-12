"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { AppContext } from "@/store/context";
import React, { useContext } from "react";
import { createWorker } from "tesseract.js";

const CaptureBill: React.FC = () => {
  const {
    numberOfParticipants,
    updateFile,
    selectedFile,
    updateResultString,
    resultString,
  } = useContext(AppContext);
  const [loading, setLoading] = React.useState(false);

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateFile(file);
    }
  };

  const processImage = async (file: File) => {
    setLoading(true);
    const worker = await createWorker("eng");

    try {
      await worker.load();
      const result = await worker.recognize(file); // https://tesseract.projectnaptha.com/img/eng_bw.png
      console.log(result.data.text);
      updateResultString(result.data.text);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      await worker.terminate();
      setLoading(false);
    }
  };

  console.log("RS", resultString);

  return (
    <div className="mt-5 flex-col rounded-xl bg-[#D6CFFD] p-3">
      <p className="font-bold text-md lg:text-xl text-gray-600">
        take a picture of the bill for auto updation of amount and items bought
      </p>

      <Drawer>
        <DrawerTrigger asChild>
          <Button className="mt-5">take picture</Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                Set the amount you wish to split amongst {numberOfParticipants}{" "}
                people
              </DrawerTitle>
            </DrawerHeader>

            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex-1 text-center">
                  <div className="grid w-full max-w-sm items-center gap-1.5"></div>
                  <div className="text-7xl font-bold tracking-normal">
                    <Input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={onSelectImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose>
              {loading ? (
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => processImage(selectedFile as File)}
                >
                  Submit
                </Button>
              )}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {resultString && (
        <div>
          <p className="font-bold my-4 text-md lg:text-xl text-gray-600">
            parsed information
          </p>
          <p className="whitespace-pre-line">{resultString}</p>
        </div>
      )}
    </div>
  );
};
export default CaptureBill;
