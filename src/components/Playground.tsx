"use client";
import { API_REQUEST_TYPE } from "@/constants/constants";
import { useEffect, useId, useState } from "react";
import GroupInput from "./common/GroupInput";
import GroupSelect from "./common/GroupSelect";
import GroupButton from "./common/GroupButton";
import Tabs from "./common/Tabs";
import QueryParams from "./Playground/QueryParams";
import RequestHeaders from "./Playground/RequestHeaders";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { usePlayground } from "@/hooks/usePlayground";
import Input from "./common/Input";
import { IPlayground } from "@/types/types";
import { Editor } from "@monaco-editor/react";
import prettyBytes from "@/helpers/prettyBytes";
import { ClientRequest } from "http";

function Playground({ data }: { data: IPlayground }) {
  const {
    requestType,
    requestUrl,
    jsonParams,
    queryParams,
    requestHeaders,
    response,
    playgroundState,
    setPlaygroundToDefault,
    setPlaygroundStateFromRemote,
    handleRequestTypeChange,
    handleRequestUrlChange,
    handleRequestBodyChange,
    addQueryParam,
    removeQueryParam,
    onQueryParamChange,
    addRequestHeaders,
    removeRequestHeaders,
    onRequestHeadersChange,
    sendRequest,
    saveRequest,
    title,
    setTitle,
    isSaving,
    deleteRequest,
  } = usePlayground();

  const id = useId().split(":")[1];

  function updateEndTime(response: AxiosResponse) {
    response.headers.startTime = response.headers.startTime || {};
    response.headers.time =
      new Date().getTime() - response.config.headers.startTime;
    return response;
  }

  useEffect(() => {
    console.log("this is data", data);

    if (data) {
      setPlaygroundStateFromRemote({
        requestType: data.requestMethod,
        requestUrl: data.requestUrl,
        jsonParams: data.jsonParams,
        queryParams: JSON.parse(data.queryParams || "[]"),
        requestHeaders: JSON.parse(data.headerParams || "[]"),
        title: data.title,
        label: data.label,
        id: data.id,
      });
    }

    axios.interceptors.request.use(
      (request: InternalAxiosRequestConfig<any>) => {
        request.headers.startTime = new Date().getTime();
        return request;
      }
    );
    axios.interceptors.response.use(updateEndTime, (error: any) => {
      return Promise.reject(updateEndTime(error.response));
    });
  }, []);

  return (
    <div className="relative flex flex-col w-full p-4 border border-base-300 gap-y-4 h-4/5">
      <div className="flex justify-between ">
        <input
          type="text"
          placeholder="Type here"
          className="p-2 prose h-min input input-ghost "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-4 ">
          <button
            className={`btn btn-primary text-secondary-content  ${
              isSaving ? "loading" : ""
            }`}
            onClick={saveRequest}
          >
            {isSaving ? "Saving.." : "Save"}
          </button>
          <label
            htmlFor="deleteModal"
            className={`btn btn-error text-secondary-content  ${
              isSaving ? "loading" : ""
            }`}
            // onClick={deleteRequest}
          >
            {isSaving ? "Deleting" : "Delete"}
          </label>
        </div>
      </div>
      <div className="container mb-4 input-group text-base-content">
        <GroupSelect
          label="Type"
          options={
            Object.keys(API_REQUEST_TYPE).map((key) => ({
              value: key,
              label: key,
            })) as Array<{ value: string; label: string }>
          }
          value={"GET"}
          onChange={handleRequestTypeChange}
          className="flex-grow"
        />

        <GroupInput
          label="URL"
          type="text"
          value={requestUrl}
          onChange={handleRequestUrlChange}
          placeholder="https://api.example.com/..."
          className="flex-grow rounded-none input-md"
        />

        <GroupButton label="Send" onClick={sendRequest} />
      </div>
      <input type="checkbox" id="deleteModal" className="modal-toggle" />
      <label htmlFor="deleteModal" className="modal">
        <label className="relative modal-box" htmlFor="deleteModal">
          <button className="text-lg font-bold prose" onClick={deleteRequest}>
            Delete <span className="text-primary">{title}</span>?
          </button>
          <p className="py-4 prose">
            Are you sure you want to delete this request? This action cannot be
            undone.
          </p>
          <div className="flex gap-4">
            <button
              className={`btn btn-primary text-secondary-content  ${
                isSaving ? "loading" : ""
              }`}
              onClick={deleteRequest}
            >
              {isSaving ? "Deleting" : "Delete"}
            </button>
            <label
              htmlFor="deleteModal"
              className="btn btn-error text-secondary-content"
            >
              Cancel
            </label>
          </div>
        </label>
      </label>
      <Tabs
        className="tab-md"
        tabs={[
          {
            id: "query-params" + id,
            label: "Query Params",
            content: (
              <QueryParams
                queryParams={queryParams}
                addQueryParam={addQueryParam}
                onQueryParamChange={onQueryParamChange}
                removeQueryParam={removeQueryParam}
              />
            ),
          },
          {
            id: "headers" + id,
            label: "Headers",
            content: (
              <RequestHeaders
                requestHeaders={requestHeaders}
                addRequestHeaders={addRequestHeaders}
                onRequestHeadersChange={onRequestHeadersChange}
                removeRequestHeaders={removeRequestHeaders}
              />
            ),
          },
          {
            id: "json" + id,
            label: "JSON",
            content: (
              <div className="flex flex-col">
                {
                  <Editor
                    height="25vh"
                    theme="vs-dark"
                    defaultValue={jsonParams}
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
                    onChange={handleRequestBodyChange}
                  />
                }
              </div>
            ),
          },
        ]}
      />

      {response && (
        <div className="flex flex-col mt-8 gap-y-4">
          <div className="text-lg text-gray-500">Response</div>
          <div>
            <span>
              <span className="text-gray-500">Status:</span>{" "}
              <span
                className={
                  response.status >= 200 && response.status < 300
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {response.status}
              </span>
            </span>

            <span className="ml-4 prose">
              <span className="">Time:</span>{" "}
              <span className="">{response.headers?.time} ms</span>
            </span>

            <span className="ml-4 prose">
              <span className="">Size:</span>{" "}
              <span className="prose">
                {prettyBytes(
                  new TextEncoder().encode(JSON.stringify(response.data)).length
                )}
              </span>
            </span>
          </div>

          <Tabs
            tabs={[
              {
                id: "json" + id,
                label: "Json",

                content: (
                  <div className="w-full h-full p-4 rounded bg-neutral-100">
                    <pre className="overflow-x-scroll leading-7 text-white">
                      <Editor
                        height="25vh"
                        theme="vs-dark"
                        defaultLanguage={"json"}
                        value={JSON.stringify(response.data, null, 2)}
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
                id: "raw" + id,
                label: "Raw",
                content: (
                  <div className="w-full h-full p-4 rounded bg-neutral-100 ">
                    <p className="prose">
                      {JSON.stringify({
                        ...response.data,
                      })}
                    </p>
                  </div>
                ),
              },
              {
                id: "preview" + id,
                label: "Preview",
                content: (
                  <div className="w-full h-full p-4 rounded bg-neutral-100">
                    <iframe srcDoc={response.data} className="w-full h-full" />
                  </div>
                ),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
export default Playground;
