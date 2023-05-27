import { ReactNode } from "react";
import Playground from "./Playground/Playground";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ITabsProps {
  tabs: {
    name: string;
    component: JSX.Element;
  }[];
}

function HTabs({ tabs }: ITabsProps) {
  return (
    <Tabs
      defaultValue={tabs[0].name.toLowerCase()}
      className="w-full min-h-full bg-accent-foreground"
    >
      <TabsList className="flex justify-start bg-accent-foreground ">
        {tabs.map((tab, index) => (
          <TabsTrigger
            className="w-32"
            key={index}
            value={tab.name.toLowerCase()}
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent
          className="w-full bg-accent-foreground"
          key={index}
          value={tab.name.toLowerCase()}
        >
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
export default HTabs;
