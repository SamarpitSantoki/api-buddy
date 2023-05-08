"use client";
import Playground from "@/components/Playground";
import SideBar from "@/components/Playground/SideBar";
import Button from "@/components/common/Button";
import Tabs from "@/components/common/Tabs";
import { CreateRequestType, TGetRequestResponse } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

async function getRequests() {
  const res = await axios.get("/api/request");

  return res.data.data;
}

function Home() {
  const [availablePlaygrounds, setAvailablePlaygrounds] = useState<
    Array<TGetRequestResponse>
  >([]);
  const [activePlayground, setActivePlayground] = useState<
    Array<TGetRequestResponse>
  >([]);

  useEffect(() => {
    getRequests().then((data) => {
      setAvailablePlaygrounds(data);
    });
  }, []);

  const openPlayground = (data: TGetRequestResponse) => {
    if (activePlayground.find((tab) => tab.id === data.id)) return;
    if (activePlayground.length === 0) {
      setActivePlayground([data]);
      return;
    }
    setActivePlayground([...activePlayground, data]);
  };

  const closePlayground = (index: number) => {
    setActivePlayground(activePlayground.filter((_, i) => i !== index));
  };

  return (
    <div className="flex">
      <div className="flex items-start justify-center w-1/6 p-4">
        <SideBar
          availablePlaygrounds={availablePlaygrounds}
          openPlayground={openPlayground}
        />
      </div>
      <div className="flex flex-col w-5/6 h-screen m-8 mx-auto text-white">
        <Tabs
          isCloseable
          className="tab-lg"
          closePlayground={closePlayground}
          tabs={activePlayground.map((tab) => {
            return {
              id: tab.label!.split(" ").join("-").toLowerCase(),
              label: tab!.label!,
              content: <Playground data={tab} />,
            };
          })}
        />
      </div>
    </div>
  );
}
export default Home;
