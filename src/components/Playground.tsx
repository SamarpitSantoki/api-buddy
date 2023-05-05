"use client";
import { API_REQUEST_TYPE } from "@/constants/constants";
import { useEffect, useId, useState } from "react";
import GroupInput from "./common/GroupInput";
import GroupSelect from "./common/GroupSelect";
import GroupButton from "./common/GroupButton";
import Tabs from "./common/Tabs";
import QueryParams from "./Playground/QueryParams";
import RequestHeaders from "./Playground/RequestHeaders";
import axios from "axios";
import { usePlayground } from "@/hooks/usePlayground";
import Input from "./common/Input";
import { TGetRequestResponse } from "@/types/types";

function Playground({ data }: { data: TGetRequestResponse }) {
  const {
    requestType,
    requestUrl,
    requestBody,
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
  } = usePlayground();

  const id = useId().split(":")[1];

  function updateEndTime(response: any) {
    response.customData = response.customData || {};
    response.customData.time =
      new Date().getTime() - response.config.customData.startTime;
    return response;
  }

  useEffect(() => {
    if (data) {
      setPlaygroundStateFromRemote({
        requestType: data.requestMethod,
        requestUrl: data.requestUrl,
        requestBody: data.jsonParams,
        queryParams: JSON.parse(data.queryParams || "[]"),
        requestHeaders: JSON.parse(data.headerParams || "[]"),
        title: data.label,
        id: data.id,
      });
    }

    axios.interceptors.request.use((request: any) => {
      // add field to request object
      request.customData = request.customData || {};

      request.customData.startTime = new Date().getTime();
      console.log("Starting Request", request);
      return request;
    });
    axios.interceptors.response.use(updateEndTime, (error: any) => {
      return Promise.reject(updateEndTime(error.response));
    });
  }, []);

  return (
    <div className="relative ">
      <div className="relative flex flex-wrap items-stretch mb-4 ">
        <Input
          label="Title"
          type="text"
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
      </div>
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
          onChange={handleRequestTypeChange}
          className="rounded-r-none"
        />
        <GroupInput
          label="URL"
          type="text"
          value={requestUrl}
          onChange={handleRequestUrlChange}
          placeholder="https://api.example.com/..."
          className="rounded-none"
        />
        <GroupButton label="Send" onClick={sendRequest} />
      </div>

      <Tabs
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
            content: <div className="flex flex-col">JSON</div>,
          },
        ]}
      />

      {response && (
        <div className="flex flex-col mt-8 gap-y-4">
          <div className="text-lg text-gray-500">Response</div>
          <div>
            <span>
              <span className="text-gray-500">Status:</span>{" "}
              <span className="text-gray-200">{response.status}</span>
            </span>

            <span className="ml-4">
              <span className="text-gray-500">Time:</span>{" "}
              <span className="text-gray-200">
                {(response as any)?.customData?.time} ms
              </span>
            </span>

            <span className="ml-4">
              <span className="text-gray-500">Size:</span>{" "}
              <span className="text-gray-200">
                {(
                  new Blob([
                    JSON.stringify({
                      ...response.data,
                      ...response.headers,
                    }),
                  ]).size / 1024
                ).toFixed(2)}{" "}
                kb
              </span>
            </span>
          </div>

          <Tabs
            tabs={[
              {
                id: "raw" + id,
                label: "RAW",

                content: (
                  <div className="w-full h-full p-4 bg-gray-800 rounded bg-opacity-60">
                    <pre className="overflow-x-scroll leading-7 text-white">
                      {typeof response === "object"
                        ? JSON.stringify(response, null, 2)
                        : response}
                    </pre>
                  </div>
                ),
              },
              {
                id: "preview" + id,
                label: "Preview",
                content: (
                  <div className="w-full h-full p-4 rounded bg-neutral-100">
                    <iframe
                      srcDoc={response.data}
                      className="w-full h-full"
                      height={500}
                    ></iframe>
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
