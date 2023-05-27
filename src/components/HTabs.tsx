"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";

interface ITabsProps {
  tabs: {
    id: string;
    title: string;
    component: JSX.Element;
  }[];
  isCloseable?: boolean;
  onClose?: (id: string) => void;
}

function HTabs({ tabs, isCloseable, onClose }: ITabsProps) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id);

  return (
    <Tabs
      defaultValue={tabs?.[0]?.id}
      className="w-full mx-2"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="flex justify-start px-8 ">
        {tabs.map((tab, index) => (
          <>
            <TabsTrigger
              className="flex justify-between w-32 mx-2 group"
              key={index}
              value={tab.id}
            >
              {tab.title}

              {isCloseable && (
                <span
                  className="group-hover:text-destructive"
                  onClick={() => onClose!(tab.id)}
                >
                  x
                </span>
              )}

              {/* {isCloseable && (
              <Button
                className="ml-2"
                variant="secondary"
                onClick={() => onClose!(tab.id)}
              >
                x
              </Button>
            )} */}
            </TabsTrigger>
            <Separator
              orientation="vertical"
              className="h-6 "
              color="#544754"
            />
          </>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent
          className={`${activeTab === tab.id ? "block" : "hidden"} w-full `}
          key={index}
          value={tab.id}
          forceMount
        >
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
export default HTabs;
