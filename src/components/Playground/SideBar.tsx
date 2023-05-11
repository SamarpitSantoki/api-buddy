"use client";

import {
  addPlaygrounds,
  getPlaygrounds,
} from "@/redux/features/playground/playgroundSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IPlayground } from "@/types/types";
import axios from "axios";
import { FormEvent, useState } from "react";

// Initialization for ES Users

function SideBar({
  availablePlaygrounds,
  openPlayground,
}: {
  availablePlaygrounds: Array<IPlayground>;
  openPlayground: (data: IPlayground) => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useAppDispatch();

  const [addRequestParams, setAddRequestParams] = useState<{
    title: string;
    requestUrl: string;
  }>({
    title: "",
    requestUrl: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);

    try {
      const res = await axios.post("/api/request", addRequestParams);

      if (res.data.status) {
        dispatch(getPlaygrounds());
        document.getElementById("add-request-modal")?.click();
        return;
      }
      alert("Error Saving");
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <h1 className="prose">Requests</h1>
        <label
          className="prose cursor-pointer hover:underline "
          data-tip="Add a new request"
          htmlFor="add-request-modal"
        >
          Add
        </label>
      </div>
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
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="add-request-modal" className="modal-toggle" />
      <label htmlFor="add-request-modal" className="cursor-pointer modal">
        <label className="relative modal-box" htmlFor="">
          <h3 className="text-lg font-bold">Add a new request</h3>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xs form-control"
          >
            <label className="label">
              <span className="label-text">Request Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full max-w-xs input input-bordered"
              value={addRequestParams.title}
              onChange={(e) =>
                setAddRequestParams({
                  ...addRequestParams,
                  title: e.target.value,
                })
              }
            />
            <label className="label">
              <span className="label-text">Request Url</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full max-w-xs input input-bordered"
              value={addRequestParams.requestUrl}
              onChange={(e) =>
                setAddRequestParams({
                  ...addRequestParams,
                  requestUrl: e.target.value,
                })
              }
            />
            <div className="flex gap-4 mt-4">
              <button
                className="btn btn-primary text-secondary-content"
                type="submit"
              >
                Save
              </button>
              <label
                htmlFor="my-modal-4"
                className="btn btn-error text-secondary-content"
              >
                Cancel
              </label>
            </div>
          </form>
        </label>
      </label>
    </div>
  );
}
export default SideBar;
