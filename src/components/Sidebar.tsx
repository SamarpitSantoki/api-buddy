import { IPlayground } from "@/types/playgroundTypes";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { TypographyH4, TypographyLead, TypographyP } from "./ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface ISidebarProps {
  playgrounds: IPlayground[];
  openPlayground: (id: string) => void;
  createNewPlayground: () => void;
}

export default function Sidebar({
  playgrounds,
  openPlayground,
  createNewPlayground,
}: ISidebarProps) {
  return (
    <div className="flex h-full px-2">
      <div className="flex flex-col justify-start w-48 h-full rounded-none">
        <Button className="w-full" onClick={() => createNewPlayground()}>
          Add API
        </Button>

        <TypographyP>Requests</TypographyP>
        {/* divider */}
        <span className="w-full h-px my-2 bg-gray-300"></span>

        {playgrounds.map((playground: IPlayground) => (
          <div
            key={playground.id || -1}
            className="justify-start w-48"
            // value={playground.id?.toString() || "-1"}
          >
            <Accordion
              title={playground.title}
              className="w-full"
              type="multiple"
            >
              <AccordionItem
                value={playground.id?.toString() || "-1"}
                className="border-none"
              >
                <div className="flex justify-between hover:cursor-pointer"
                  onClick={() => openPlayground(playground.id)}
                >
                  <TypographyP>{playground.title}</TypographyP>
                  {
                    playground.request.hasExamples &&
                  <AccordionTrigger className="p-0"></AccordionTrigger>
                  }

                </div>
                <AccordionContent className="text-left pl-2 m-0">
                  <TypographyP>Requests</TypographyP>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
