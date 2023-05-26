import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export default function Sidebar() {
  return (
    <Tabs defaultValue="tab4" className="bg-accent-foreground">
      <TabsList className="grid w-48 grid-cols-1 h-max bg-accent-foreground">
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        <TabsTrigger value="tab4">Tab 4</TabsTrigger>
        <TabsTrigger value="tab5">Tab 5</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
