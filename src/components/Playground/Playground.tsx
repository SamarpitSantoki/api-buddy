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
import { TypographyP } from "../ui/typography";
import { Loader2 } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import prettyBytes from "@/lib/prettyBytes";

function Playground({
  data,
  workspaceId,
}: {
  data: IPlayground;
  workspaceId: number;
}) {
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
  } = usePlayground(workspaceId);

  useEffect(() => {
    if (data && !playgroundState.isEdited) {
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
          className="text-lg border-0 shadow-none ring-0 focus-visible:border focus-visible:ring-offset-0 focus-visible:ring-0 w-min"
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
          onValueChange={(value: string) => {
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
            {
              id: "body",
              title: "Body",
              component: (
                <Editor
                  height="25vh"
                  theme="vs-dark"
                  defaultValue={request.body}
                  defaultLanguage={"json"}
                  options={{
                    minimap: {
                      enabled: false,
                    },
                    matchBrackets: "always",
                    bracketPairColorization: {
                      enabled: true,
                      independentColorPoolPerBracketType: true,
                    },
                    colorDecorators: true,
                    defaultColorDecorators: true,
                  }}
                  onChange={(value) => {
                    updateBody(value!);
                  }}
                />
              ),
            },
          ]}
        />
      </div>
      <div className="flex w-3/4">
        <div className="flex flex-col mt-8 gap-y-4">
          <div className="text-lg text-gray-500">Response</div>
          <div className="flex">
            <span>
              <TypographyP>
                Status:
                <span
                  className={
                    response?.status >= 200 && response?.status < 300
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {" "}
                  {response?.status}
                </span>
              </TypographyP>
            </span>

            <span className="ml-4 prose">
              <TypographyP>
                Time: <span className="">{response?.headers?.time} ms</span>
              </TypographyP>
            </span>

            <span className="ml-4 prose">
              <TypographyP>
                Size:{" "}
                <span className="prose">
                  {prettyBytes(
                    new TextEncoder().encode(JSON.stringify(response?.data))
                      .length
                  )}
                </span>
              </TypographyP>
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-3/4">
        <HTabs
          tabs={[
            {
              id: "json",
              title: "JSON",
              component: (
                <div className="w-full h-full p-4 rounded bg-neutral-100">
                  <pre className="overflow-x-scroll leading-7 text-white">
                    <Editor
                      height="25vh"
                      theme="vs-dark"
                      defaultLanguage={"json"}
                      value={JSON.stringify(response?.data, null, 2)}
                      options={{
                        readOnly: true,
                        minimap: {
                          enabled: false,
                        },
                      }}
                    />
                  </pre>
                </div>
              ),
            },
            {
              id: "headers",
              title: "Headers",
              component: (
                <KeyValueBox
                  fields={
                    response?.headers
                      ? Object.keys(response?.headers)?.map((header: any) => {
                          return {
                            key: header,
                            value: response?.headers[header],
                          };
                        })
                      : []
                  }
                  disabled
                  addField={() => {}}
                  removeField={() => {}}
                  updateField={() => {}}
                />
              ),
            },
            {
              id: "raw",
              title: "Raw",
              component: (
                <div className="w-full h-full p-4 rounded ">
                  <p className="prose">
                    {JSON.stringify({
                      ...response?.data,
                    })}
                  </p>
                </div>
              ),
            },
            {
              id: "preview",
              title: "Preview",
              component: (
                <div className="w-full h-full p-4 rounded ">
                  <iframe srcDoc={response?.data} className="w-full h-full" />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
export default Playground;
