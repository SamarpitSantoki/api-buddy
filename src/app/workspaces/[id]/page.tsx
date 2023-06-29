'use client';

import Playground from '@/components/Playground/Playground';
import Sidebar from '@/components/Sidebar';
import HTabs from '@/components/HTabs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addActivePlayground,
  addActivePlaygrounds,
  createPlayground,
  getPlaygrounds,
  playgroundSliceState,
  removeActivePlayground,
  closeAllActive,
} from '@/store/playgroundSlice';
import { IPlayground } from '@/types/playgroundTypes';
import { Dispatch, SetStateAction, useEffect } from 'react';
import CommandMenu from '@/components/CommandMenu';
import { ArrowLeft, PlusSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

const _commands = [
  {
    id: 'create-new-api',
    label: 'Create New Api',
    icon: <PlusSquare />,
  },
  {
    id: 'goto-workspaces',
    label: 'Goto Workspaces',
    icon: <ArrowLeft />,
  },
];

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const router = useRouter();

  const workspaceId = params.id;

  const { activePlaygrounds, playgrounds } =
    useAppSelector(playgroundSliceState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPlaygrounds(workspaceId));
  }, []);

  // opens playground from sidebar
  const openPlayground = (data: string) => {
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

  // closes playgorund from tabs
  const closePlayground = async (
    id: string,
    index: number,
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<string>>
  ) => {
    dispatch(removeActivePlayground(id));

    dispatch(getPlaygrounds(workspaceId));

    if (activePlaygrounds.length - 1 === 0) return;

    if (activeTab === id) {
      if (index === 0) {
        setActiveTab(activePlaygrounds[1].id?.toString() || '-1');
      } else {
        setActiveTab(activePlaygrounds[index - 1].id?.toString() || '-1');
      }
    }

    // dispatch(addActivePlayground(data));
  };

  // creates a new request locally
  const createNewPlayground = () => {
    const payload = {
      id: -activePlaygrounds.length - 1,
      workspaceId: workspaceId,
      title: 'New Request',
      request: {
        url: '',
        method: 'GET',
        headers: [],
        body: '',
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

  // handle commands of CommandMenu
  const handleCommand = (command: string) => {
    switch (command) {
      case 'create-new-api':
        createNewPlayground();
        break;
      case 'goto-workspaces':
        router.push('/workspaces');
      default:
        break;
    }
  };

  useEffect(() => {
    return () => {
      dispatch(closeAllActive());
    };
  }, []);

  return (
    <div className="flex w-full min-h-full">
      <Sidebar
        playgrounds={playgrounds}
        openPlayground={openPlayground}
        createNewPlayground={createNewPlayground}
      />
      <HTabs
        _tabs={activePlaygrounds.map((playground: IPlayground, index) => ({
          id: playground?.id?.toString() || index.toString(),
          title: playground?.title,
          component: <Playground data={playground} workspaceId={workspaceId} />,
        }))}
        isCloseable
        onClose={closePlayground}
        workspaceId={workspaceId}
      />

      <CommandMenu commands={_commands} handleCommand={handleCommand} />
    </div>
  );
}
