import { IPlayground } from "@/types/playgroundTypes";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { TypographyH4, TypographyLead, TypographyP } from "./ui/typography";

interface ISidebarProps {
  playgrounds: IPlayground[];
  activePlaygrounds: IPlayground[];
  openPlayground: (data: any) => void;
  createNewPlayground: () => void;
}

export default function Sidebar({
  playgrounds,
  openPlayground,
  createNewPlayground,
}: ISidebarProps) {
  return (
    <Tabs
      orientation="vertical"
      defaultValue="tab2"
      className="flex h-full"
      onValueChange={(value: string) => openPlayground(value)}
    >
      <TabsList className="flex flex-col justify-start w-48 h-full rounded-none">
        <Button className="w-full" onClick={() => createNewPlayground()}>
          Add API
        </Button>

        <TypographyP>
          Requests
        </TypographyP>
{/* divider */}
        <span
          className="w-full h-px my-2 bg-gray-300"
        ></span>

        
        {playgrounds.map((playground: IPlayground) => (
          <TabsTrigger
            key={playground.id || -1}
            className="justify-start w-48"
            value={playground.id?.toString() || "-1"}
          >
            {playground.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
