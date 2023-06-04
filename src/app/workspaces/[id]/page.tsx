"use client";

import Playground from "@/components/Playground/Playground";
import Sidebar from "@/components/Sidebar";
import HTabs from "@/components/HTabs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addActivePlayground,
  addActivePlaygrounds,
  addPlaygrounds,
  createPlayground,
  getPlaygrounds,
  playgroundSliceState,
  removeActivePlayground,
} from "@/redux/playgroundSlice";
import { IPlayground } from "@/types/playgroundTypes";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {

  const workspaceId = params.id;

  const { activePlaygrounds, currentPlayground, playgrounds } =
    useAppSelector(playgroundSliceState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPlaygrounds(parseInt(workspaceId)));
  }, []);

  const openPlayground = (data: string) => {
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

  const closePlayground = async (
    id: string,
    index: number,
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<string>>
  ) => {
    dispatch(removeActivePlayground(id));

    dispatch(getPlaygrounds(parseInt(workspaceId)));

    if (activePlaygrounds.length - 1 === 0) return;

    if (activeTab === id) {
      if (index === 0) {
        setActiveTab(activePlaygrounds[1].id?.toString() || "-1");
      } else {
        setActiveTab(activePlaygrounds[index - 1].id?.toString() || "-1");
      }
    }

    // dispatch(addActivePlayground(data));
  };

  const createNewPlayground = () => {
    const payload = {
      workspaceId: workspaceId,
      title: "New Request",
      request: {
        url: "",
        method: "GET",
        headers: [],
        body: "",
        params: [],
      },
      response: null,
      playgroundState: {
        isEdited: true,
        isSaved: false,
        isSaving: false,
        isSending: false,
      },
    };

    dispatch(createPlayground(payload));
  };

  return (
    <div className="flex w-full min-h-full">
      <Sidebar
        playgrounds={playgrounds}
        activePlaygrounds={activePlaygrounds}
        openPlayground={openPlayground}
        createNewPlayground={createNewPlayground}
      />
      <HTabs
        tabs={activePlaygrounds.map((playground: IPlayground,index) => ({
          id: playground?.id?.toString() || index.toString(),
          title: playground?.title,
          component: <Playground data={playground} workspaceId={parseInt(workspaceId)} />,
        }))}
        isCloseable
        onClose={closePlayground}
      />
    </div>
  );
}
