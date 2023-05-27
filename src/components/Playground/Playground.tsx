"use client";

import usePlayground from "@/hooks/usePlayground";
import HTabs from "../HTabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import KeyValueBox from "./KeyValueBox";
import { IPlayground } from "@/types/playgroundTypes";
import { useEffect } from "react";
import { TypographyH4 } from "../ui/typography";
import { Loader, Loader2 } from "lucide-react";

function Playground({ data }: { data: IPlayground }) {
  const {
    request,
    response,
    title,
    playgroundState,
    saveRequest,
    updateUrl,
    updateMethod,
    makeRequest,
    addHeader,
    addParam,
    updateHeader,
    updateParam,
    updateBody,
    removeHeader,
    removeParam,
    setPlaygroundStateFromRemote,
    updateTitle,
  } = usePlayground();

  useEffect(() => {
    if (data) {
      setPlaygroundStateFromRemote(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-4 p-8 ">
      <div className="flex justify-between w-3/4">
        <Input
          type="text"
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
          className="border-0 shadow-none ring-0 focus-visible:border focus-visible:ring-offset-0 focus-visible:ring-0 w-min"
        />

        <Button variant="secondary" onClick={saveRequest}>
          Update
          {playgroundState.isSaving ? (
            <span className="animate-spin">
              <Loader2 size={16} />
            </span>
          ) : null}
        </Button>
      </div>

      <div className="flex w-3/4">
        <Select
          onValueChange={(value) => {
            updateMethod(value);
          }}
          value={request.method}
        >
          <SelectTrigger className="rounded-r-none w-36">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Method</SelectLabel>

              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          className="border-l-0 rounded-none"
          placeholder="Enter Your Url"
          value={request.url}
          onChange={(e) => {
            updateUrl(e.target.value);
          }}
        />
        <Button
          className="rounded-l-none"
          variant="secondary"
          onClick={makeRequest}
        >
          Send
          {playgroundState.isSending ? (
            <span className="animate-spin">
              <Loader2 size={16} />
            </span>
          ) : null}
        </Button>
      </div>
      <div className="flex w-3/4">
        <HTabs
          tabs={[
            {
              id: "headers",
              title: "Headers",
              component: (
                <KeyValueBox
                  fields={request.headers}
                  addField={addHeader}
                  removeField={removeHeader}
                  updateField={updateHeader}
                />
              ),
            },
            {
              id: "params",
              title: "Params",
              component: (
                <KeyValueBox
                  fields={request.params}
                  addField={addParam}
                  updateField={updateParam}
                  removeField={removeParam}
                />
              ),
            },
          ]}
        />
      </div>
      <div className="flex w-3/4">
        {response && (
          <div className="flex flex-col w-full h-full p-2 overflow-auto border border-border">
            <div className="flex justify-between">
              <div className="text-xl font-bold">Response</div>
              <div className="text-xl font-bold">{response.status}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold">Headers</div>
              <div className="flex flex-col gap-2">
                {response.header &&
                  Object.keys(response.headers).map((key) => (
                    <div key={key} className="flex gap-2">
                      <div className="font-bold">{key}</div>
                      <div>{response.headers[key]}</div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold">Body</div>
              <pre>{JSON.stringify(response.data, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Playground;
