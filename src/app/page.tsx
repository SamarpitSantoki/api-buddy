"use client";
import Playground from "@/components/Playground/Playground";
import Sidebar from "@/components/Sidebar";
import HTabs from "@/components/HTabs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addActivePlayground,
  addActivePlaygrounds,
  addPlaygrounds,
  getPlaygrounds,
  playgroundSliceState,
  removeActivePlayground,
} from "@/redux/playgroundSlice";
import { IPlayground } from "@/types/playgroundTypes";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
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
    dispatch(getPlaygrounds());
  }, []);

  const openPlayground = (data: string) => {
    // if (activePlayground.find((tab) => tab.id === data.id)) return;

    if (activePlaygrounds.find((tab: IPlayground) => tab.id === parseInt(data)))
      return;

    if (activePlaygrounds.length === 0) {
      dispatch(
        addActivePlaygrounds([
          playgrounds.find((tab: IPlayground) => tab.id === parseInt(data))!,
        ])
      );
      return;
    }

    dispatch(
      addActivePlayground(
        playgrounds.find((tab: IPlayground) => tab.id === parseInt(data))!
      )
    );
  };

  const closePlayground = async (id: string) => {
    // setActivePlayground(activePlayground.filter((_, i) => i !== index));

    // // click on the
    // getRequests().then((data) => {
    //   setAvailablePlaygrounds(data);
    // });

    dispatch(removeActivePlayground(id));

    dispatch(getPlaygrounds());

    // dispatch(addActivePlayground(data));
  };

  async function getRequests() {
    const res = await axios.get("/api/request");

    return res.data.data;
  }

  return (
    <div className="flex w-full min-h-full">
      <Sidebar
        playgrounds={playgrounds}
        activePlaygrounds={activePlaygrounds}
        openPlayground={openPlayground}
      />
      <HTabs
        tabs={activePlaygrounds.map((playground) => ({
          id: playground.id.toString(),
          title: playground.title,
          component: <Playground data={playground} />,
        }))}
        isCloseable
        onClose={closePlayground}
      />
    </div>
  );
}
