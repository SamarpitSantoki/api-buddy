import Playground from "@/components/Playground/Playground";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <Tabs defaultValue="tab2" className="flex w-full bg-accent-foreground">
      <TabsList className="flex flex-col justify-start w-48 h-full border-r bg-accent-foreground border-r-border">
        <TabsTrigger className="w-48" value="tab2">
          Tab 2
        </TabsTrigger>
        <TabsTrigger className="w-48" value="tab3">
          Tab 3
        </TabsTrigger>
        <TabsTrigger className="w-48" value="tab4">
          Tab 4
        </TabsTrigger>
        <TabsTrigger className="w-48" value="tab5">
          Tab 5
        </TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="tab2">
        <Playground />
      </TabsContent>
    </Tabs>
  );
}
