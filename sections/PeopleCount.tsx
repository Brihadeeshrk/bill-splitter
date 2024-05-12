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
import { AppContext } from "@/store/context";
import { Minus, Plus } from "lucide-react";
import React, { useContext } from "react";

const PeopleCount: React.FC = () => {
  const { numberOfParticipants, updateNumberOfParticipants } =
    useContext(AppContext);

  return (
    <div className="mt-7 flex-col rounded-xl bg-[#FCEDBA] p-3">
      <p className="font-bold text-md lg:text-xl text-gray-600">
        enter the number of people
      </p>
      <p className="font-bold text-3xl lg:text-4xl">{numberOfParticipants}</p>

      <Drawer>
        <DrawerTrigger asChild>
          <Button className="mt-5">update</Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                Set the number of people you wish to split the bill with
              </DrawerTitle>
            </DrawerHeader>

            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => updateNumberOfParticipants(-1)}
                  disabled={numberOfParticipants <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {numberOfParticipants}
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    people
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => updateNumberOfParticipants(1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
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
export default PeopleCount;
