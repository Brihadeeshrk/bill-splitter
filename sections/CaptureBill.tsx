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
import { AppContext, Item } from "@/store/context";
import React, { useContext } from "react";
import { createWorker } from "tesseract.js";

const CaptureBill: React.FC = () => {
  const {
    updateFile,
    selectedFile,
    updateResultString,
    updateItems,
    items,
    updateServiceCharge,
    updateTaxes,
  } = useContext(AppContext);
  const [loading, setLoading] = React.useState(false);

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateFile(file);
    }
  };

  const processImage = async (file: File) => {
    if (!file) return;

    setLoading(true);
    const worker = await createWorker("eng");

    try {
      await worker.load();
      const result = await worker.recognize(file); // https://tesseract.projectnaptha.com/img/eng_bw.png

      updateResultString(result.data.text);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: result.data.text,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const {
            items: { items, serviceCharge, taxes, totalAmount },
          } = data;

          if (serviceCharge) {
            updateServiceCharge(serviceCharge.total);
          }

          if (taxes) {
            const sgst = taxes[0];
            const cgst = taxes[1];

            updateTaxes({ sgst: sgst.amount, cgst: cgst.amount });
          }

          console.log("DATA == ", data);

          updateItems(items as Item[]);
        } else {
          console.log("giberish");
        }
      } else {
        console.error("API call failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      await worker.terminate();
      setLoading(false);
    }
  };

  console.log("ITEMS", items);

  return (
    <div className="mt-5 flex-col rounded-xl bg-[#D6CFFD] p-3">
      <p className="font-bold text-md lg:text-xl text-gray-600">
        take a picture of the bill for auto updation of amount and items bought
      </p>

      <Drawer>
        <DrawerTrigger asChild>
          {loading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              please wait, image is being parsed
            </Button>
          ) : (
            <Button className="mt-5">take picture</Button>
          )}
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                take a picture of the bill to parse details of items purchased,
                subtotal etc
              </DrawerTitle>
            </DrawerHeader>

            <div className="p-4 pb-0">
              <div className="text-7xl font-bold tracking-normal">
                <Input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={onSelectImage}
                />
              </div>
              <p className="font-bold my-4 text-md text-gray-600 hover:underline text-center">
                and if the image parsing gives junk content, you could manually
                enter the bill details too
              </p>
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose>
              {loading ? (
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  please wait, image is being parsed
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

      <p className="font-bold my-4 text-md lg:text-xl text-gray-600 hover:underline">
        or, enter it manually
      </p>

      {/* {resultString && (
        <div>
          <p className="font-bold my-4 text-md lg:text-xl text-gray-600">
            parsed information
          </p>
          <p className="whitespace-pre-line">{resultString}</p>
        </div>
      )} */}
    </div>
  );
};
export default CaptureBill;
