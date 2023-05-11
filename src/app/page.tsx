"use client";
import Playground from "@/components/Playground";
import SideBar from "@/components/Playground/SideBar";
import Button from "@/components/common/Button";
import Tabs from "@/components/common/Tabs";
import {
  addActivePlayground,
  addActivePlaygrounds,
  addPlaygrounds,
  playgroundSliceState,
  removeActivePlayground,
} from "@/redux/features/playground/playgroundSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CreateRequestType,
  IPlayground,
  TGetRequestResponse,
} from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

async function getRequests() {
  const res = await axios.get("/api/request");

  return res.data.data;
}

function Home() {
  const { activePlaygrounds, currentPlayground, playgrounds } =
    useAppSelector(playgroundSliceState);

  const dispatch = useAppDispatch();

  // const [availablePlaygrounds, setAvailablePlaygrounds] = useState<
  //   Array<TGetRequestResponse>
  // >([]);
  // const [activePlayground, setActivePlayground] = useState<
  //   Array<TGetRequestResponse>
  // >([]);

  useEffect(() => {
    getRequests().then((data) => {
      dispatch(addPlaygrounds(data));
    });
  }, []);

  const openPlayground = (data: IPlayground) => {
    // if (activePlayground.find((tab) => tab.id === data.id)) return;

    if (activePlaygrounds.find((tab) => tab.id === data.id)) return;

    if (activePlaygrounds.length === 0) {
      dispatch(addActivePlaygrounds([data]));
      return;
    }

    dispatch(addActivePlayground(data));
  };

  const closePlayground = async (id: number) => {
    // setActivePlayground(activePlayground.filter((_, i) => i !== index));

    // // click on the
    // getRequests().then((data) => {
    //   setAvailablePlaygrounds(data);
    // });

    dispatch(removeActivePlayground(id));

    getRequests().then((data) => {
      dispatch(addPlaygrounds(data));
    });

    // dispatch(addActivePlayground(data));
  };

  return (
    <div className="flex">
      <div className="flex items-start justify-center w-1/6 p-4">
        <SideBar
          availablePlaygrounds={playgrounds}
          openPlayground={openPlayground}
        />
      </div>
      <div className="flex flex-col w-5/6 h-screen m-8 mx-auto text-white">
        <Tabs
          isCloseable
          className="tab-lg"
          closePlayground={closePlayground}
          tabs={activePlaygrounds.map((tab) => {
            return {
              id: tab.id,
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
