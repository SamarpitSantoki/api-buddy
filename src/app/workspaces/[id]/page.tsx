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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Calculator,
  Calendar,
  CreditCard,
  PlusSquare,
  Settings,
  Smile,
  User,
} from "lucide-react";

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

  const openPlayground = (data: number) => {
    if (activePlaygrounds.find((tab: IPlayground) => tab.id === data)) return;

    if (activePlaygrounds.length === 0) {
      dispatch(
        addActivePlaygrounds([
          playgrounds.find((tab: IPlayground) => tab.id === data)!,
        ])
      );
      return;
    }

    dispatch(
      addActivePlayground(
        playgrounds.find((tab: IPlayground) => tab.id === data)!
      )
    );
  };

  const closePlayground = async (
    id: string,
    index: number,
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<string>>
  ) => {
    console.log("🚀 ~ file: page.tsx ~ line 72 ~ closePlayground ~ id", id);

    dispatch(removeActivePlayground(parseInt(id)));

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
      id: -activePlaygrounds.length - 1,
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

  const [open, setOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      
      if (e.key === "J" || (e.key === " " && e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
        setSelectedCommand("");
      }

      if (e.key === "Escape") {
        setOpen(false); 
      }

      // if (e.key === "Enter") {
      //   handleCommand(selectedCommand);
      // }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleCommand = (command: string) => {
    console.log("command", command);

    switch (command) {
      case "create-new-api":
        createNewPlayground();
        break;
      default:
        break;
    }
    setSelectedCommand("");
    setOpen(false);
  };

  return (
    <div className="flex w-full min-h-full">
      <Sidebar
        playgrounds={playgrounds}
        openPlayground={openPlayground}
        createNewPlayground={createNewPlayground}
      />
      <HTabs
        tabs={activePlaygrounds.map((playground: IPlayground, index) => ({
          id: playground?.id?.toString() || index.toString(),
          title: playground?.title,
          component: (
            <Playground data={playground} workspaceId={parseInt(workspaceId)} />
          ),
        }))}
        isCloseable
        onClose={closePlayground}
      />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={selectedCommand}
          onValueChange={(value) => {
            setSelectedCommand(value);
          }}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              value="create-new-api"
              onSelect={(command) => {
                console.log("selected", command);
                handleCommand(command);
              }}
            >
              <PlusSquare className="mr-2 h-4 w-4" />
              <span>Create New Api</span>
            </CommandItem>
            {/* <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem> */}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="More Commands Comming Soon">
            {/* <CommandItem
              onSelect={() => {
                console.log("selected");
              }}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem> */}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
