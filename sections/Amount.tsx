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
import { AppContext } from "@/store/context";

import React, { useContext } from "react";

const Amount: React.FC = () => {
  const { amountToSplit, updateAmountToSplit, numberOfParticipants } =
    useContext(AppContext);
  return (
    <div className="mt-5 flex-col rounded-xl bg-[#D6CFFD] p-3">
      <p className="font-bold text-md lg:text-xl text-gray-600">
        take a picture of the bill for auto updation of amount and items bought
      </p>
      {/* <p className="font-bold text-3xl lg:text-4xl">{amountToSplit} INR</p> */}

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
                    <Input type="file" accept="image/*" capture="environment" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full">Submit</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default Amount;
