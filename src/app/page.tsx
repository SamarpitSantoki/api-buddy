"use client";
import Playground from "@/components/Playground";
import Tabs from "@/components/common/Tabs";
import { CreateRequestType, TGetRequestResponse } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

async function getRequests() {
  const res = await axios.get("/api/request");

  return res.data.data;
}

function Home() {
  const [activePlayground, setActivePlayground] = useState<
    Array<TGetRequestResponse>
  >([]);

  useEffect(() => {
    getRequests().then((data) => {
      setActivePlayground(data);
    });
  }, []);

  return (
    <div className="flex flex-col w-3/4  mx-auto  h-screen m-8 text-white">
      <Tabs
        tabs={activePlayground.map((tab) => {
          return {
            id: tab.label!.split(" ").join("-").toLowerCase(),
            label: tab!.label!,
            content: <Playground data={tab} />,
          };
        })}
      />
    </div>
  );
}
export default Home;
