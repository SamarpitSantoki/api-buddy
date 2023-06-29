'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

interface ITabsProps {
  _tabs: {
    id: string;
    title: string;
    component: JSX.Element;
  }[];
  workspaceId: string;
  isCloseable?: boolean;
  onClose?: (
    id: string,
    index: number,
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<string>>
  ) => void;
}

function HTabs({ _tabs, isCloseable, onClose, }: ITabsProps) {
  const [tabs, setTabs] = useState<
    {
      id: string;
      title: string;
      component: JSX.Element;
    }[]
  >([]);

  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id);

  useEffect(() => {
    if (tabs.length === 0) {
      setActiveTab('false');
      return;
    }

    if (activeTab === 'false' && tabs.length > 0) setActiveTab(tabs?.[0]?.id);

    if (activeTab) return;
    setActiveTab(tabs?.[0]?.id);
  }, [tabs]);

  useEffect(() => {
    setTabs(_tabs || []);

    return () => {
      setTabs([]);
    };
  }, [_tabs]);

  if (tabs.length <= 0) return <></>;

  return (
    <Tabs
      defaultValue={tabs?.[0]?.id}
      className="w-full mx-2 overflow-hidden "
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="flex justify-start px-8 overflow-x-scroll overflow-y-hidden custom-scrollbar">
        {tabs?.map((tab, index) => (
          <>
            <TabsTrigger
              className="flex items-center justify-between w-32 mx-2 group"
              key={index}
              value={tab.id}
            >
              <span className="w-5/6 truncate ">{tab.title}</span>

              {isCloseable && (
                <span
                  className="z-10 w-5 h-5 rounded-md group-hover:bg-destructive-foreground group-hover:text-destructive"
                  onClick={() =>
                    onClose!(tab.id, index, activeTab, setActiveTab)
                  }
                >
                  x
                </span>
              )}

              {/* {isCloseable && (
              <Button
                className="ml-2"
                variant="secondary"
                onClick={() => onClose!(tab.id)}
              >
                x
              </Button>
            )} */}
            </TabsTrigger>
            <Separator
              orientation="vertical"
              className="h-6 "
              color="#544754"
            />
          </>
        ))}
      </TabsList>
      {tabs?.map((tab, index) => (
        <TabsContent
          className={`${activeTab === tab.id ? 'block' : 'hidden'} w-full `}
          key={index}
          value={tab.id}
          forceMount
        >
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
export default HTabs;
