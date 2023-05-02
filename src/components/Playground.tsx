"use client";
import { API_REQUEST_TYPE } from "@/constants/constants";
import PrimarySelect from "./common/Select";
import { useState } from "react";
import Input from "./common/Input";
import GroupInput from "./common/GroupInput";
import GroupSelect from "./common/GroupSelect";
import GroupButton from "./common/GroupButton";
import Tabs from "./common/Tabs";
import QueryParams from "./Playground/QueryParams";

function Playground() {
  const [requestType, setRequestType] = useState(API_REQUEST_TYPE.GET);
  const [requestUrl, setrequestUrl] = useState<string>("");

  return (
    <div className="relative w-3/4">
      <div className="relative flex flex-wrap items-stretch mb-4">
        <GroupSelect
          label="Type"
          options={
            Object.keys(API_REQUEST_TYPE).map((key) => ({
              value: key,
              label: key,
            })) as Array<{ value: string; label: string }>
          }
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className="rounded-r-none"
        />
        <GroupInput
          label="URL"
          type="text"
          value={requestUrl}
          onChange={(e) => setrequestUrl(e.target.value)}
          placeholder="https://api.example.com/..."
          className="rounded-none"
        />
        <GroupButton label="Send" onClick={() => console.log("Send")} />
      </div>

      <Tabs
        tabs={[
          {
            id: "query-params",
            label: "Query Params",
            content: <QueryParams />,
          },
          {
            id: "headers",
            label: "Headers",
            content: <div className="flex flex-col">Headers</div>,
          },
          {
            id: "json",
            label: "JSON",
            content: <div className="flex flex-col">JSON</div>,
          },
        ]}
      />
    </div>
  );
}
export default Playground;
