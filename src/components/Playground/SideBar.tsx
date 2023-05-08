"use client";

import { TGetRequestResponse } from "@/types/types";
import { useState } from "react";

// Initialization for ES Users

function SideBar({
  availablePlaygrounds,
  openPlayground,
}: {
  availablePlaygrounds: Array<TGetRequestResponse>;
  openPlayground: (data: TGetRequestResponse) => void;
}) {
  // Initialization for ES Users
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <h1 className="prose">Requests</h1>
      <ul className="w-full p-2 menu bg-base-100 rounded-box">
        {availablePlaygrounds?.map((tab, index) => {
          return (
            <li
              key={index}
              className={activeTab === index ? "bordered" : ""}
              onClick={() => {
                setActiveTab(index);
                openPlayground(tab);
              }}
            >
              <a>{tab.label}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default SideBar;
