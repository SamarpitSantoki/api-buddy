"use client";
import { useEffect } from "react";
import { Tab, initTE } from "tw-elements";

type TabsProps = {
  tabs: Array<{ id: string; label: string; content: JSX.Element }>;
};

function Tabs(props: TabsProps) {
  useEffect(() => {
    initTE({ Tab });
  }, []);

  return (
    <>
      <ul
        className="flex flex-row flex-wrap pl-0 mb-5 list-none border-b-0"
        role="tablist"
        data-te-nav-ref
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
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mb-6">
        {props.tabs.map((tab, index) => (
          <div
            key={index}
            className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id={`tabs-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tabs-${tab.id}-tab`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </>
  );
}
export default Tabs;
