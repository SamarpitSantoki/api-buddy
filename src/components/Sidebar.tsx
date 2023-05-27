import { IPlayground } from "@/types/playgroundTypes";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface ISidebarProps {
  playgrounds: IPlayground[];
  activePlaygrounds: IPlayground[];
  openPlayground: (data: any) => void;
}

export default function Sidebar({
  playgrounds,
  openPlayground,
}: ISidebarProps) {
  return (
    <Tabs
      orientation="vertical"
      defaultValue="tab2"
      className="flex h-full"
      onValueChange={(value) => openPlayground(value)}
    >
      <TabsList className="flex flex-col justify-start w-48 h-full rounded-none">
        {playgrounds.map((playground: IPlayground) => (
          <TabsTrigger
            key={playground.id}
            className="w-48"
            value={playground.id.toString()}
          >
            {playground.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
