"use client";
import { useEffect, useState } from "react";

type TabsProps = {
  tabs: Array<{ id: number | string; label: string; content: JSX.Element }>;
  closePlayground?: (id: number) => void;
  className?: string;
  isCloseable?: boolean;
};

function Tabs(props: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (props.tabs.length > 0) {
      setActiveTab((prev) => {
        if (prev > props.tabs.length - 1) {
          return props.tabs.length - 1;
        }
        return prev;
      });
    }
  }, [props.tabs.length]);

  return (
    <>
      {/* <ul
        className="flex flex-row flex-wrap pl-0 mb-5 list-none border-b-0"
        role="tablist"
        data-te-nav-ref
        defaultChecked={true}
      >
        {props.tabs.map((tab, index) => (
          <li role="presentation" key={index}>
            <a
              href={`#tabs-${tab.id}`}
              className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
              data-te-toggle="pill"
              data-te-target={`#tabs-${tab.id}`}
              role="tab"
              aria-controls={`tabs-${tab.id}`}
              // conditially add active class
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul> */}

      <div className={"z-10 w-full tabs "}>
        {props.tabs.map((tab, index) => (
          <a
            key={index}
            data-active-tabs-id={`tab-${tab.label}`}
            className={
              "group tab  tab-lifted flex gap-x-1 " +
              props.className +
              (index === activeTab ? " tab-active" : "")
            }
            onClick={() => setActiveTab(index)}
          >
            <div>{tab.label}</div>
            {props.isCloseable && (
              <button
                onClick={() => {
                  console.log("close playground", index);
                  props?.closePlayground?.(tab.id as number);
                }}
                className={
                  "z-40  stroke-current group-hover:block group-hover:stroke-red-500" +
                  (index === activeTab ? " block" : " hidden")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </a>
        ))}
      </div>

      <div className="w-full h-auto mb-6">
        {props.tabs.map((tab, index) => (
          <div
            key={index}
            className={
              index === activeTab
                ? ""
                : "hidden" +
                  " opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            }
          >
            {tab.content}
          </div>
        ))}
      </div>
    </>
  );
}
export default Tabs;
